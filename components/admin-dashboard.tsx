"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Eye,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react"
import type { Startup } from "@/lib/data"
import { getStartups, categories, supabase } from "@/lib/data"
import { toast } from "sonner"

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
  isPromoted: false,
  longDescription: "",
}

export function AdminDashboard() {
  const [data, setData] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [foundersInput, setFoundersInput] = useState("")

  // Fetch data from Supabase on mount
  useEffect(() => {
    async function loadData() {
      const startups = await getStartups()
      setData(startups)
      setIsLoading(false)
    }
    loadData()
  }, [])

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

  async function handleSave() {
    const founders = foundersInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)

    const payload = { ...form, founders }
    delete payload.id // Supabase handles IDs

    try {
      if (editingId) {
        const { error } = await supabase
          .from('startups')
          .update(payload)
          .eq('id', editingId)
        
        if (error) throw error
        toast.success("Startup updated successfully")
      } else {
        const { error } = await supabase
          .from('startups')
          .insert([payload])
        
        if (error) throw error
        toast.success("Startup added successfully")
      }

      // Refresh local data
      const updatedData = await getStartups()
      setData(updatedData)
      setShowForm(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to save startup")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this startup?")) return

    try {
      const { error } = await supabase.from('startups').delete().eq('id', id)
      if (error) throw error
      setData((prev) => prev.filter((s) => s.id !== id))
      toast.success("Startup deleted")
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  async function togglePromoted(startup: Startup) {
    try {
      const { error } = await supabase
        .from('startups')
        .update({ isPromoted: !startup.isPromoted })
        .eq('id', startup.id)
      
      if (error) throw error
      setData((prev) =>
        prev.map((s) =>
          s.id === startup.id ? { ...s, isPromoted: !s.isPromoted } : s
        )
      )
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading dashboard data...</div>
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

      {/* Stats - Simplified to remove Verified count */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Total Listings</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{data.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Featured</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            {data.filter((s) => s.isPromoted).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Categories</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {new Set(data.map((s) => s.category)).size}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Startup</th>
              <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((startup) => (
              <tr key={startup.id} className="border-b border-border last:border-0 hover:bg-secondary/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={startup.imageUrl} alt={startup.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{startup.name}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{startup.category}</td>
                <td className="px-4 py-3">
                  {startup.isPromoted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                      <Star className="h-3 w-3 fill-primary" /> Featured
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Standard</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(startup)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => togglePromoted(startup)}
                      className={`rounded-md p-1.5 ${startup.isPromoted ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-secondary"}`}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(startup.id)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Startup" : "Add New Startup"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Startup Name</label>
                <input required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Short Description</label>
                <textarea required rows={2} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Long Description</label>
                <textarea required rows={4} value={form.longDescription} onChange={(e) => setForm(f => ({ ...f, longDescription: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Category</label>
                  <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Founded Date</label>
                  <input type="date" required value={form.foundedDate} onChange={(e) => setForm(f => ({ ...f, foundedDate: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Founders (comma-separated)</label>
                <input required value={foundersInput} onChange={(e) => setFoundersInput(e.target.value)} placeholder="Arjun Mehta, Priya Sharma" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Website URL</label>
                  <input type="url" required value={form.websiteUrl} onChange={(e) => setForm(f => ({ ...f, websiteUrl: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Image URL</label>
                  <input required value={form.imageUrl} onChange={(e) => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="isPromoted" checked={form.isPromoted} onChange={(e) => setForm(f => ({ ...f, isPromoted: e.target.checked }))} className="h-4 w-4 rounded border-input accent-primary" />
                <label htmlFor="isPromoted" className="text-sm font-medium">Feature this startup on homepage</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">
                  {editingId ? "Save Changes" : "Create Startup"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
