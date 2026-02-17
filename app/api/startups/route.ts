import { NextRequest, NextResponse } from "next/server"
import {
  getStartups, // Changed from startups
  getPromotedStartups,
  getRecentStartups,
  getStartupsByCategory,
} from "@/lib/data"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get("category")
  const type = searchParams.get("type")

  let data

  if (type === "promoted") {
    data = await getPromotedStartups()
  } else if (type === "recent") {
    data = await getRecentStartups()
  } else if (category && category !== "All") {
    data = await getStartupsByCategory(category)
  } else {
    data = await getStartups() // Use the function here
  }

  return NextResponse.json(data)
}
