"use client"

import { useState } from "react"
import { getStartupsByCategory, getRecentStartups } from "@/lib/data"
import { StartupCardCompact } from "@/components/startup-card"
import { CategoryFilter } from "@/components/category-filter"
import { Clock } from "lucide-react"

export function RecentStartupsSection() {
  const [category, setCategory] = useState("All")

  const filtered =
    category === "All" ? getRecentStartups() : getStartupsByCategory(category)

  return (
    <section id="recent" className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              All Startups
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse by category or explore the latest
            </p>
          </div>
        </div>

        <div className="mb-8">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((startup) => (
            <StartupCardCompact key={startup.id} startup={startup} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-muted-foreground">
              No startups found in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
