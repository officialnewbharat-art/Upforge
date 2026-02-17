import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: {
    default: "UPFORGE - Forge Your Rise | India's Independent Founder Network",
    template: "%s | UPFORGE",
  },
  description:
    "The premier directory for ambitious Indian startups. Get discovered, build trust, and connect with the ecosystem that propels you forward.",
  keywords: [
    "Indian startups",
    "startup directory",
    "founder network",
    "UPFORGE",
    "India",
    "tech startups",
    "fintech",
    "healthtech",
  ],
  openGraph: {
    title: "UPFORGE - Forge Your Rise",
    description:
      "India's Independent Founder Network. The premier directory for ambitious Indian startups.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#4A6CF7",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
