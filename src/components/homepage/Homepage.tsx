import { FeaturedActivitiesSection } from './FeaturedActivitiesSection'
import { HeroSection } from './HeroSection'
import { HighlightsSection } from './HighlightsSection'
import { JoinSection } from './JoinSection'
import { WhyJoinSection } from './WhyJoinSection'

export function Homepage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <FeaturedActivitiesSection />
      <WhyJoinSection />
      <JoinSection />
    </main>
  )
}
