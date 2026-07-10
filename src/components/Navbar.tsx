import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  ShoppingCart,
  User,
  Sparkles,
  Store,
  Download,
  Menu,
  X,
} from "lucide-react";
import { useState, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { CATEGORIES } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ────────────────────────────
   Types
   ──────────────────────────── */

interface CategoryPillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/* ────────────────────────────
   Sub-Components
   ──────────────────────────── */

function CategoryPill({ active, onClick, children }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
        active
          ? "border-primary/60 bg-primary/15 text-primary shadow-sm shadow-primary/10"
          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary/50"
      )}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────
   Main Component
   ──────────────────────────── */

export function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const {
    cartCount,
    setCartOpen,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    role,
    setRole,
  } = useApp();

  const switchRole = useCallback(
    (nextRole: "buyer" | "vendor") => {
      setRole(nextRole);
      navigate({ to: "/dashboard" });
      setMobileMenuOpen(false);
    },
    [setRole, navigate]
  );

  const handleCategoryClick = useCallback(
    (category: string | null) => {
      setActiveCategory(category);
      setMobileMenuOpen(false);
    },
    [setActiveCategory]
  );

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-2xl"
    >
      {/* الصف العلوي */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        
        {/* زر القائمة الجوال */}
        <button
          onClick={() => setMobileMenuOpen((p) => !p)}
          aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileMenuOpen}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-secondary/40 transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* الشعار */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight hidden sm:inline">
            Zenova
          </span>
        </Link>

        {/* البحث — ديسكتوب */}
        <div className="relative hidden max-w-md flex-1 md:block">
          <Search
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن أصول رقمية مميزة..."
            aria-label="البحث في السوق"
            type="search"
            className="w-full rounded-full border border-border bg-secondary/30 py-2.5 pr-10 pl-4 text-sm outline-none transition-all duration-200 focus:border-primary/50 focus:bg-secondary/50 focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* البحث — جوال (أيقونة فقط) */}
        <button
          onClick={() => setMobileSearchOpen((p) => !p)}
          aria-label="البحث"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-secondary/40 transition-all duration-200 hover:border-primary/50 hover:text-primary md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* الأيقونات — يسار */}
        <div className="mr-auto flex items-center gap-2">
          {/* السلة */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="فتح السلة"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent px-1 text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/30 animate-in fade-in zoom-in duration-200">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* الملف الشخصي */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="الملف الشخصي"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" dir="rtl">
              <DropdownMenuLabel className="text-right">
                تبديل لوحة التحكم
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => switchRole("buyer")}
                className="gap-2 text-right cursor-pointer"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">واجهة المشتري</span>
                {role === "buyer" && (
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchRole("vendor")}
                className="gap-2 text-right cursor-pointer"
              >
                <Store className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">واجهة البائع</span>
                {role === "vendor" && (
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-right cursor-pointer">
                <Link to="/dashboard" className="w-full">
                  فتح لوحة التحكم
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* البحث الموسع — جوال */}
      {mobileSearchOpen && (
        <div className="border-t border-border/50 px-4 py-3 md:hidden animate-in slide-in-from-top-2">
          <div className="relative">
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن أصول رقمية مميزة..."
              aria-label="البحث في السوق"
              type="search"
              autoFocus
              className="w-full rounded-full border border-border bg-secondary/30 py-2.5 pr-10 pl-4 text-sm outline-none transition-all duration-200 focus:border-primary/50 focus:bg-secondary/50 focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      )}

      {/* التصنيفات — ديسكتوب */}
      <nav
        aria-label="تصنيفات المنتجات"
        className="mx-auto hidden max-w-7xl gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide md:flex md:px-6"
      >
        <CategoryPill
          active={activeCategory === null}
          onClick={() => handleCategoryClick(null)}
        >
          الكل
        </CategoryPill>
        {CATEGORIES.map((c) => (
          <CategoryPill
            key={c}
            active={activeCategory === c}
            onClick={() => handleCategoryClick(c)}
          >
            {c}
          </CategoryPill>
        ))}
      </nav>

      {/* القائمة الجوال الموسعة */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 md:hidden animate-in slide-in-from-top-2">
          {/* البحث */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن أصول رقمية مميزة..."
                aria-label="البحث في السوق"
                type="search"
                className="w-full rounded-full border border-border bg-secondary/30 py-2.5 pr-10 pl-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* التصنيفات */}
          <nav
            aria-label="تصنيفات المنتجات"
            className="flex flex-wrap gap-2 px-4 pb-4"
          >
            <CategoryPill
              active={activeCategory === null}
              onClick={() => handleCategoryClick(null)}
            >
              الكل
            </CategoryPill>
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c}
                active={activeCategory === c}
                onClick={() => handleCategoryClick(c)}
              >
                {c}
              </CategoryPill>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ────────────────────────────
   Utility
   ──────────────────────────── */

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}