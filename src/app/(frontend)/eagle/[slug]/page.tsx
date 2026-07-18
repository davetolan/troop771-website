import type { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock,
  HandHeart,
  MapPin,
  Megaphone,
  QrCode,
  Share2,
  Sprout,
} from 'lucide-react'

import { EagleFaq } from '@/components/eagle/EagleFaq'
import { EagleShareButton } from '@/components/eagle/EagleShareButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type EagleProject,
  getAllEagleProjects,
  getEagleProjectBySlug,
} from '@/data/eagle-projects'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
})

const waysToHelp = [
  {
    title: 'Donate',
    description: 'Help purchase benches, edging, mulch, lighting, and construction materials.',
    icon: CircleDollarSign,
  },
  {
    title: 'Volunteer',
    description: 'Join the site preparation or construction workday.',
    icon: HandHeart,
  },
  {
    title: 'Donate Materials',
    description: 'Provide approved project materials, tools, or equipment.',
    icon: ClipboardList,
  },
  {
    title: 'Share',
    description:
      'Send this project page to family, friends, churches, civic organizations, and local businesses.',
    icon: Share2,
  },
] as const

export async function generateStaticParams() {
  return getAllEagleProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const project = getEagleProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Eagle Scout Project | Troop 771',
    }
  }

  const siteUrl = getServerSideURL()
  const canonicalUrl = `${siteUrl}/eagle/${project.slug}`
  const imageUrl = `${siteUrl}${project.socialImage}`
  const description =
    'Support Kason\u2019s Eagle Scout service project creating a shaded outdoor gathering space for Liberty Christian School.'
  const title = 'Kason\u2019s Eagle Scout Service Project | Troop 771'

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    openGraph: mergeOpenGraph({
      description,
      images: [
        {
          alt: project.proposedImageAlt,
          height: 630,
          url: imageUrl,
          width: 1200,
        },
      ],
      title,
      url: canonicalUrl,
    }),
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [imageUrl],
      title,
    },
  }
}

export default async function EagleProjectPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const project = getEagleProjectBySlug(slug)

  if (!project) notFound()

  return <EagleProjectTemplate project={project} />
}

