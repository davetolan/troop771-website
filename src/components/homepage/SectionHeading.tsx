import type { ReactNode } from 'react'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  actions?: ReactNode
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  actions,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4f5d3a]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl" id={id}>
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">{description}</p>
      ) : null}
      {actions ? <div className="mt-6">{actions}</div> : null}
    </div>
  )
}
