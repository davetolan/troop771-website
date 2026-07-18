'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

type EagleShareButtonProps = {
  title: string
  text: string
  url: string
  className?: string
}

export function EagleShareButton({ title, text, url, className }: EagleShareButtonProps) {
  const [status, setStatus] = useState('')

  const handleShare = async () => {
    const shareData = { title, text, url }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setStatus('Shared')
        return
      }

      await navigator.clipboard.writeText(url)
      setStatus('Link copied')
    } catch {
      setStatus('Unable to share')
    }
  }

  return (
    <div className={className}>
      <Button
        className="rounded-full border-white/20 bg-white/10 px-6 py-3 text-white hover:bg-white/15 focus-visible:outline-white"
        onClick={handleShare}
        type="button"
        variant="outline"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share This Project
      </Button>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-stone-200">
        {status}
      </p>
    </div>
  )
}
