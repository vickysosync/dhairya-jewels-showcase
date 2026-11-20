import { createContext, useContext } from "react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  sku: string;
  metal: string;
  weight: string;
  stones: string;
  isNew: boolean;
  featured: boolean;
  stock: number;
};

const photoSet = [
  "/images/hero-jewellery.webp",
  "/images/gold-jhumka.webp",
  "/images/diamond-ring.webp",
  "/images/bridal-necklace.webp",
  "/images/diamond-earrings.webp",
  "/images/gold-bangles.webp",
  "/images/emerald-pendant.webp",
  "/images/diamond-bracelet.webp",
];

const productSpecs: Array<[string, string, number, string, string]> = [
  ["Mira Heritage Necklace", "Necklaces", 128500, "Royal Gold", "24.8 g"],
  ["Aarohi Filigree Jhumkas", "Earrings", 48900, "Traditional", "11.2 g"],
  ["Aurelia Diamond Ring", "Rings", 76900, "Diamond Elegance", "5.1 g"],
  ["Saanvi Bridal Haar", "Bridal Jewellery", 184000, "Bridal", "31.4 g"],
  ["Lumière Diamond Drops", "Earrings", 64200, "Diamond Elegance", "8.4 g"],
  ["Gulabi Engraved Bangles", "Bangles", 93600, "Traditional", "18.6 g"],
  ["Emerald Heirloom Pendant", "Pendants", 57400, "Gemstone", "7.2 g"],
  ["Celeste Tennis Bracelet", "Bracelets", 81500, "Everyday Luxury", "12.7 g"],
  ["Rani Temple Necklace", "Necklaces", 142000, "Royal Gold", "27.9 g"],
  ["Noor Diamond Studs", "Earrings", 39700, "Diamond Elegance", "4.6 g"],
  ["Anaya Solitaire Ring", "Rings", 71200, "Everyday Luxury", "4.8 g"],
  ["Meher Kundan Set", "Bridal Jewellery", 196000, "Bridal", "34.1 g"],
  ["Esha Pearl Jhumkas", "Earrings", 45600, "Traditional", "10.8 g"],
  ["Veda Gold Cuffs", "Bracelets", 68700, "Royal Gold", "13.3 g"],
  ["Iris Gemstone Pendant", "Pendants", 52400, "Gemstone", "6.8 g"],
  ["Amara Diamond Band", "Rings", 58800, "Diamond Elegance", "3.9 g"],
  ["Tara Layered Chains", "Necklaces", 79300, "Contemporary", "15.7 g"],
  ["Kavya Heritage Hoops", "Earrings", 42900, "Signature", "9.3 g"],
  ["Nysa Floral Bangle", "Bangles", 84600, "Traditional", "16.5 g"],
  ["Elara Diamond Bracelet", "Bracelets", 90200, "Everyday Luxury", "14.2 g"],
  ["Zara Rose Gold Ring", "Rings", 63500, "Contemporary", "4.3 g"],
  ["Sia Polki Choker", "Bridal Jewellery", 176500, "Bridal", "29.6 g"],
  ["Riva Emerald Earrings", "Earrings", 54900, "Gemstone", "8.1 g"],
  ["Ishaan Classic Chain", "Men's Jewellery", 118000, "Signature", "22.6 g"],
];

export const demoProducts: Product[] = productSpecs.map((item, index) => {
  const slug = item[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: `demo-${index + 1}`,
    slug,
    name: item[0],
    category: item[1],
    price: item[2],
    collection: item[3],
    image: photoSet[index % photoSet.length] ?? photoSet[0] ?? "",
    description:
      "A demonstration design inspired by the meeting of fine detail and enduring form. Product details and specifications shown here are illustrative sample content.",
    sku: `DGJ-${String(index + 1).padStart(4, "0")}`,
    metal: "Gold jewellery — illustrative demo specification",
    weight: item[4],
    stones: "Stone details shown for demonstration only",
    isNew: index >= 16,
    featured: index < 8,
    stock: 4 + (index % 12),
  };
});

export const collections = [
  { slug: "bridal", name: "The Bridal Edit", category: "Bridal Jewellery", description: "Statement heirlooms for the moments that stay with you.", image: "/images/bridal-necklace.webp" },
  { slug: "royal-gold", name: "Royal Gold", category: "Necklaces", description: "Sculptural gold forms, made to be treasured across generations.", image: "/images/hero-jewellery.webp" },
  { slug: "diamond-elegance", name: "Diamond Elegance", category: "Rings", description: "Quiet brilliance for celebrations, and every day between.", image: "/images/diamond-ring.webp" },
  { slug: "everyday-luxury", name: "Everyday Luxury", category: "Bracelets", description: "Considered details that make ordinary moments feel special.", image: "/images/diamond-bracelet.webp" },
  { slug: "traditional", name: "Tradition, Reimagined", category: "Bangles", description: "Familiar craft with a fresh perspective.", image: "/images/gold-bangles.webp" },
  { slug: "gemstone", name: "The Colour Edit", category: "Pendants", description: "Expressive gemstones in beautifully balanced settings.", image: "/images/emerald-pendant.webp" },
];

export type DemoRecord = Record<string, string | number | boolean>;

export const demoRecords: Record<string, DemoRecord[]> = {
  categories: ["Gold Jewellery", "Diamond Jewellery", "Silver Jewellery", "Platinum Jewellery", "Gemstone Jewellery", "Bridal Jewellery", "Men's Jewellery", "Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"].map((name, i) => ({ id: `category-${i}`, name, description: "Illustrative catalogue category", status: "Active" })),
  collections: collections.map((entry, i) => ({ id: `collection-${i}`, name: entry.name, description: entry.description, status: "Active" })),
  orders: [{ id: "DGJ-2601", customer: "Sample customer", total: 128500, status: "Pending", date: "Demo order" }],
  customers: [{ id: "customer-1", name: "Sample customer", email: "customer@example.com", phone: "Not provided" }],
  banners: [{ id: "banner-1", name: "Home feature", description: "Elegance That Lasts Forever", status: "Active" }],
  gallery: [{ id: "gallery-1", name: "Gold heirloom", description: "Gold Jewellery" }],
  testimonials: [{ id: "testimonial-1", name: "Demo review", description: "Sample testimonial — demonstration content only.", status: "Draft" }],
  coupons: [{ id: "coupon-1", name: "WELCOME10", description: "Demo coupon — no real discount is applied.", status: "Active" }],
  newsletter: [],
  enquiries: [],
};

export type CartLine = { productId: string; quantity: number };
export type OrderDemo = { id: string; customer: string; email: string; total: number; items: CartLine[] };

export type StoreState = {
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  records: Record<string, DemoRecord[]>;
  order: OrderDemo | null;
  adminSignedIn: boolean;
  setProducts: (products: Product[]) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  updateRecords: (key: string, rows: DemoRecord[]) => void;
  setOrder: (order: OrderDemo | null) => void;
  setAdminSignedIn: (signedIn: boolean) => void;
};

export const StoreContext = createContext<StoreState | null>(null);

export function useJewelleryStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("JewelleryStoreProvider is missing");
  return value;
}

export const formatRupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);