function EagleProjectTemplate({ project }: { project: EagleProject }) {
  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/eagle/${project.slug}`
  const donationUrl = formatVenmoDonationUrl(project.fundraising.donationUrl)
  const donationHref = donationUrl || '#fundraising'
  const fundraisingDonationHref = donationUrl || '/contact'
  const remaining = Math.max(project.fundraising.goal - project.fundraising.raised, 0)
  const progress =
    project.fundraising.goal > 0
      ? Math.min(Math.max((project.fundraising.raised / project.fundraising.goal) * 100, 0), 100)
      : 0

  return (
    <main className="bg-stone-50 text-stone-950">
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <Image
            alt=""
            aria-hidden="true"
            className="object-cover object-center opacity-45"
            fill
            priority
            sizes="100vw"
            src={project.heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(28,25,23,0.96),rgba(41,37,36,0.86)_48%,rgba(68,81,58,0.62)),radial-gradient(circle_at_78%_18%,rgba(252,211,77,0.18),transparent_30%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(28,25,23,0.84),transparent)]" />
        </div>

        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.45fr)] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-stone-100 backdrop-blur">
                <Sprout className="h-4 w-4 text-amber-200" aria-hidden="true" />
                <span className="font-semibold uppercase tracking-[0.18em]">{project.status}</span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200 sm:text-xl">
                {project.subtitle}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="rounded-full bg-amber-300 px-6 py-3 text-stone-950 hover:bg-amber-200 focus-visible:outline-amber-200"
                >
                  <Link href={donationHref}>Donate to the Project</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full border-white/20 bg-white/10 px-6 py-3 text-white hover:bg-white/15 focus-visible:outline-white"
                  variant="outline"
                >
                  <Link href="#volunteer">Volunteer</Link>
                </Button>
                <EagleShareButton
                  text={project.subtitle}
                  title={project.title}
                  url={pageUrl}
                />
              </div>
            </div>

            <figure className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur">
              <div className="relative aspect-[4/3]">
                <Image
                  alt={project.heroImageAlt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 28rem"
                  src={project.heroImage}
                />
              </div>
              <figcaption className="px-5 py-4 text-sm leading-6 text-stone-100">
                A concept view of the planned shaded seating and gathering space.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
                Project Overview
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                A lasting outdoor space for {project.beneficiary}
              </h2>
            </div>
            <div className="grid gap-5 text-base leading-8 text-stone-700 sm:text-lg">
              {project.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Before and Proposed After"
            title="The project will improve an underused campus area"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {project.beforeImage && (
              <ImageCard
                alt={project.beforeImageAlt || 'Current project area'}
                caption="Current project area"
                src={project.beforeImage}
              />
            )}
            {project.proposedImage && (
              <ImageCard
                alt={project.proposedImageAlt || 'Proposed completed design'}
                caption="Proposed completed design"
                src={project.proposedImage}
              />
            )}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-stone-600">
            The proposed-after image is a concept rendering and is not to scale. The planned mulch
            ring will have a 24-foot diameter.
          </p>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#2f261f,#3f3429,#44513a)] py-16 text-white sm:py-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                Why It Matters
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A shaded place to gather, wait, and reflect
              </h2>
            </div>
            <p className="text-lg leading-8 text-stone-100">{project.impactStatement}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="fundraising">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Fundraising"
                title="Help fund the materials needed for the project"
              />
              <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-stone-600">Progress</span>
                  <span className="text-sm font-semibold text-stone-950">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  aria-label="Fundraising progress"
                  aria-valuemax={project.fundraising.goal}
                  aria-valuemin={0}
                  aria-valuenow={project.fundraising.raised}
                  className="mt-3 h-4 overflow-hidden rounded-full bg-stone-200"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-[#4f5d3a]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  <StatCard label="Goal" value={formatCurrency(project.fundraising.goal)} />
                  <StatCard label="Raised" value={formatCurrency(project.fundraising.raised)} />
                  <StatCard label="Remaining" value={formatCurrency(remaining)} />
                </dl>
                <p className="mt-5 text-sm text-stone-600">
                  Last updated: {project.fundraising.lastUpdated || 'TBD'}
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full bg-stone-950 px-6 py-3 text-white hover:bg-stone-800"
                >
                  <Link href={fundraisingDonationHref}>Donate to the Project</Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="border-b border-stone-200 bg-stone-950 px-5 py-4 text-white">
                <h3 className="text-lg font-semibold">Estimated Costs</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                  <thead className="bg-stone-100 text-xs uppercase tracking-[0.16em] text-stone-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Item</th>
                      <th className="px-5 py-3 font-semibold">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {project.fundraising.costs.map((cost) => (
                      <tr key={cost.item}>
                        <td className="px-5 py-4 font-medium text-stone-950">{cost.item}</td>
                        <td className="px-5 py-4 text-stone-700">
                          {cost.displayValue || formatCurrency(cost.estimatedCost || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16 sm:py-20" id="volunteer">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Volunteer" title="Workday details will be announced" />
              <p className="mt-5 text-base leading-8 text-stone-700">
                {project.volunteer.statusMessage}
              </p>
              <Button
                asChild
                className="mt-7 rounded-full bg-[#4f5d3a] px-6 py-3 text-white hover:bg-[#3f4b2f]"
              >
                <Link href={project.volunteer.signupUrl || project.contactUrl || '/contact'}>
                  Volunteer Signup
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={CalendarDays} label="Date" value={project.volunteer.date || 'TBD'} />
              <InfoCard
                icon={Clock}
                label="Time"
                value={
                  project.volunteer.startTime && project.volunteer.endTime
                    ? `${project.volunteer.startTime} - ${project.volunteer.endTime}`
                    : 'TBD'
                }
              />
              <InfoCard
                icon={MapPin}
                label="Location"
                value={project.volunteer.location || project.beneficiary}
              />
              <InfoCard
                icon={CalendarDays}
                label="Rain Date"
                value={project.volunteer.rainDate || 'TBD'}
              />
              <Card className="border-stone-200 bg-white sm:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Volunteer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm leading-6 text-stone-700">
                    {(project.volunteer.details || []).map((detail) => (
                      <li className="flex gap-3" key={detail}>
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#4f5d3a]"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Ways to Help" title="Every contribution helps move the project forward" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {waysToHelp.map(({ title, description, icon: Icon }) => (
              <Card className="border-stone-200 bg-stone-50" key={title}>
                <CardHeader>
                  <div className="inline-flex w-fit rounded-xl bg-amber-100 p-3 text-stone-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-stone-700">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Project Updates" title="Follow the project as it moves ahead" />
          <div className="mt-10 grid gap-4">
            {project.updates.map((update) => (
              <article
                className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:grid-cols-[10rem_1fr] sm:items-start"
                key={update.title}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f5d3a]">
                  {update.date || 'TBD'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-950">{update.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{update.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow={`About ${project.scoutFirstName}'s Eagle Project`}
                title="Planning, developing, and leading a project that serves others"
              />
            </div>
            <p className="text-base leading-8 text-stone-700 sm:text-lg">
              Kason is a Life Scout with Troop 771. He is completing this service project as part
              of his journey toward the rank of Eagle Scout. Eagle Scout service projects require
              Scouts to plan, develop, and lead others in completing a project that benefits a
              school, religious organization, or community.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Frequently Asked Questions" title="Project questions" />
          <div className="mt-10">
            <EagleFaq faqs={project.faqs} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#4f5d3a]">
                <QrCode className="h-4 w-4" aria-hidden="true" />
                Project QR Code
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
                Scan or share this code to support {project.scoutFirstName}&apos;s Eagle Scout project.
              </h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-stone-950 text-white hover:bg-stone-800">
                  <Link href={donationHref}>Donate</Link>
                </Button>
                <Button asChild className="rounded-full" variant="outline">
                  <Link href="#volunteer">Volunteer</Link>
                </Button>
                <Button asChild className="rounded-full" variant="outline">
                  <a download href={project.qrCodeImage || '/eagle/kason/qr-code.svg'}>
                    Download QR Code
                  </a>
                </Button>
              </div>
            </div>
            {project.qrCodeImage && (
              <div className="mx-auto w-40 rounded-xl border border-stone-200 bg-white p-3">
                <Image
                  alt={`QR code linking to ${project.scoutFirstName}'s Eagle Scout project page`}
                  height={160}
                  src={project.qrCodeImage}
                  width={160}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 text-white sm:py-20">
        <div className="container text-center">
          <Megaphone className="mx-auto h-8 w-8 text-amber-200" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Help make this Eagle Scout service project possible
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-amber-300 text-stone-950 hover:bg-amber-200">
              <Link href={donationHref}>Donate</Link>
            </Button>
            <Button asChild className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15" variant="outline">
              <Link href="#volunteer">Volunteer</Link>
            </Button>
            <EagleShareButton
              className="flex flex-col items-center"
              text={project.subtitle}
              title={project.title}
              url={pageUrl}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

function ImageCard({ alt, caption, src }: { alt: string; caption: string; src: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_22px_70px_-52px_rgba(41,37,36,0.55)]">
      <div className="relative aspect-[5/4]">
        <Image alt={alt} className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src={src} />
      </div>
      <figcaption className="px-5 py-4 text-sm font-medium text-stone-700">{caption}</figcaption>
    </figure>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <dt className="text-sm text-stone-600">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-stone-950">{value}</dd>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <Card className="border-stone-200 bg-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#ece6d9] p-3 text-[#4f5d3a]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-stone-600">{label}</p>
            <CardTitle className="mt-1 text-lg">{value}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

function formatVenmoDonationUrl(donationUrl?: string) {
  if (!donationUrl) return undefined

  return donationUrl.replace(/([?&]note=)([^&#]*)/, (_match, prefix: string, note: string) => {
    const decodedNote = decodeURIComponent(note.replace(/\+/g, '%20'))
    const encodedNote = encodeURIComponent(decodedNote).replace(/\+/g, '%20')

    return `${prefix}${encodedNote}`
  })
}
