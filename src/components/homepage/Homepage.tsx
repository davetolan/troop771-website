import { FeaturedActivitiesSection } from './FeaturedActivitiesSection'
import { FundraiserSection } from './FundraiserSection'
import { HeroSection } from './HeroSection'
import { HighlightsSection } from './HighlightsSection'
import { JoinSection } from './JoinSection'
import { ResourcesPreviewSection } from './ResourcesPreviewSection'
import { UpcomingHighlightsSection } from './UpcomingHighlightsSection'
import { WhyJoinSection } from './WhyJoinSection'

export function Homepage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <FeaturedActivitiesSection />
      <WhyJoinSection />
      <UpcomingHighlightsSection />
      <FundraiserSection />
      <ResourcesPreviewSection />
      <JoinSection />
    </main>
  )
}
