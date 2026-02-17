"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Eye,
  Pencil,
  Plus,
  Search,
  Shield,
  Star,
  Trash2,
  X,
} from "lucide-react"
import type { Startup } from "@/lib/data"
import { startups as initialStartups, categories } from "@/lib/data"

type FormData = Omit<Startup, "id"> & { id?: string }

const emptyForm: FormData = {
  name: "",
  description: "",
  imageUrl: "",
  founders: [],
  foundedDate: "",
  websiteUrl: "",
  category: "Tech",
  updatedBy: "Admin",
  ratingBadge: "New",
  isPromoted: false,
  longDescription: "",
}

export function AdminDashboard() {
  const [data, setData] = useState<Startup[]>(initialStartups)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [foundersInput, setFoundersInput] = useState("")

  const filtered = data.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  )

  function openNew() {
    setEditingId(null)
    setForm(emptyForm)
    setFoundersInput("")
    setShowForm(true)
  }

  function openEdit(startup: Startup) {
    setEditingId(startup.id)
    setForm({ ...startup })
    setFoundersInput(startup.founders.join(", "))
    setShowForm(true)
  }

  function handleSave() {
    const founders = foundersInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)

    if (editingId) {
      setData((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...form, founders } : s
        )
      )
    } else {
      const newStartup: Startup = {
        ...form,
        id: String(Date.now()),
        founders,
      } as Startup
      setData((prev) => [newStartup, ...prev])
    }

    setShowForm(false)
    setForm(emptyForm)
    setFoundersInput("")
    setEditingId(null)
  }

  function handleDelete(id: string) {
    setData((prev) => prev.filter((s) => s.id !== id))
  }

  function togglePromoted(id: string) {
    setData((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isPromoted: !s.isPromoted } : s
      )
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search startups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Startup
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total Listings</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {data.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Featured</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            {data.filter((s) => s.isPromoted).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Categories</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {new Set(data.map((s) => s.category)).size}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Verified</p>
          <p className="mt-1 text-2xl font-bold text-accent">
            {data.filter((s) => s.ratingBadge === "Verified").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Startup
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                Category
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                Badge
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((startup) => (
              <tr
                key={startup.id}
                className="border-b border-border last:border-0 hover:bg-secondary/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={startup.imageUrl}
                        alt={startup.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {startup.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground md:hidden">
                        {startup.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {startup.category}
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    {startup.ratingBadge}
                  </span>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  {startup.isPromoted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/startup/${startup.id}`}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View {startup.name}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEdit(startup)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {startup.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePromoted(startup.id)}
                      className={`rounded-md p-1.5 transition-colors ${
                        startup.isPromoted
                          ? "text-primary hover:bg-primary/10"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      title={
                        startup.isPromoted ? "Remove featured" : "Make featured"
                      }
                    >
                      <Star className="h-4 w-4" />
                      <span className="sr-only">
                        Toggle featured for {startup.name}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(startup.id)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {startup.name}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No startups match your search.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {editingId ? "Edit Startup" : "Add New Startup"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close form</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSave()
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Startup Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Brief Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="longDescription"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Full Description
                </label>
                <textarea
                  id="longDescription"
                  required
                  rows={4}
                  value={form.longDescription}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      longDescription: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="badge"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Rating Badge
                  </label>
                  <select
                    id="badge"
                    value={form.ratingBadge}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        ratingBadge: e.target.value as Startup["ratingBadge"],
                      }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="New">New</option>
                    <option value="Rising">Rising</option>
                    <option value="Verified">Verified</option>
                    <option value="Trusted">Trusted</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="founders"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Founders (comma-separated)
                </label>
                <input
                  id="founders"
                  type="text"
                  required
                  value={foundersInput}
                  onChange={(e) => setFoundersInput(e.target.value)}
                  placeholder="John Doe, Jane Smith"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="foundedDate"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Founded Date
                  </label>
                  <input
                    id="foundedDate"
                    type="date"
                    required
                    value={form.foundedDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, foundedDate: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="websiteUrl"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Website URL
                  </label>
                  <input
                    id="websiteUrl"
                    type="url"
                    required
                    value={form.websiteUrl}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, websiteUrl: e.target.value }))
                    }
                    placeholder="https://"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  placeholder="/images/startups/my-startup.jpg"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="isPromoted"
                  type="checkbox"
                  checked={form.isPromoted}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, isPromoted: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-input text-primary accent-primary"
                />
                <label
                  htmlFor="isPromoted"
                  className="text-sm text-foreground"
                >
                  Feature this startup (promoted)
                </label>
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {editingId ? "Save Changes" : "Add Startup"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
