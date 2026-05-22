export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // in INR
  priceInPaise: number; // For Razorpay integration (price * 100)
  originalPrice?: number; // for discount display
  description: string;
  image: string;
  images?: string[]; // Multiple camera angles for the 3D orbit viewer
  category: 'Tees' | 'Hoodies' | 'Cargoes' | 'Shirts' | 'Knitwear' | 'Accessories';
  tags: string[];
  gender: 'Unisex' | 'Boys' | 'Girls';
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod_01",
    name: "Obsidian Oversized Graphic Tee",
    slug: "obsidian-oversized-graphic-tee",
    price: 999,
    priceInPaise: 99900,
    originalPrice: 1499,
    description: "Drop shoulder streetwear oversized fit with a custom minimalist neo-cyber punk typography print on the chest. Heavyweight 240 GSM bio-washed French terry fabric designed for max comfort and structure.",
    image: "/images/products/oversized_tee_black.png",
    images: [
      "/images/products/oversized_tee_black.png",
      "/images/products/oversized_tee_black_side.png",
      "/images/products/oversized_tee_black_back.png"
    ],
    category: "Tees",
    tags: ["Aesthetic", "Oversized", "Streetwear", "New Arrival"],
    gender: "Unisex",
    variants: [
      { size: "S", color: "Obsidian Black", stock: 15 },
      { size: "M", color: "Obsidian Black", stock: 24 },
      { size: "L", color: "Obsidian Black", stock: 18 },
      { size: "XL", color: "Obsidian Black", stock: 10 }
    ]
  },
  {
    id: "prod_02",
    name: "Acid-Wash Lilac Streetwear Hoodie",
    slug: "acid-wash-lilac-streetwear-hoodie",
    price: 1999,
    priceInPaise: 199900,
    originalPrice: 2999,
    description: "Ultra-heavyweight 380 GSM cotton fleece hoodie with an acid-washed lilac finish. Features a spacious double-lined hood, dropped shoulders, and subtle distressed ribbing for the ultimate slouchy silhouette.",
    image: "/images/products/baggy_hoodie.png",
    images: [
      "/images/products/baggy_hoodie.png",
      "/images/products/baggy_hoodie_side.png",
      "/images/products/baggy_hoodie_back.png"
    ],
    category: "Hoodies",
    tags: ["Acid Wash", "Heavyweight", "Cozy", "Slouchy"],
    gender: "Unisex",
    variants: [
      { size: "S", color: "Lavender Dust", stock: 8 },
      { size: "M", color: "Lavender Dust", stock: 12 },
      { size: "L", color: "Lavender Dust", stock: 15 },
      { size: "XL", color: "Lavender Dust", stock: 6 }
    ]
  },
  {
    id: "prod_03",
    name: "Utility Olive Baggy Cargo Pants",
    slug: "utility-olive-baggy-cargo-pants",
    price: 1799,
    priceInPaise: 179900,
    originalPrice: 2499,
    description: "Relaxed-fit cargo trousers in heavy cotton twill. Featuring 8 multi-pocket utility compartments, adjustable ankle drawstrings, and knee pleats for a 3D structural shape. Perfect for combat boots or chunky sneakers.",
    image: "/images/products/cargo_pants.png",
    category: "Cargoes",
    tags: ["Utility", "Baggy", "Techwear", "Cargo"],
    gender: "Unisex",
    variants: [
      { size: "S", color: "Tactical Olive", stock: 10 },
      { size: "M", color: "Tactical Olive", stock: 14 },
      { size: "L", color: "Tactical Olive", stock: 9 },
      { size: "XL", color: "Tactical Olive", stock: 5 }
    ]
  },
  {
    id: "prod_04",
    name: "Ribbed Baby Crop Tee",
    slug: "ribbed-baby-crop-tee",
    price: 699,
    priceInPaise: 69900,
    originalPrice: 999,
    description: "Pastel blue ribbed knit crop top inspired by Y2K silhouettes. Featuring a fitted shape, classic crew neck, and contrast lettuce hem details. Soft, stretchy fabric that contours comfortably.",
    image: "/images/products/crop_top.png",
    category: "Tees",
    tags: ["Y2K", "Crop Top", "Ribbed", "Pastel"],
    gender: "Girls",
    variants: [
      { size: "XS", color: "Pastel Blue", stock: 8 },
      { size: "S", color: "Pastel Blue", stock: 15 },
      { size: "M", color: "Pastel Blue", stock: 18 },
      { size: "L", color: "Pastel Blue", stock: 10 }
    ]
  },
  {
    id: "prod_05",
    name: "Chrome Wrap-Around Y2K Sunglasses",
    slug: "chrome-wrap-around-y2k-sunglasses",
    price: 499,
    priceInPaise: 49900,
    originalPrice: 799,
    description: "Futuristic chrome silver frame wrap-around glasses with UV400 dark tinted lenses. Sleek aerodynamic shape that gives instant Y2K, rave, and matrix vibes. Includes protective micro-fiber pouch.",
    image: "/images/products/y2k_sunglasses.png",
    category: "Accessories",
    tags: ["Cyberpunk", "Chrome", "UV400", "Accessory"],
    gender: "Unisex",
    variants: [
      { size: "OS", color: "Chrome Silver", stock: 50 }
    ]
  },
  {
    id: "prod_06",
    name: "Sage Oversized Corduroy Shirt",
    slug: "sage-oversized-corduroy-shirt",
    price: 1499,
    priceInPaise: 149900,
    originalPrice: 1999,
    description: "Premium thick-wale corduroy shirt designed to be worn oversized or as an open shacket. Styled in a earthy sage green shade with double utility utility chest pockets, button cuffs, and a vintage aesthetic drape.",
    image: "/images/products/sage_shirt.png",
    images: [
      "/images/products/sage_shirt.png",
      "/images/products/sage_shirt_back.png"
    ],
    category: "Shirts",
    tags: ["Corduroy", "Oversized", "Vintage", "Shacket", "Earthy"],
    gender: "Unisex",
    variants: [
      { size: "S", color: "Sage Green", stock: 12 },
      { size: "M", color: "Sage Green", stock: 16 },
      { size: "L", color: "Sage Green", stock: 14 },
      { size: "XL", color: "Sage Green", stock: 8 }
    ]
  },
  {
    id: "prod_07",
    name: "Vintage Cable-Knit Cream Sweater",
    slug: "vintage-cable-knit-cream-sweater",
    price: 2299,
    priceInPaise: 229900,
    originalPrice: 3299,
    description: "Extremely soft, high-density cable-knit pullover sweater in a warm cream color. Intricately knit patterns inspired by classic vintage designs, boasting a heavy ribbed hem and cozy relaxed fit.",
    image: "/images/products/cable_knit.png",
    images: [
      "/images/products/cable_knit.png",
      "/images/products/cable_knit_back.png"
    ],
    category: "Knitwear",
    tags: ["Knitwear", "Heavyweight", "Cozy", "Classic", "Vintage"],
    gender: "Unisex",
    variants: [
      { size: "S", color: "Warm Cream", stock: 10 },
      { size: "M", color: "Warm Cream", stock: 12 },
      { size: "L", color: "Warm Cream", stock: 10 },
      { size: "XL", color: "Warm Cream", stock: 6 }
    ]
  }
];
