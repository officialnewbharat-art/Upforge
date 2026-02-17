import { getPromotedStartups } from "@/lib/data"
import { StartupCard } from "@/components/startup-card"
import { Star } from "lucide-react"

export function TopStartupsSection() {
  const promoted = getPromotedStartups()

  return (
    <section id="top-startups" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Top Startups
            </h2>
            <p className="text-sm text-muted-foreground">
              Curated and promoted listings
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promoted.map((startup) => (
            <StartupCard key={startup.id} startup={startup} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
