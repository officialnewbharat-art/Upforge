import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Globe,
  Shield,
  Users,
} from "lucide-react"
import { getStartupById, startups } from "@/lib/data"

export async function generateStaticParams() {
  return startups.map((startup) => ({
    id: startup.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const startup = getStartupById(id)
  if (!startup) return { title: "Startup Not Found" }

  return {
    title: `${startup.name} - ${startup.category}`,
    description: startup.description,
    openGraph: {
      title: `${startup.name} | UPFORGE`,
      description: startup.description,
      images: [startup.imageUrl],
    },
  }
}

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const startup = getStartupById(id)

  if (!startup) {
    notFound()
  }

  const badgeColors: Record<string, string> = {
    Verified: "bg-primary/10 text-primary border-primary/20",
    Trusted: "bg-accent/10 text-accent border-accent/20",
    Rising:
      "bg-[oklch(0.75_0.15_55/0.1)] text-[oklch(0.40_0.12_55)] border-[oklch(0.75_0.15_55/0.2)]",
    New: "bg-secondary text-secondary-foreground border-border",
  }

  return (
    <main className="bg-background">
      {/* Back navigation */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all startups
        </Link>
      </div>

      {/* Hero image */}
      <div className="mx-auto mt-6 max-w-4xl px-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={startup.imageUrl}
            alt={`${startup.name} cover image`}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Main content */}
          <div className="flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {startup.category}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${badgeColors[startup.ratingBadge]}`}
              >
                <Shield className="h-3 w-3" />
                {startup.ratingBadge}
              </span>
              {startup.isPromoted && (
                <span className="rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {startup.name}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {startup.description}
            </p>

            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                About
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {startup.longDescription}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 md:w-72">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Details
              </h3>

              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    Founders
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {startup.founders.join(", ")}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Founded
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {new Date(startup.foundedDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    Website
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={startup.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Visit website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>

                <div className="border-t border-border pt-4">
                  <dt className="text-xs text-muted-foreground">
                    Last updated by
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {startup.updatedBy}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
