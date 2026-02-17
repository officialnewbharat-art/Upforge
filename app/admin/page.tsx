import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage UPFORGE startup listings",
}

export default function AdminPage() {
  return (
    <main className="bg-background py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, edit, and add startup listings on UPFORGE.
          </p>
        </div>
        <AdminDashboard />
      </div>
    </main>
  )
}
