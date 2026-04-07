import type { Metadata } from 'next'

import { Homepage } from '@/components/homepage/Homepage'

export const metadata: Metadata = {
  title: 'Troop 771 | Argyle, TX',
  description:
    'Scout Troop 771 in Argyle, Texas offers a boy-led program focused on high adventure, outdoor skills, leadership, and character development.',
}

export default function HomePage() {
  return <Homepage />
}
