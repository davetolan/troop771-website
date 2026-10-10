import {
  Anchor,
  Compass,
  Fish,
  HeartHandshake,
  Mountain,
  ShieldCheck,
  ShipWheel,
  TentTree,
  Trees,
  Waves,
  WavesLadder,
  type LucideIcon,
} from 'lucide-react'

export const cardIconOptions = [
  { label: 'None', value: 'none' },
  { label: 'Mountain', value: 'mountain' },
  { label: 'Tent', value: 'tentTree' },
  { label: 'Compass', value: 'compass' },
  { label: 'Heart handshake', value: 'heartHandshake' },
  { label: 'Fish', value: 'fish' },
  { label: 'Trees', value: 'trees' },
  { label: 'Waves', value: 'waves' },
  { label: 'Waves ladder', value: 'wavesLadder' },
  { label: 'Ship wheel', value: 'shipWheel' },
  { label: 'Anchor', value: 'anchor' },
  { label: 'Shield check', value: 'shieldCheck' },
] as const

export type CardIconValue = (typeof cardIconOptions)[number]['value']

export const cardIconMap: Record<CardIconValue, LucideIcon | null> = {
  anchor: Anchor,
  compass: Compass,
  fish: Fish,
  heartHandshake: HeartHandshake,
  mountain: Mountain,
  none: null,
  shieldCheck: ShieldCheck,
  shipWheel: ShipWheel,
  tentTree: TentTree,
  trees: Trees,
  waves: Waves,
  wavesLadder: WavesLadder,
}
