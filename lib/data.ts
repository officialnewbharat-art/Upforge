import { createClient } from '@supabase/supabase-js'

// --- Supabase Client Configuration ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Startup = {
  id: string
  name: string
  description: string
  imageUrl: string
  founders: string[]
  foundedDate: string
  websiteUrl: string
  category: string
  updatedBy: string
  isPromoted: boolean
  longDescription: string
  ratingBadge: string // Added to support the UI badge logic
}

export const categories = [
  "All",
  "Tech",
  "Fintech",
  "HealthTech",
  "EdTech",
  "E-Commerce",
  "SaaS",
  "CleanTech",
  "AgriTech",
] as const

// --- Supabase Data Fetching Functions ---

export async function getStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
  
  if (error || !data) {
    console.error("Error fetching startups:", error)
    return []
  }
  return data
}

export async function getStartupById(id: string): Promise<Startup | undefined> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching startup ${id}:`, error)
    return undefined
  }
  return data
}

export async function getPromotedStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    // Changed 'isPromoted' to lowercase 'ispromoted' to fix Vercel/Postgres error
    .eq('ispromoted', true) 

  if (error || !data) {
    console.error("Error fetching promoted startups:", error)
    return []
  }
  return data
}

export async function getRecentStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .order('foundedDate', { ascending: false })

  if (error || !data) {
    console.error("Error fetching recent startups:", error)
    return []
  }
  return data
}

export async function getStartupsByCategory(category: string): Promise<Startup[]> {
  if (category === "All") return getStartups()
  
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('category', category)

  if (error || !data) {
    console.error(`Error fetching startups for category ${category}:`, error)
    return []
  }
  return data
}
