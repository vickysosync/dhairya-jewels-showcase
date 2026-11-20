import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CartLine,
  DemoRecord,
  demoProducts,
  demoRecords,
  OrderDemo,
  Product,
  StoreContext,
} from "@/lib/jewellery-store";

const STORAGE_KEY = "dhairya-demo-store-v1";

type SavedStore = {
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  records: Record<string, DemoRecord[]>;
  order: OrderDemo | null;
  adminSignedIn: boolean;
};

function readSaved(): Partial<SavedStore> | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Partial<SavedStore>) : null;
  } catch {
    return null;
  }
}

export function JewelleryStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState(demoProducts);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [records, setRecords] = useState(demoRecords);
  const [order, setOrder] = useState<OrderDemo | null>(null);
  const [adminSignedIn, setAdminSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = readSaved();
    if (saved?.products) setProducts(saved.products);
    if (saved?.cart) setCart(saved.cart);
    if (saved?.wishlist) setWishlist(saved.wishlist);
    if (saved?.records) setRecords(saved.records);
    if (saved?.order) setOrder(saved.order);
    if (saved?.adminSignedIn !== undefined) setAdminSignedIn(saved.adminSignedIn);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: SavedStore = { products, cart, wishlist, records, order, adminSignedIn };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The in-memory demo remains usable when browser storage is unavailable.
    }
  }, [products, cart, wishlist, records, order, adminSignedIn, hydrated]);

  const value = useMemo(() => ({
    products,
    cart,
    wishlist,
    records,
    order,
    adminSignedIn,
    setProducts,
    addToCart: (productId: string, quantity = 1) => setCart((current) => {
      const existing = current.find((line) => line.productId === productId);
      return existing
        ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { productId, quantity }];
    }),
    removeFromCart: (productId: string) => setCart((current) => current.filter((line) => line.productId !== productId)),
    setCartQuantity: (productId: string, quantity: number) => setCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) => line.productId === productId ? { ...line, quantity } : line),
    ),
    toggleWishlist: (productId: string) => setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]),
    updateRecords: (key: string, rows: DemoRecord[]) => setRecords((current) => ({ ...current, [key]: rows })),
    setOrder,
    setAdminSignedIn,
  }), [products, cart, wishlist, records, order, adminSignedIn]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}