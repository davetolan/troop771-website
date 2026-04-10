import { FeaturedActivitiesSection } from './FeaturedActivitiesSection'
import { HeroSection } from './HeroSection'
import { HighlightsSection } from './HighlightsSection'
import { JoinSection } from './JoinSection'

export function Homepage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <FeaturedActivitiesSection />
      <JoinSection />
    </main>
  )
}
