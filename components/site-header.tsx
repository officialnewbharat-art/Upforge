"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Perfect animated logo using /logo.jpg */}
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image 
              src="/logo.jpg" 
              alt="UPFORGE Logo" 
              fill 
              className="object-cover transition-transform duration-500 hover:scale-110 animate-in fade-in zoom-in"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">
              UPFORGE
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:block">
              Forge Your Rise
            </span>
          </div>
        </Link>

        {/* Desktop nav - Admin link removed for protection */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/#top-startups"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Top Startups
          </Link>
          <Link
            href="/#recent"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Recent
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile menu - Admin link removed for protection */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#top-startups"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Top Startups
            </Link>
            <Link
              href="/#recent"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recent
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
