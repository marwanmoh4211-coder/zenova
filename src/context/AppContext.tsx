import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  PRODUCTS,
  createMockProduct,
  replaceMockProducts,
  type NewProductInput,
  type Product,
} from "@/lib/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  product: Product;
  purchasedAt: string;
}

export interface VendorStats {
  revenue: number;
  sales: number;
}

export type Role = "buyer" | "vendor";

interface AppState {
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, q: number) => void;
  clearCart: () => void;
  checkout: () => void;
  purchases: Purchase[];
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  role: Role;
  setRole: (r: Role) => void;
  addProduct: (input: Omit<NewProductInput, "vendorId">) => Product;
  vendorStats: Record<string, VendorStats>;
  currentVendorId: string;
  search: string;
  setSearch: (s: string) => void;
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  isHydrated: boolean;
}

const AppContext = createContext<AppState | null>(null);

const initialVendorStats: Record<string, VendorStats> = {
  v1: { revenue: 48920, sales: 682 },
  v2: { revenue: 19488, sales: 812 },
  v3: { revenue: 83460, sales: 2140 },
  v4: { revenue: 37469, sales: 421 },
};

// مفاتيح التخزين المحلي
const STORAGE_KEYS = {
  products: "zenova:products",
  cart: "zenova:cart",
  purchases: "zenova:purchases",
  role: "zenova:role",
} as const;

// قراءة آمنة من localStorage
function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// كتابة آمنة إلى localStorage
function writeStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // تجاهل أخطاء التخزين
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [role, setRole] = useState<Role>("buyer");
  const [vendorStats, setVendorStats] = useState<Record<string, VendorStats>>(initialVendorStats);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const hydrated = useRef(false);

  const currentVendorId = "v1";

  // استعادة الحالة المحفوظة
  useEffect(() => {
    const storedProducts = readStorage<Product[]>(STORAGE_KEYS.products, PRODUCTS);
    replaceMockProducts(storedProducts);
    setProducts(storedProducts);
    setCart(readStorage<CartItem[]>(STORAGE_KEYS.cart, []));
    setPurchases(readStorage<Purchase[]>(STORAGE_KEYS.purchases, []));
    setRole(readStorage<Role>(STORAGE_KEYS.role, "buyer"));
    hydrated.current = true;
  }, []);

  // حفظ الحالة
  useEffect(() => {
    if (!hydrated.current) return;
    replaceMockProducts(products);
    writeStorage(STORAGE_KEYS.products, products);
  }, [products]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStorage(STORAGE_KEYS.purchases, purchases);
  }, [purchases]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStorage(STORAGE_KEYS.role, role);
  }, [role]);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const found = prev.find((c) => c.product.id === p.id);
      if (found)
        return prev.map((c) => (c.product.id === p.id ? { ...c, quantity: c.quantity + 1 } : c));
      return [...prev, { product: p, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.product.id !== id));

  const updateQty = (id: string, q: number) =>
    setCart((prev) =>
      prev
        .map((c) => (c.product.id === id ? { ...c, quantity: Math.max(0, q) } : c))
        .filter((c) => c.quantity > 0),
    );

  const clearCart = () => setCart([]);

  const addProduct = (input: Omit<NewProductInput, "vendorId">) => {
    const nextProduct = createMockProduct({ ...input, vendorId: currentVendorId }, products);
    setProducts((prev) => [nextProduct, ...prev]);
    return nextProduct;
  };

  const checkout = () => {
    if (cart.length === 0) return;
    // إضافة الإيرادات للبائعين
    setVendorStats((prev) => {
      const next = { ...prev };
      for (const item of cart) {
        const vid = item.product.vendorId;
        const s = next[vid] ?? { revenue: 0, sales: 0 };
        next[vid] = {
          revenue: s.revenue + item.product.price * item.quantity,
          sales: s.sales + item.quantity,
        };
      }
      return next;
    });
    // نقل المشتريات إلى التحميلات
    setPurchases((prev) => {
      const now = new Date().toISOString();
      const added = cart.map((c) => ({ product: c.product, purchasedAt: now }));
      const seen = new Set(prev.map((p) => p.product.id));
      const filtered = added.filter((a) => !seen.has(a.product.id));
      return [...prev, ...filtered];
    });
    setCart([]);
    setCartOpen(false); // ← ✅ هذا موجود هنا
  };

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const subtotal = cart.reduce((s, c) => s + c.quantity * c.product.price, 0);

  const value = useMemo<AppState>(
    () => ({
      products,
      cart,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      checkout,
      purchases,
      cartOpen,
      setCartOpen,
      role,
      setRole,
      addProduct,
      vendorStats,
      currentVendorId,
      search,
      setSearch,
      activeCategory,
      setActiveCategory,
      isHydrated: hydrated.current,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      products,
      cart,
      purchases,
      cartOpen,
      role,
      vendorStats,
      search,
      activeCategory,
      cartCount,
      subtotal,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// مرجع بيانات المنتجات الأولية
export const _seedProducts = PRODUCTS;