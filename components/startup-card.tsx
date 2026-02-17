import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, Users } from "lucide-react"
import type { Startup } from "@/lib/data"

function BadgeColor({ badge }: { badge: Startup["ratingBadge"] }) {
  const colors: Record<Startup["ratingBadge"], string> = {
    Verified: "bg-primary/10 text-primary",
    Trusted: "bg-accent/10 text-accent",
    Rising: "bg-[oklch(0.75_0.15_55)] text-[oklch(0.40_0.12_55)]",
    New: "bg-secondary text-secondary-foreground",
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colors[badge]}`}
    >
      {badge}
    </span>
  )
}

export function StartupCard({
  startup,
  featured = false,
}: {
  startup: Startup
  featured?: boolean
}) {
  return (
    <Link href={`/startup/${startup.id}`} className="group block">
      <article
        className={`flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
          featured ? "ring-1 ring-primary/10" : ""
        }`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={startup.imageUrl}
            alt={`${startup.name} - ${startup.category} startup`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <div className="absolute left-3 top-3 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Featured
            </div>
          )}
          <div className="absolute right-3 top-3">
            <BadgeColor badge={startup.ratingBadge} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
              {startup.category}
            </span>
          </div>

          <h3 className="mb-1.5 text-lg font-bold text-foreground group-hover:text-primary">
            {startup.name}
          </h3>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {startup.description}
          </p>

          <div className="flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {startup.founders.join(", ")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(startup.foundedDate).getFullYear()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function StartupCardCompact({ startup }: { startup: Startup }) {
  return (
    <Link href={`/startup/${startup.id}`} className="group block">
      <article className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={startup.imageUrl}
            alt={`${startup.name} logo`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-sm font-bold text-foreground group-hover:text-primary">
              {startup.name}
            </h3>
            <BadgeColor badge={startup.ratingBadge} />
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {startup.description}
          </p>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{startup.category}</span>
            <span className="inline-flex items-center gap-0.5">
              <ExternalLink className="h-3 w-3" />
              Visit
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
