import { getPromotedStartups, getRecentStartups } from "@/lib/data"
import { StartupCard } from "@/components/startup-card"

export default async function Home() {
  // Fetch data asynchronously
  const promotedStartups = await getPromotedStartups()
  const recentStartups = await getRecentStartups()

  return (
    <main>
      {/* Ensure you check if startups exist before mapping */}
      <section>
        {promotedStartups?.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </section>
    </main>
  )
}
