import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { products, search, activeCategory } = useApp();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory ? p.category === activeCategory : true;
      const q = search.trim().toLowerCase();
      const matchQ = q
        ? p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        : true;
      return matchCat && matchQ;
    });
  }, [products, search, activeCategory]);

  const productCountText = useMemo(() => {
    const count = filtered.length;
    if (count === 0) return "لا توجد منتجات";
    return `${count.toLocaleString("ar-SA")} ${count === 1 ? "منتج" : "منتجات"}`;
  }, [filtered.length]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6 md:pt-12">
      
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-background px-5 py-12 sm:px-8 sm:py-16 md:px-14 md:py-20"
        aria-label="مقدمة"
      >
        {/* Glow effects */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            منتقاة من أفضل المبدعين
          </span>
          
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl">
            اكتشف وتداول <span className="text-glow">أصولاً رقمية مميزة</span>
          </h1>
          
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            قوالب، أوامر، أصوات وأنظمة تصميم — منتقاة لفرق تصنع أعمالاً جميلة ومدروسة. تحميل فوري. تراخيص تجارية آمنة.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>أكثر من 12 ألف تحميل هذا الشهر</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>ترخيص تجاري مشمول</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mt-10 md:mt-12" aria-label="المنتجات">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              {activeCategory ?? "مميز هذا الأسبوع"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {productCountText}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-border bg-card/50 py-20 text-center">
            <p className="font-medium text-foreground">لا توجد نتائج تطابق بحثك.</p>
            <p className="mt-1 text-sm text-muted-foreground">جرب كلمة مختلفة أو تصنيفاً آخر.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}