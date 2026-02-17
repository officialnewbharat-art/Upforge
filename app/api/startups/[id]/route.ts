import { NextResponse } from "next/server"
import { getStartupById } from "@/lib/data"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const startup = getStartupById(id)

  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 })
  }

  return NextResponse.json({ data: startup })
}
