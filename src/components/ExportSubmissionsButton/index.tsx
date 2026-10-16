'use client'

import { Button, useAuth, useConfig, useDocumentInfo } from '@payloadcms/ui'
import React from 'react'

import type { User } from '@/payload-types'

// Sidebar button on a form's edit view that downloads its submissions via the
// admin-only `/api/forms/:id/submissions.csv` endpoint.
export const ExportSubmissionsButton: React.FC = () => {
  const { id } = useDocumentInfo()
  const { user } = useAuth<User>()
  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig()

  // Unsaved forms have no submissions, and scouts would only get a 401 from the endpoint.
  if (!id || user?.role === 'scout') return null

  return (
    <div className="field-type">
      <Button
        buttonStyle="secondary"
        el="anchor"
        margin={false}
        size="medium"
        url={`${serverURL}${api}/forms/${id}/submissions.csv`}
      >
        Export submissions (CSV)
      </Button>
    </div>
  )
}
