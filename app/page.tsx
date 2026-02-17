import { HeroSection } from "@/components/hero-section"
import { TopStartupsSection } from "@/components/top-startups-section"
import { RecentStartupsSection } from "@/components/recent-startups-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TopStartupsSection />
      <RecentStartupsSection />
    </main>
  )
}
