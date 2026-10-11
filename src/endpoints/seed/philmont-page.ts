import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  type: 'text' as const,
  version: 1,
})

const paragraph = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  type: 'paragraph' as const,
  version: 1,
})

const heading = (text: string, tag: 'h1' | 'h2' | 'h3') => ({
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  type: 'heading' as const,
  version: 1,
})

const quote = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  type: 'quote' as const,
  version: 1,
})

const richText = (
  ...children: Array<
    ReturnType<typeof paragraph> | ReturnType<typeof heading> | ReturnType<typeof quote>
  >
) => ({
  root: {
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root' as const,
    version: 1,
  },
})

const gearItem = (item: string, qty = '', notes = '') => ({ item, qty, notes })

type PhilmontPageArgs = {
  heroImage: number | Media
  sectionImage: number | Media
}

export const philmontPage = ({
  heroImage,
  sectionImage,
}: PhilmontPageArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'philmont',
  _status: 'published',
  title: 'Philmont Trek',
  meta: {
    title: 'Philmont Trek | Troop 771',
    description:
      'Troop 771 Philmont trek overview, high-adventure preparation, and a trail-ready packing list.',
    image: heroImage,
  },
  hero: {
    type: 'highImpact',
    richText: richText(
      heading('High adventure that prepares Scouts for a lifetime outdoors', 'h1'),
      paragraph(
        'Philmont is more than a destination. It is a proving ground where Scouts practice the skills, judgment, and leadership they will rely on for any future outdoor adventure.',
      ),
    ),
    media: heroImage,
  },
  layout: [
    {
      blockType: 'splitSection',
      blockName: 'why-we-go',
      eyebrow: 'Why We Go',
      title: 'High adventure builds confidence that cannot be taught from the sidelines',
      description:
        'This trek will teach Scouts what they need to tackle future outdoor adventures: preparation, grit, teamwork, and the habits that keep a crew safe and effective in the backcountry.',
      body: richText(
        quote(
          'For some this is an adventure of a lifetime, for others this will be the start of a lifetime of adventure.',
        ),
        paragraph('— Michael Graham'),
      ),
      media: sectionImage,
      mediaPosition: 'right',
      theme: 'light',
    },
    {
      blockType: 'featureGrid',
      blockName: 'what-the-trek-teaches',
      eyebrow: 'On the Trail',
      title: 'What the trek teaches',
      theme: 'light',
      features: [
        {
          title: 'Self-reliance',
          description:
            'Scouts learn how to carry what they need, make good decisions when conditions change, and keep moving as a crew.',
        },
        {
          title: 'Outdoor judgment',
          description:
            'The trek turns map reading, weather awareness, water planning, cooking, and campsite discipline into lived experience.',
        },
        {
          title: 'Crew leadership',
          description:
            'Every day requires communication, responsibility, and trust as Scouts rotate through real jobs with real consequences.',
        },
      ],
    },
    {
      blockType: 'packingList',
      blockName: 'packing-list',
      eyebrow: 'Packing List',
      title: 'Gear matters because preparation matters',
      description:
        'The right gear keeps Scouts warm, dry, organized, and able to focus on the crew and the trail. Use this list as the working baseline for personal packing decisions.',
      sections: [
        {
          title: 'Packs & Bags',
          items: [
            gearItem('Backpack', '1', '65L Internal Frame -- Can be rented at Philmont'),
            gearItem('Daypack', '1', 'Lightweight w/ space for water & rain gear'),
            gearItem('Pack Cover', '1', 'Waterproof'),
            gearItem('Stuff Sacks', '3-6', 'Organize Personal Items'),
            gearItem('Dry Bag', '1', 'Use for Laundry on Trail'),
            gearItem('Dry Bag/ Compression Sack', '1', 'Sleeping Bag Storage'),
          ],
        },
        {
          title: 'Clothing',
          items: [
            gearItem('Underwear', '3'),
            gearItem('Socks', '3'),
            gearItem('Shirts', '2', 'Long-sleeve fishing shirts are popular'),
            gearItem(
              'Pants/ Shorts',
              '2',
              'If bringing zip off pants, only bring 1 pair of legs',
            ),
            gearItem('Hat', '1'),
            gearItem('Fleece', '1', 'Lightweight'),
            gearItem('Puffy Jacket', '1'),
            gearItem('Rain Jacket', '1', 'Goretex or generic equivalent. No Frog Togs'),
            gearItem('Rain Pants', '1'),
            gearItem('Beanie Cap', '1'),
            gearItem('Hiking Boots', '1'),
            gearItem(
              'Camp Shoes',
              '1',
              'Closed toe. Crocs, Keen sandals or old sneakers work',
            ),
          ],
        },
        {
          title: 'Sleeping Gear',
          items: [
            gearItem('Sleeping Bag', '1', 'Down 15 or 20 degree bag'),
            gearItem('Sleeping Pad', '1', 'Insulated - Inflatable is best.'),
            gearItem('Sleep Clothes', '1', 'Shorts & t shirt for sleeping only -- no cotton'),
          ],
        },
        {
          title: 'Toiletries/ Personal First Aid',
          items: [
            gearItem('Toothbrush/ toothpaste', '1'),
            gearItem('Sunscreen', '1'),
            gearItem('Body Glide'),
            gearItem('Lip Balm', '1'),
            gearItem('Biodegradable Soap', '1', 'Small -- only need a few ounces'),
            gearItem('Tape for feet', '1', 'KT tape strips or duct tape.'),
            gearItem('Compeed Blister Care', '1', 'Packet of assorted sizes'),
            gearItem('Camp Towel', '1', 'Small 12 x 20 or 15 x 30 inches'),
          ],
        },
        {
          title: 'Other Gear',
          items: [
            gearItem('Bowl or plate', '1'),
            gearItem('Spork', '1', 'Long smooth handle.'),
            gearItem('Spices or Hot Sauce', '1'),
            gearItem('Coffee', '1', 'Starbucks Via'),
            gearItem('Mug/ Cup', '1', 'Insulated/ lightweight. Can be optional'),
            gearItem(
              'Nalgene Water Bottle',
              '2',
              'One needs to be clean -- ie never used for anything but water.',
            ),
            gearItem('Water Bladder', '1', '3L (100 oz) -- removable drinking tube is helpful'),
            gearItem('Knife', '1'),
            gearItem('Carabiner', '1'),
            gearItem('Lighter', '1'),
            gearItem('Headlamp', '1'),
            gearItem('Trekking Poles', '1', 'Lightweight w/ rubber tips'),
            gearItem('Bandana or Buff', '1'),
            gearItem('Notepad & Pen', '1'),
            gearItem('Battery Bank'),
          ],
        },
        {
          title: 'Optional',
          items: [
            gearItem(
              'Lashing Straps',
              '',
              'Depends on pack and what will be carried externally',
            ),
            gearItem('Magnets for water bladder hose'),
            gearItem('Sunglasses'),
            gearItem('Fishing Rod/ Flies'),
            gearItem('Chair', '', 'Weight should be about 1lb'),
            gearItem('Tent'),
          ],
        },
      ],
    },
    {
      blockType: 'featureGrid',
      blockName: 'what-scouts-bring-home',
      eyebrow: 'After the Trek',
      title: 'What Scouts bring home',
      theme: 'dark',
      features: [
        {
          title: 'Pack with purpose',
          description: 'Pack with purpose and keep weight under control.',
        },
        {
          title: 'Care for the basics',
          description:
            'Care for feet, layers, water, food, and sleep systems before small problems become big ones.',
        },
        {
          title: 'Work as a crew',
          description:
            'Work as a crew through long miles, changing weather, and shared camp responsibilities.',
        },
        {
          title: 'Confidence for the next trip',
          description:
            'Bring home confidence that applies to future backpacking, canoeing, climbing, and wilderness trips.',
        },
      ],
    },
  ],
})
