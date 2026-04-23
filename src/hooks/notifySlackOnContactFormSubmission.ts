import type { CollectionAfterChangeHook } from 'payload'

import type { FormSubmission } from '@/payload-types'

const CONTACT_FORM_TITLE = process.env.SLACK_CONTACT_FORM_TITLE || 'Contact Form'

const getSubmissionValue = (submission: FormSubmission, fieldName: string): string | undefined => {
  const entry = submission.submissionData?.find((item) => item.field === fieldName)

  if (entry?.value === null || typeof entry?.value === 'undefined') {
    return undefined
  }

  return String(entry.value).trim() || undefined
}

const formatSlackText = ({
  formTitle,
  submission,
}: {
  formTitle: string
  submission: FormSubmission
}): string => {
  const fullName = getSubmissionValue(submission, 'full-name') || 'Unknown sender'
  const email = getSubmissionValue(submission, 'email') || 'No email provided'
  const phone = getSubmissionValue(submission, 'phone') || 'No phone provided'
  const message = getSubmissionValue(submission, 'message') || 'No message provided'

  return [
    ':mailbox_with_mail: New website contact form submission',
    `*Form:* ${formTitle}`,
    `*Name:* ${fullName}`,
    `*Email:* ${email}`,
    `*Phone:* ${phone}`,
    `*Message:* ${message}`,
  ].join('\n')
}

export const notifySlackOnContactFormSubmission: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') {
    return doc
  }

  const botToken = process.env.SLACK_BOT_TOKEN
  const channelID = process.env.SLACK_WEBSITE_NOTIFICATIONS_CHANNEL_ID

  req.payload.logger.info({
    msg: 'Contact form Slack hook triggered.',
    formSubmissionID: doc.id,
    hasBotToken: Boolean(botToken),
    hasChannelID: Boolean(channelID),
  })

  if (!botToken || !channelID) {
    req.payload.logger.warn(
      'Skipping Slack notification for contact form submission because Slack env vars are missing.',
    )
    return doc
  }

  let formTitle = 'Unknown form'

  if (typeof doc.form === 'object' && doc.form?.title) {
    formTitle = doc.form.title
  } else if (typeof doc.form === 'number' || typeof doc.form === 'string') {
    try {
      const formDoc = await req.payload.findByID({
        collection: 'forms',
        id: doc.form,
        req,
      })

      formTitle = formDoc.title
    } catch (error) {
      req.payload.logger.error({
        err: error,
        msg: `Unable to load form ${String(doc.form)} for Slack notification.`,
      })
    }
  }

  req.payload.logger.info({
    msg: 'Resolved form title for Slack notification.',
    expectedFormTitle: CONTACT_FORM_TITLE,
    formSubmissionID: doc.id,
    resolvedFormTitle: formTitle,
  })

  if (formTitle !== CONTACT_FORM_TITLE) {
    req.payload.logger.info({
      msg: 'Skipping Slack notification because form title did not match.',
      expectedFormTitle: CONTACT_FORM_TITLE,
      formSubmissionID: doc.id,
      resolvedFormTitle: formTitle,
    })

    return doc
  }

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${botToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      channel: channelID,
      text: formatSlackText({
        formTitle,
        submission: doc,
      }),
      unfurl_links: false,
      unfurl_media: false,
    }),
  })

  const result = (await response.json()) as { error?: string; ok?: boolean; ts?: string }

  req.payload.logger.info({
    msg: 'Slack API responded for contact form submission.',
    formSubmissionID: doc.id,
    responseStatus: response.status,
    slackChannelID: channelID,
    slackMessageTS: result.ts,
    slackOK: result.ok,
    slackError: result.error,
  })

  if (!response.ok || !result.ok) {
    req.payload.logger.error({
      msg: 'Slack notification failed for contact form submission.',
      responseStatus: response.status,
      slackError: result.error,
    })
  }

  return doc
}
