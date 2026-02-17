"use client"

import { categories } from "@/lib/data"

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string
  onChange: (cat: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
            active === cat
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
