'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type EagleShareButtonProps = {
  title: string
  text: string
  url: string
  className?: string
  variant?: 'dark' | 'light'
}

export function EagleShareButton({
  title,
  text,
  url,
  className,
  variant = 'dark',
}: EagleShareButtonProps) {
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
        className={cn(
          'rounded-full px-6 py-3',
          variant === 'dark'
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/15 focus-visible:outline-white'
            : 'border-stone-300 bg-white text-stone-950 hover:border-stone-400 hover:bg-stone-50',
        )}
        onClick={handleShare}
        type="button"
        variant="outline"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share This Project
      </Button>
      <p
        aria-live="polite"
        className={cn('mt-2 min-h-5 text-sm', variant === 'dark' ? 'text-stone-200' : 'text-stone-600')}
      >
        {status}
      </p>
    </div>
  )
}
