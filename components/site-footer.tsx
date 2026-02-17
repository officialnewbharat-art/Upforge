import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold tracking-tight text-primary-foreground">
                  UF
                </span>
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                UPFORGE
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {"India's Independent Founder Network. Forge Your Rise."}
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Platform
              </span>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/#top-startups"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Top Startups
              </Link>
              <Link
                href="/#recent"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Recent
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Admin
              </span>
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {"2026 UPFORGE. Built for India's founders."}
          </p>
        </div>
      </div>
    </footer>
  )
}
