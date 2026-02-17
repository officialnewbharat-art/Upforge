import { createClient } from '@supabase/supabase-js'

// --- Supabase Client Configuration ---
// Add these to your .env.local file:
// NEXT_PUBLIC_SUPABASE_URL=your-project-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
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
  isPromoted: boolean // Used for the "Featured" tag
  longDescription: string
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

/**
 * Local Data Placeholder
 * Note: Once you migrate to Supabase, you can remove this array and 
 * use the async functions below to fetch live data.
 */
export const startups: Startup[] = [
  {
    id: "1",
    name: "PaySure",
    description: "Next-generation payment infrastructure for Indian SMBs, enabling instant UPI-based settlements.",
    imageUrl: "/images/startups/paysure.jpg",
    founders: ["Arjun Mehta", "Priya Sharma"],
    foundedDate: "2023-03-15",
    websiteUrl: "https://paysure.example.com",
    category: "Fintech",
    updatedBy: "Admin",
    isPromoted: true,
    longDescription: "PaySure is transforming the way Indian small and medium businesses handle payments. Built on cutting-edge UPI infrastructure, PaySure offers instant settlement, working capital credit lines, and seamless reconciliation.",
  },
  {
    id: "2",
    name: "MediBridge",
    description: "AI-powered diagnostics platform connecting rural patients with specialist doctors.",
    imageUrl: "/images/startups/medibridge.jpg",
    founders: ["Dr. Kavita Rao", "Sanjay Iyer"],
    foundedDate: "2022-08-10",
    websiteUrl: "https://medibridge.example.com",
    category: "HealthTech",
    updatedBy: "Admin",
    isPromoted: true,
    longDescription: "MediBridge leverages artificial intelligence and telemedicine to bridge the healthcare gap between urban specialists and rural communities.",
  },
  {
    id: "3",
    name: "LearnForge",
    description: "Personalized upskilling platform for India's workforce, offering micro-credentials.",
    imageUrl: "/images/startups/learnforge.jpg",
    founders: ["Rohan Desai"],
    foundedDate: "2023-01-20",
    websiteUrl: "https://learnforge.example.com",
    category: "EdTech",
    updatedBy: "Admin",
    isPromoted: true,
    longDescription: "LearnForge is India's fastest-growing upskilling platform, offering bite-sized micro-credentials in AI, cloud computing, and cybersecurity.",
  },
  {
    id: "4",
    name: "GreenGrid",
    description: "Decentralized solar energy marketplace enabling peer-to-peer clean energy trading.",
    imageUrl: "/images/startups/greengrid.jpg",
    founders: ["Anika Patel", "Vikram Singh"],
    foundedDate: "2022-11-05",
    websiteUrl: "https://greengrid.example.com",
    category: "CleanTech",
    updatedBy: "Admin",
    isPromoted: true,
    longDescription: "GreenGrid is pioneering India's transition to decentralized renewable energy by allowing solar owners to trade surplus power.",
  },
  {
    id: "5",
    name: "KisanConnect",
    description: "Farm-to-market supply chain platform eliminating middlemen for Indian farmers.",
    imageUrl: "/images/startups/kisanconnect.jpg",
    founders: ["Deepak Kumar", "Meera Joshi"],
    foundedDate: "2021-06-12",
    websiteUrl: "https://kisanconnect.example.com",
    category: "AgriTech",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "KisanConnect directly links Indian farmers with retailers, ensuring real-time price discovery and instant payments.",
  },
  {
    id: "6",
    name: "ShopLocal",
    description: "Hyperlocal e-commerce platform empowering neighbourhood stores with digital storefronts.",
    imageUrl: "/images/startups/shoplocal.jpg",
    founders: ["Neha Gupta"],
    foundedDate: "2023-05-22",
    websiteUrl: "https://shoplocal.example.com",
    category: "E-Commerce",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "ShopLocal transforms neighbourhood kirana stores into digital-first businesses within 30 minutes.",
  },
  {
    id: "7",
    name: "CloudNest",
    description: "India-first cloud infrastructure provider offering affordable hosting for startups.",
    imageUrl: "/images/startups/cloudnest.jpg",
    founders: ["Amit Verma", "Sneha Reddy"],
    foundedDate: "2022-02-14",
    websiteUrl: "https://cloudnest.example.com",
    category: "SaaS",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "CloudNest provides India-based cloud infrastructure specifically designed for the budget of Indian startups.",
  },
  {
    id: "8",
    name: "FinScope",
    description: "AI-driven wealth management platform democratising investment advisory.",
    imageUrl: "/images/startups/finscope.jpg",
    founders: ["Rahul Nair"],
    foundedDate: "2023-09-01",
    websiteUrl: "https://finscope.example.com",
    category: "Fintech",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "FinScope brings institutional-grade investment advisory to everyday Indians with a minimum investment of just Rs 500.",
  },
  {
    id: "9",
    name: "CodeCraft",
    description: "No-code platform enabling entrepreneurs to build apps without writing code.",
    imageUrl: "/images/startups/codecraft.jpg",
    founders: ["Tanvi Shah", "Karan Malhotra"],
    foundedDate: "2022-07-18",
    websiteUrl: "https://codecraft.example.com",
    category: "Tech",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "CodeCraft empowers non-technical founders to build complex workflows and responsive apps with drag-and-drop tools.",
  },
  {
    id: "10",
    name: "AquaPure",
    description: "IoT-based water quality monitoring and purification for urban housing societies.",
    imageUrl: "/images/startups/aquapure.jpg",
    founders: ["Pooja Deshpande"],
    foundedDate: "2024-01-10",
    websiteUrl: "https://aquapure.example.com",
    category: "CleanTech",
    updatedBy: "Admin",
    isPromoted: false,
    longDescription: "AquaPure combines IoT sensors with advanced purification technology to ensure safe drinking water 24/7.",
  },
]

// --- Supabase Data Fetching Functions ---

export async function getStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
  
  if (error) {
    console.error("Error fetching startups:", error)
    return startups // Fallback to local data
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
    return startups.find((s) => s.id === id)
  }
  return data
}

export async function getPromotedStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('isPromoted', true)

  if (error) {
    return startups.filter((s) => s.isPromoted)
  }
  return data
}

export async function getRecentStartups(): Promise<Startup[]> {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .order('foundedDate', { ascending: false })

  if (error) {
    return [...startups].sort(
      (a, b) => new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime()
    )
  }
  return data
}

export async function getStartupsByCategory(category: string): Promise<Startup[]> {
  if (category === "All") return getStartups()
  
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('category', category)

  if (error) {
    return startups.filter((s) => s.category === category)
  }
  return data
}
