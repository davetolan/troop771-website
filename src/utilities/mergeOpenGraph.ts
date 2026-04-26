import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Scout Troop 771 in Argyle, Texas offers a boy-led program focused on high adventure, outdoor skills, leadership, and character development.',
  images: [
    {
      url: `${getServerSideURL()}/high-adventure.JPG`,
    },
  ],
  siteName: 'Troop 771',
  title: 'Troop 771 | Argyle, TX',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
