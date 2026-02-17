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
  ratingBadge: "Verified" | "Rising" | "Trusted" | "New"
  isPromoted: boolean
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

export const startups: Startup[] = [
  {
    id: "1",
    name: "PaySure",
    description:
      "Next-generation payment infrastructure for Indian SMBs, enabling instant UPI-based settlements and credit lines.",
    imageUrl: "/images/startups/paysure.jpg",
    founders: ["Arjun Mehta", "Priya Sharma"],
    foundedDate: "2023-03-15",
    websiteUrl: "https://paysure.example.com",
    category: "Fintech",
    updatedBy: "Admin",
    ratingBadge: "Trusted",
    isPromoted: true,
    longDescription:
      "PaySure is transforming the way Indian small and medium businesses handle payments. Built on cutting-edge UPI infrastructure, PaySure offers instant settlement, working capital credit lines, and seamless reconciliation. Trusted by over 50,000 merchants across 18 states, PaySure is on a mission to make financial tools accessible to every business in India.",
  },
  {
    id: "2",
    name: "MediBridge",
    description:
      "AI-powered diagnostics platform connecting rural patients with specialist doctors through telemedicine.",
    imageUrl: "/images/startups/medibridge.jpg",
    founders: ["Dr. Kavita Rao", "Sanjay Iyer"],
    foundedDate: "2022-08-10",
    websiteUrl: "https://medibridge.example.com",
    category: "HealthTech",
    updatedBy: "Admin",
    ratingBadge: "Verified",
    isPromoted: true,
    longDescription:
      "MediBridge leverages artificial intelligence and telemedicine to bridge the healthcare gap between urban specialists and rural communities. Their proprietary diagnostic engine has screened over 2 million patients, achieving 94% accuracy in preliminary diagnoses. With partnerships across 200+ primary health centres, MediBridge is redefining accessible healthcare in India.",
  },
  {
    id: "3",
    name: "LearnForge",
    description:
      "Personalized upskilling platform for India's workforce, offering micro-credentials in emerging technologies.",
    imageUrl: "/images/startups/learnforge.jpg",
    founders: ["Rohan Desai"],
    foundedDate: "2023-01-20",
    websiteUrl: "https://learnforge.example.com",
    category: "EdTech",
    updatedBy: "Admin",
    ratingBadge: "Rising",
    isPromoted: true,
    longDescription:
      "LearnForge is India's fastest-growing upskilling platform, offering bite-sized micro-credentials in AI, cloud computing, cybersecurity, and data science. With adaptive learning paths powered by AI, LearnForge has helped over 100,000 professionals advance their careers. Their employer partnership program connects skilled graduates directly with hiring companies.",
  },
  {
    id: "4",
    name: "GreenGrid",
    description:
      "Decentralized solar energy marketplace enabling peer-to-peer clean energy trading in Indian cities.",
    imageUrl: "/images/startups/greengrid.jpg",
    founders: ["Anika Patel", "Vikram Singh"],
    foundedDate: "2022-11-05",
    websiteUrl: "https://greengrid.example.com",
    category: "CleanTech",
    updatedBy: "Admin",
    ratingBadge: "Verified",
    isPromoted: true,
    longDescription:
      "GreenGrid is pioneering India's transition to decentralized renewable energy. Their marketplace allows solar panel owners to trade surplus energy with neighbours, reducing dependence on the traditional grid. Active in 12 cities, GreenGrid has facilitated over 500 MWh of peer-to-peer energy trades, saving participants an average of 30% on electricity bills.",
  },
  {
    id: "5",
    name: "KisanConnect",
    description:
      "Farm-to-market supply chain platform eliminating middlemen and ensuring fair prices for Indian farmers.",
    imageUrl: "/images/startups/kisanconnect.jpg",
    founders: ["Deepak Kumar", "Meera Joshi"],
    foundedDate: "2021-06-12",
    websiteUrl: "https://kisanconnect.example.com",
    category: "AgriTech",
    updatedBy: "Admin",
    ratingBadge: "Trusted",
    isPromoted: false,
    longDescription:
      "KisanConnect directly links Indian farmers with retailers and consumers, cutting out layers of middlemen that traditionally erode farmer earnings. Their logistics network spans 8 states, with real-time price discovery, cold-chain tracking, and instant payments. Over 75,000 farmers have increased their income by an average of 40% through the platform.",
  },
  {
    id: "6",
    name: "ShopLocal",
    description:
      "Hyperlocal e-commerce platform empowering neighbourhood stores with digital storefronts and delivery.",
    imageUrl: "/images/startups/shoplocal.jpg",
    founders: ["Neha Gupta"],
    foundedDate: "2023-05-22",
    websiteUrl: "https://shoplocal.example.com",
    category: "E-Commerce",
    updatedBy: "Admin",
    ratingBadge: "Rising",
    isPromoted: false,
    longDescription:
      "ShopLocal transforms neighbourhood kirana stores into digital-first businesses. With a simple onboarding process, store owners get a branded online storefront, inventory management, and hyperlocal delivery—all within 30 minutes. Active in 6 metro cities, ShopLocal serves over 15,000 stores and processes 200,000+ orders monthly.",
  },
  {
    id: "7",
    name: "CloudNest",
    description:
      "India-first cloud infrastructure provider offering affordable, high-performance hosting for startups.",
    imageUrl: "/images/startups/cloudnest.jpg",
    founders: ["Amit Verma", "Sneha Reddy"],
    foundedDate: "2022-02-14",
    websiteUrl: "https://cloudnest.example.com",
    category: "SaaS",
    updatedBy: "Admin",
    ratingBadge: "Trusted",
    isPromoted: false,
    longDescription:
      "CloudNest provides India-based cloud infrastructure specifically designed for the needs and budgets of Indian startups. With data centres in Mumbai and Bengaluru, CloudNest offers 99.99% uptime, automatic scaling, and pricing up to 60% lower than global alternatives. Over 3,000 startups trust CloudNest to power their applications.",
  },
  {
    id: "8",
    name: "FinScope",
    description:
      "AI-driven wealth management platform democratising investment advisory for India's middle class.",
    imageUrl: "/images/startups/finscope.jpg",
    founders: ["Rahul Nair"],
    foundedDate: "2023-09-01",
    websiteUrl: "https://finscope.example.com",
    category: "Fintech",
    updatedBy: "Admin",
    ratingBadge: "New",
    isPromoted: false,
    longDescription:
      "FinScope brings institutional-grade investment advisory to everyday Indians. Their AI engine analyses market conditions, risk profiles, and financial goals to deliver personalised portfolio recommendations. With a minimum investment of just Rs 500, FinScope has onboarded over 200,000 users and manages assets worth Rs 800 crore.",
  },
  {
    id: "9",
    name: "CodeCraft",
    description:
      "No-code platform enabling Indian entrepreneurs to build and launch apps without writing a single line of code.",
    imageUrl: "/images/startups/codecraft.jpg",
    founders: ["Tanvi Shah", "Karan Malhotra"],
    foundedDate: "2022-07-18",
    websiteUrl: "https://codecraft.example.com",
    category: "Tech",
    updatedBy: "Admin",
    ratingBadge: "Verified",
    isPromoted: false,
    longDescription:
      "CodeCraft empowers non-technical founders to bring their ideas to life with a powerful drag-and-drop app builder. From e-commerce stores to internal tools, CodeCraft supports complex workflows, API integrations, and responsive design—all without code. Over 8,000 apps have been built on the platform, with an average launch time of just 5 days.",
  },
  {
    id: "10",
    name: "AquaPure",
    description:
      "IoT-based water quality monitoring and purification system for urban housing societies.",
    imageUrl: "/images/startups/aquapure.jpg",
    founders: ["Pooja Deshpande"],
    foundedDate: "2024-01-10",
    websiteUrl: "https://aquapure.example.com",
    category: "CleanTech",
    updatedBy: "Admin",
    ratingBadge: "New",
    isPromoted: false,
    longDescription:
      "AquaPure combines IoT sensors with advanced purification technology to deliver real-time water quality monitoring for housing societies. Their smart dashboard alerts residents and management to contamination risks instantly, while their purification modules ensure safe drinking water 24/7. Deployed in 150+ societies across Pune, Mumbai, and Hyderabad.",
  },
]

export function getStartupById(id: string): Startup | undefined {
  return startups.find((s) => s.id === id)
}

export function getPromotedStartups(): Startup[] {
  return startups.filter((s) => s.isPromoted)
}

export function getRecentStartups(): Startup[] {
  return [...startups].sort(
    (a, b) =>
      new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime()
  )
}

export function getStartupsByCategory(category: string): Startup[] {
  if (category === "All") return startups
  return startups.filter((s) => s.category === category)
}
