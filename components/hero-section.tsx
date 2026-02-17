import { ArrowRight, Flame, Globe, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.18_250/0.06),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.62_0.19_195/0.04),transparent_50%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center md:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-secondary-foreground">
            {"India's Independent Founder Network"}
          </span>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight">
          Where Indian Startups
          <span className="text-primary"> Forge Their Rise</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          The premier directory for ambitious Indian startups. Get discovered,
          build trust, and connect with the ecosystem that propels you forward.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/#top-startups"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Startups
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            List Your Startup
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Verified</p>
              <p className="text-xs text-muted-foreground">
                Every listing reviewed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Flame className="h-5 w-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                10+ Startups
              </p>
              <p className="text-xs text-muted-foreground">
                And growing daily
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                Pan-India
              </p>
              <p className="text-xs text-muted-foreground">
                Coast to coast coverage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
