import { NextRequest, NextResponse } from "next/server"
import {
  startups,
  getPromotedStartups,
  getRecentStartups,
  getStartupsByCategory,
} from "@/lib/data"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") // "top" | "recent" | null
  const category = searchParams.get("category") // category filter
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  let result = startups

  if (type === "top") {
    result = getPromotedStartups()
  } else if (type === "recent") {
    result = getRecentStartups()
  }

  if (category && category !== "All") {
    result = result.filter((s) => s.category === category)
  }

  const total = result.length
  const offset = (page - 1) * limit
  const paginated = result.slice(offset, offset + limit)

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}
