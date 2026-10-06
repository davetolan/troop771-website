import type { PayloadHandler } from 'payload'

import type { Form } from '@/payload-types'
import { getRequestUserRole } from '@/access/getRequestUserRole'

const csvCell = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }

  return value
}

const toFilenameSlug = (value: string): string => {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  return slug || 'form'
}

export const exportFormSubmissionsCSV: PayloadHandler = async (req) => {
  const role = await getRequestUserRole(req)

  if (role !== 'admin') {
    return new Response('Unauthorized', { status: 401 })
  }

  const formID = req.routeParams?.id

  if (typeof formID !== 'string' && typeof formID !== 'number') {
    return new Response('Missing form id', { status: 400 })
  }

  let form: Form

  try {
    form = await req.payload.findByID({
      collection: 'forms',
      id: formID,
      depth: 0,
      req,
    })
  } catch {
    return new Response('Form not found', { status: 404 })
  }

  const columns = (form.fields ?? [])
    .filter((field) => 'name' in field && typeof field.name === 'string')
    .map((field) => ({
      name: (field as { name: string }).name,
      label: (field as { label?: string | null }).label || (field as { name: string }).name,
    }))

  const { docs } = await req.payload.find({
    collection: 'form-submissions',
    where: {
      form: {
        equals: formID,
      },
    },
    depth: 0,
    limit: 0,
    sort: 'createdAt',
    req,
  })

  const header = ['Submitted At', ...columns.map((column) => column.label)]

  const rows = docs.map((doc) => {
    const values = new Map((doc.submissionData ?? []).map((entry) => [entry.field, entry.value ?? '']))

    return [doc.createdAt, ...columns.map((column) => values.get(column.name) ?? '')]
  })

  const csv = [header, ...rows].map((row) => row.map((cell) => csvCell(String(cell))).join(',')).join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${toFilenameSlug(form.title)}-submissions.csv"`,
    },
  })
}
