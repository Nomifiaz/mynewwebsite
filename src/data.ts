import { Product } from "./types";

export interface CategoryType {
  id: string | number;
  name: string;
  imageUrl: string;
}

export const CATEGORIES: CategoryType[] = [
  { id: "furniture", name: "Furniture", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=150" },
  { id: "electronics", name: "Electronics", imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=150" },
  { id: "fashion", name: "Fashion", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=150" },
  { id: "homedecor", name: "Home Decor", imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=150" },
  { id: "healthbeauty", name: "Health & Beauty", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=150" },
  { id: "sports", name: "Sports", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=150" }
];

export const PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: "wilson-watch",
    name: "Wilson Ultra Power XL Watch",
    subtitle: "Motion View Series",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    ratingCount: 120,
    price: 1899,
    originalPrice: 1999,
    tag: "Limited Offer",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Experience premium activity tracking combined with fine classic mechanical finishes. Crafted for the modern professional requiring multi-day wearability and seamless iOS ecosystem synchronization.",
    colors: ["#8B5A2B", "#1C1C1C", "#EDEDED"],
    sizes: ["40mm", "44mm"],
    specs: [
      { name: "Movement", value: "Motion Quartz Kinetic" },
      { name: "Case Size", value: "44mm Circular Gold-Tone" },
      { name: "Strap", value: "Premium Handcrafted Tan Leather" },
      { name: "Water Resistance", value: "5 ATM (50 meters)" },
      { name: "Battery Life", value: "Up to 14 Days" }
    ],
    reviews: [
      { id: "r1", user: "Sarah Jenkins", stars: 5, comment: "Absolutely gorgeous watch. Blends perfectly with formal wear and sports tracking.", date: "May 12, 2026" },
      { id: "r2", user: "Michael Chen", stars: 4, comment: "Highly accurate GPS tracking and elegant leather strap.", date: "April 28, 2026" }
    ]
  },
  {
    id: "pro-laptop",
    name: "Pro Series Laptop M2",
    subtitle: "Professional Workstation",
    category: "Electronics",
    brand: "Apple",
    rating: 5.0,
    ratingCount: 89,
    price: 2499,
    tag: "Aesthetic Premium",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Built for creatives, developers, and professionals. Experience blazing fast compile speeds and gorgeous fluid retina visuals that elevate your production output. Featuring a fanless cool casing.",
    colors: ["#7D7D7D", "#E3E3E3"],
    sizes: ["13-inch", "15-inch"],
    specs: [
      { name: "Processor", value: "M2 Octa-Core Ultra" },
      { name: "Memory", value: "16GB Unified RAM" },
      { name: "Storage", value: "512GB PCIe NVMe SSD" },
      { name: "Display", value: "15.4\" Liquid Retina HDR" },
      { name: "OS", value: "macOS Sonoma pre-installed" }
    ],
    reviews: [
      { id: "r3", user: "David Miller", stars: 5, comment: "Fastest developer workstation I have ever loaded. Liquid smooth screen response.", date: "June 05, 2026" }
    ]
  },
  {
    id: "soundpure-anc",
    name: "SoundPure Active ANC Headphones",
    subtitle: "Audio Engineering",
    category: "Electronics",
    brand: "Sony",
    rating: 4.7,
    ratingCount: 245,
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Block outside distraction with our active hybrid noise cancellation. Enjoy rich, warm bass profiles, clear vocals, and long-lasting wireless comfort on transcontinental flights.",
    colors: ["#1F1F1F", "#EDEDED"],
    sizes: ["Standard Fit"],
    specs: [
      { name: "Acoustics", value: "Custom 40mm Neodymium Drivers" },
      { name: "Noise Cancellation", value: "Active Smart Hybrid ANC" },
      { name: "Bluetooth Version", value: "5.2 Dual Sync" },
      { name: "Weight", value: "240 grams for long wear comfort" },
      { name: "Charging Time", value: "10 min boost gives 5 hrs" }
    ],
    reviews: [
      { id: "r4", user: "Alice Rogers", stars: 5, comment: "I wear these 8 hours a day working from home. Absolutely blissfully quiet.", date: "June 11, 2026" }
    ]
  },
  {
    id: "nexus-x10",
    name: "Nexus X10 Smartphone",
    subtitle: "5G Mobile Experience",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.9,
    ratingCount: 312,
    price: 1199,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Sleek and incredibly light. Featuring a triple-lens zoom lens camera block that captures ultra-high-definition lowlight nature and architectural shots. Comes in elegant gold-sand finish.",
    colors: ["#E6C280", "#2C3E50", "#7F8C8D"],
    sizes: ["128GB", "256GB"],
    specs: [
      { name: "Screen", value: "6.7\" Dynamic AMOLED 120Hz" },
      { name: "Camera Block", value: "108MP Main + 12MP Ultra-Wide + 10x Optical" },
      { name: "Process Engine", value: "Snapdragon Gen 4 Neural Core" },
      { name: "Charging", value: "45W Wired and 15W Qi Wireless" }
    ],
    reviews: [
      { id: "r5", user: "Marcus Aurelius", stars: 5, comment: "Fabulous zoom features and pristine high-nit screen in daylight.", date: "May 29, 2026" }
    ]
  },
  {
    id: "active-fit-tracker",
    name: "Active Pro Fit Tracker",
    subtitle: "Fitness Gear",
    category: "Electronics",
    brand: "Sony",
    rating: 4.7,
    ratingCount: 94,
    price: 299,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600"],
    description: "Track steps, deep sleep phases, heart variability indexes, and athletic activity in real-time. Built specifically for endurance trails and watersport exercises.",
    colors: ["#1C1C1C", "#E74C3C"],
    sizes: ["Standard"],
    specs: [
      { name: "Sensors", value: "Optical HR, SpO2, Barometer, Tri-Axis Gyro" },
      { name: "Outer Frame", value: "High-Strength Impact Polymer" },
      { name: "Submersion", value: "Waterproof up to 100m" }
    ],
    reviews: []
  },
  {
    id: "canvas-pad-12",
    name: "Canvas Pad Pro 12\"",
    subtitle: "Creativity Unlocked",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    ratingCount: 156,
    price: 849,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600"],
    description: "Unravel your finest design strokes, drawings, and spreadsheet revisions. Designed specifically to pair with low-latency stylus systems. Premium matte coating screen.",
    colors: ["#2C3E50", "#BDC3C7"],
    sizes: ["12.9-inch"],
    specs: [
      { name: "Resolution", value: "2732-by-2048 Liquid Touch display" },
      { name: "Digital Pen Support", value: "Stylus Gen Pro (Low-Latency)" }
    ],
    reviews: []
  },
  {
    id: "zenith-console",
    name: "Zenith Game Console",
    subtitle: "Pure Entertainment",
    category: "Electronics",
    brand: "Sony",
    rating: 4.9,
    ratingCount: 218,
    price: 499,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600"],
    description: "Enter massive multiplayer online worlds in incredible true native 4K resolutions. Next-generation SSD technology almost entirely removes startup waiting screens.",
    colors: ["#FFFFFF", "#111111"],
    sizes: ["1TB Digital", "2TB Disc Drive"],
    specs: [
      { name: "Graphics Engine", value: "Custom RDNA 2 Cores with Ray-Tracing" },
      { name: "Refresh Speed", value: "Up to 120 fps for fluid simulations" }
    ],
    reviews: []
  },
  {
    id: "nomad-speaker",
    name: "Nomad Mini Speaker",
    subtitle: "Portable Audio",
    category: "Electronics",
    brand: "Sony",
    rating: 4.6,
    ratingCount: 72,
    price: 129,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600"],
    description: "Compact size that packs room-filling acoustics. Excellent outdoors speaker with high water splash resistance and passive bass radiators.",
    colors: ["#111111", "#1D3557"],
    sizes: ["Pocket Size"],
    specs: [
      { name: "Battery Life", value: "Over 18 hours of endless playback" },
      { name: "Bluetooth Range", value: "Stable connection up to 30 meters" }
    ],
    reviews: []
  },

  // --- CENTERPIECE FOR DETAIL: ZENITH SERIES X2 ---
  {
    id: "zenith-x2",
    name: "Zenith Series X2 Chronograph",
    subtitle: "Wearables & Premium Chronographs",
    category: "Electronics",
    brand: "Samsung",
    rating: 5.0,
    ratingCount: 1248,
    price: 899,
    originalPrice: 1299,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The Zenith Series X2 Chronograph is more than just a timepiece; it's a statement of engineering excellence and sophisticated style. Built with an aerospace-grade titanium case, it features our proprietary Quantum-Quartz movement for millisecond accuracy. Whether you're in the boardroom or on a mountain peak, the X2 adapts to your lifestyle. The anti-reflective sapphire crystal ensures clarity in any lighting, while the 100m water resistance means you're never restricted.",
    colors: ["#1F2937", "#9CA3AF", "#064E3B"], // slate-blue, gray, forest green
    sizes: ["42mm", "46mm"],
    specs: [
      { name: "Movement", value: "Swiss Quantum-Quartz" },
      { name: "Case Material", value: "Grade 5 Titanium" },
      { name: "Connectivity", value: "Bluetooth 5.3, NFC, GPS" },
      { name: "Water Resistance", value: "10 ATM (100 meters)" },
      { name: "Sensors", value: "Heart Rate, SpO2, Altimeter" },
      { name: "Compatibility", value: "iOS & Android Compatible" }
    ],
    reviews: [
      { id: "r10", user: "Alexander Vance", stars: 5, comment: "Absolutely marvelous. The titanium chassis sits lightweight on my wrist. Highly refined software.", date: "June 14, 2026" },
      { id: "r11", user: "Dr. Clara Lin", stars: 5, comment: "Exceptional heartrate accuracy aligned with fitness-grade trackers. Seamless notifications stream.", date: "May 30, 2026" }
    ]
  },

  // --- RELATED / YOU MIGHT ALSO LIKE PRODUCTS ---
  {
    id: "zenith-strap",
    name: "Zenith Classic Strap",
    subtitle: "Premium Watch Accessories",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    ratingCount: 104,
    price: 49,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600"],
    description: "Genuine high-grade Italian leather strap custom configured for luxury smartwatch lugs. Hand-stitched with reinforced linen yarn.",
    specs: [{ name: "Material", value: "Genuine Full-Grain Leather" }],
    reviews: []
  },
  {
    id: "duo-charge-pro",
    name: "Duo Charge Pro",
    subtitle: "High Speed Multi-Charger",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.9,
    ratingCount: 68,
    price: 129,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=600"],
    description: "Sleek matte-black weighted desktop stand that simultaneously powers your premium wireless smartwatch and smartphone with high-wattage charging coils.",
    specs: [{ name: "Charging standard", value: "Qi 15W Fast Charge Certified" }],
    reviews: []
  },
  {
    id: "aura-series-7",
    name: "Aura Series 7 Watch",
    subtitle: "Classic Hybrid Wristwatch",
    category: "Electronics",
    brand: "Apple",
    rating: 4.7,
    ratingCount: 142,
    price: 749,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600"],
    description: "Exquisite analog watch face layout integrated onto modern smart components. Solid stainless steel wristbands.",
    specs: [{ name: "Build", value: "Grade 316L Stainless Steel" }],
    reviews: []
  },
  {
    id: "sonic-buds-max",
    name: "Sonic Buds Max",
    subtitle: "True Wireless Earbuds",
    category: "Electronics",
    brand: "Sony",
    rating: 5.0,
    ratingCount: 180,
    price: 349,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600"],
    description: "Ultra lightweight audio fit. Adaptive sound algorithms modify equalize profiles in accordance with surrounding decibel levels automatically.",
    specs: [{ name: "Format", value: "TWS Earbuds with charging capsule" }],
    reviews: []
  },

  // --- CAROUSEL: "YOU MIGHT ALSO LIKE" AT BOTTOM OF CART ---
  {
    id: "chrono-x-smart",
    name: "Chrono-X Smart Watch",
    subtitle: "Elite Sports Smartwear",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.8,
    ratingCount: 124,
    price: 189,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600"],
    description: "Sleek smartwatch for tracking active speed metrics, deep-water diving levels, and cardiac pressure patterns seamlessly.",
    specs: [],
    reviews: []
  },
  {
    id: "sonic-bloom",
    name: "Sonic Bloom Pro Headphones",
    subtitle: "High Definition Over-Ear Wireless",
    category: "Electronics",
    brand: "Sony",
    rating: 4.9,
    ratingCount: 82,
    price: 320,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600"],
    description: "Professional reference audio headsets built with acoustic wooden dampening shells to remove natural sound flutter.",
    specs: [],
    reviews: []
  },
  {
    id: "lumina-desk-arc",
    name: "Lumina Desk Arc",
    subtitle: "Architectural Work Light",
    category: "Home Decor",
    brand: "Other",
    rating: 4.7,
    ratingCount: 45,
    price: 65,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600"],
    description: "Sleek steel reading light. Calibrated white color temps from cozy warm yellow 2700K to hyper-clear surgical 6000K to boost concentration.",
    specs: [],
    reviews: []
  },
  {
    id: "executive-leather-case",
    name: "Executive Leather Case",
    subtitle: "Bespoke Portfolio Protectors",
    category: "Fashion",
    brand: "Other",
    rating: 5.0,
    ratingCount: 19,
    price: 115,
    image: "https://images.unsplash.com/photo-1541667590996-240fa2c145cd?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1541667590996-240fa2c145cd?auto=format&fit=crop&q=80&w=600"],
    description: "Handcrafted cognac leather sleeves designed to carry top tier ultrabooks, legal notebooks, and active styluses neatly.",
    specs: [],
    reviews: []
  },

  // --- DEFAULT CART EXTRA ITEMS (Not strictly electronics but lifestyle products found in cart screenshot) ---
  {
    id: "urban-velocity",
    name: "Urban Velocity X1",
    subtitle: "Aesthetic Active Sneakers",
    category: "Fashion",
    brand: "Sony", // Generic mapping OR custom
    rating: 4.8,
    ratingCount: 389,
    price: 129,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600"],
    description: "Responsive athletic running shoes designed with dual compound cushioning layers in classic orange and polar-white highlights.",
    specs: [
      { name: "Cushioning", value: "Elastic Air Cells v2" },
      { name: "Accent Colors", value: "Arctic White & Solar Flame Orange" }
    ],
    reviews: []
  },
  {
    id: "tabpro-elite",
    name: "TabPro Elite Gen 4",
    subtitle: "High Spec Design Pad",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.9,
    ratingCount: 112,
    price: 899,
    image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80&w=600"],
    description: "Next-gen computing power fitted in 5.1mm depth. Ultra wide color gamut, multi-window enterprise workflow layout support, high density dual speaker arrays.",
    specs: [
      { name: "Display", value: "11.6\" HDR10+ OLED 120Hz" },
      { name: "Network Cores", value: "Integrated Wi-Fi 6E + sub-6GHz 5G Bands" }
    ],
    reviews: []
  },
  {
    id: "aviator-noir",
    name: "Aviator Noir Edition Sunglasses",
    subtitle: "Premium Eyeshield Accessories",
    category: "Fashion",
    brand: "Apple",
    rating: 4.7,
    ratingCount: 52,
    price: 245,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600"],
    description: "Classic gold-gilded frame layout paired with legendary polarized G-15 high contrast protective glass lenses.",
    specs: [
      { name: "Lenses Type", value: "G-15 Polarized Anti-Glare" },
      { name: "Temples Material", value: "Bespoke Cellulose Acetate Cores" }
    ],
    reviews: []
  },

  // --- OTHERS CATEGORIES FILLERS TO INSURE COMPLETION ---
  // FURNITURE
  {
    id: "scandi-chair",
    name: "Scandinavian Wood Armchair",
    subtitle: "Oakwood Living Classics",
    category: "Furniture",
    brand: "Other",
    rating: 4.8,
    ratingCount: 65,
    price: 349,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600"],
    description: "Solid sustainable white oak frame meticulously smoothed and rounded, fitted with durable organic canvas sitting foam pillows.",
    specs: [],
    reviews: []
  },
  {
    id: "velvet-lounge",
    name: "Velvet Lounge Accent Chair",
    subtitle: "Mid-Century Modern Luxury",
    category: "Furniture",
    brand: "Other",
    rating: 4.9,
    ratingCount: 28,
    price: 599,
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&q=80&w=600"],
    description: "Soft sensory velvet upholstering sitting on golden detailed brass base, designed to anchor any sophisticated reading lounge area.",
    specs: [],
    reviews: []
  },
  // SPORTS
  {
    id: "dumbbells-set",
    name: "Pro Ergonomic Dumbbells Set",
    subtitle: "Home Strength Workouts",
    category: "Sports",
    brand: "Other",
    rating: 4.7,
    ratingCount: 46,
    price: 59,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=600"],
    description: "Comfortable shock-absorbing textured neoprene hand grips preventing callouses and slips, featuring solid cast steel core weights.",
    specs: [],
    reviews: []
  },
  {
    id: "steel-flask",
    name: "Elite Hydration Steel Flask",
    subtitle: "Dual Wall Vacuum Flask",
    category: "Sports",
    brand: "Other",
    rating: 4.9,
    ratingCount: 115,
    price: 35,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600"],
    description: "Keep sports drinks ice cold up to 36 hours. Constructed with medicalgrade 18/8 stainless steel to maintain pure fluid flavor with Zero BPA leaks.",
    specs: [],
    reviews: []
  },
  // HEALTH & BEAUTY
  {
    id: "sonic-cleanser",
    name: "AuraSonic Skin Facial Cleanser",
    subtitle: "Smart Skin Therapy",
    category: "Health & Beauty",
    brand: "Other",
    rating: 4.8,
    ratingCount: 142,
    price: 189,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600"],
    description: "Cleanse and stimulate cellular renewal with gentle thermo-sonic pulsations. Perfect ergonomic design with soft antibacterial silicone bristles suitable for all skin profiles.",
    specs: [
      { name: "Pulsations", value: "8,000 T-Sonic beats per minute" },
      { name: "Material", value: "Medical-grade Ultra-soft Silicone" },
      { name: "Waterproof Rating", value: "IPX7 Full Submersion" }
    ],
    reviews: []
  },
  {
    id: "therapulse-massage",
    name: "TheraPulse Deep Tissue Massage Gun",
    subtitle: "Pro Muscle Recuperation",
    category: "Health & Beauty",
    brand: "Other",
    rating: 4.9,
    ratingCount: 312,
    price: 299,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600"],
    description: "Relieve sore muscle filaments and tension build-ups with our silent brushless percussion motor. Equipped with 6 certified premium density massage tips.",
    specs: [
      { name: "Motor Speed", value: "Up to 3,200 RPM Smart Brushless" },
      { name: "Battery Capacity", value: "24V Lithium-ion (Up to 6 Hrs)" }
    ],
    reviews: []
  },
  // ADDED HOME DECOR FILLERS
  {
    id: "mist-aroma-humidifier",
    name: "Mist-Aroma Ultrasonic Air Humidifier",
    subtitle: "Aesthetic Wellness Diffuser",
    category: "Home Decor",
    brand: "Other",
    rating: 4.7,
    ratingCount: 78,
    price: 95,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600"],
    description: "Infuse modern micro-mist and soothing ambient illumination into your bedroom nightstands. Featuring Whisper-quiet components and a automatic fluid safety-switch.",
    specs: [
      { name: "Capacity", value: "500ml Water Reservoir" },
      { name: "Diffusion Time", value: "UP to 10 Hours Continuous" }
    ],
    reviews: []
  }
];

// Seed standard default cart state representing the Exact items shown in checkout cart page:
export const DEFAULT_CART_ITEMS = [
  {
    id: "cart-item-1",
    product: PRODUCTS.find(p => p.id === "urban-velocity")!,
    quantity: 1,
    selectedColor: "#FFFFFF", // Arctic White
    selectedSize: "US 10.5"
  },
  {
    id: "cart-item-2",
    product: PRODUCTS.find(p => p.id === "tabpro-elite")!,
    quantity: 1,
    selectedColor: "#2C3E50",
    selectedSize: "256GB | Wi-Fi + 5G"
  },
  {
    id: "cart-item-3",
    product: PRODUCTS.find(p => p.id === "aviator-noir")!,
    quantity: 1,
    selectedColor: "#111111", // Matte Black
    selectedSize: "Matte Black | Polarized G-15"
  }
].filter(item => item.product !== undefined); // safe guard
