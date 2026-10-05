import { RequiredDataFromCollectionSlug } from 'payload'

const emailFromAddress = process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev'

export const aolCampoutForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'AOL Campout Sign-Up',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: "You're signed up! See you at the campout.",
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  confirmationType: 'message',
  emails: [
    {
      emailFrom: `"Troop 771" <${emailFromAddress}>`,
      emailTo: '{{parent-email}}',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: "Thanks, {{parent-name}}! We can't wait to see {{cub-first-name}} at our Arrow of Light Campout.",
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      subject: "You're signed up for the AOL Campout!",
    },
  ],
  fields: [
    {
      name: 'parent-name',
      blockName: 'parent-name',
      blockType: 'text',
      label: 'Parent/Guardian Name',
      required: true,
      width: 100,
    },
    {
      name: 'parent-email',
      blockName: 'parent-email',
      blockType: 'email',
      label: 'Parent/Guardian Email',
      required: true,
      width: 100,
    },
    {
      name: 'parent-phone',
      blockName: 'parent-phone',
      blockType: 'number',
      label: 'Parent/Guardian Phone',
      required: true,
      width: 100,
    },
    {
      name: 'cub-first-name',
      blockName: 'cub-first-name',
      blockType: 'text',
      label: "Cub Scout's First Name",
      required: true,
      width: 100,
    },
    {
      name: 'pack-number',
      blockName: 'pack-number',
      blockType: 'text',
      label: 'Current Pack Number',
      required: true,
      width: 100,
    },
    {
      name: 'interested-troop',
      blockName: 'interested-troop',
      blockType: 'select',
      label: 'Interested Troop',
      options: [
        {
          label: '771B (Boys)',
          value: '771B (Boys)',
        },
        {
          label: '771G (Girls)',
          value: '771G (Girls)',
        },
      ],
      required: true,
      width: 100,
    },
    {
      name: 'rank',
      blockName: 'rank',
      blockType: 'select',
      label: 'Rank',
      options: [
        {
          label: 'Webelos (4th grade)',
          value: 'Webelos (4th grade)',
        },
        {
          label: 'Arrow of Light (5th grade)',
          value: 'Arrow of Light (5th grade)',
        },
      ],
      required: true,
      width: 100,
    },
    {
      name: 'overnight-or-day',
      blockName: 'overnight-or-day',
      blockType: 'select',
      label: 'Attending',
      options: [
        {
          label: 'Overnight',
          value: 'Overnight',
        },
        {
          label: 'Day visit only',
          value: 'Day visit only',
        },
      ],
      required: true,
      width: 100,
    },
    {
      name: 'number-of-adults',
      blockName: 'number-of-adults',
      blockType: 'number',
      label: 'Number of Adults Attending',
      required: true,
      width: 100,
    },
    {
      name: 'number-of-siblings',
      blockName: 'number-of-siblings',
      blockType: 'number',
      label: 'Number of Siblings Attending',
      required: false,
      width: 100,
    },
    {
      name: 'dietary-needs',
      blockName: 'dietary-needs',
      blockType: 'textarea',
      label: 'Dietary Needs / Allergies',
      required: false,
      width: 100,
    },
    {
      name: 'how-did-you-hear',
      blockName: 'how-did-you-hear',
      blockType: 'text',
      label: 'How Did You Hear About Us?',
      required: false,
      width: 100,
    },
  ],
  submitButtonLabel: 'Sign Up',
}
