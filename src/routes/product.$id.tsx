import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Star, ShoppingCart, Share2 } from "lucide-react";
import { getVendor } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { addToCart, isHydrated, products } = useApp();
  const product = products.find((entry) => entry.id === id);

  if (!isHydrated) {
    return (
      <main dir="rtl" className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 rounded-lg bg-secondary/40" />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-3xl bg-secondary/40" />
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video rounded-2xl bg-secondary/40" />
                <div className="aspect-video rounded-2xl bg-secondary/40" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded-lg bg-secondary/40" />
              <div className="h-6 w-1/2 rounded-lg bg-secondary/40" />
              <div className="h-32 rounded-2xl bg-secondary/40" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">المنتج غير موجود</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          ربما تم حذف هذا المنتج أو الرابط غير صحيح.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          العودة إلى السوق
        </Link>
      </div>
    );
  }

  const vendor = getVendor(product.vendorId);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
      {/* زر الرجوع */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        رجوع
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* الصور */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
              loading="eager"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {product.gallery.map((g, i) => (
              <img
                key={g}
                src={g}
                alt={`${product.name} - صورة ${i + 1}`}
                className="aspect-video w-full rounded-2xl border border-border object-cover transition-all duration-200 hover:border-primary/50"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {product.category}
              </span>
              <button
                aria-label="مشاركة المنتج"
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-sunset text-sunset" aria-hidden="true" />
                <span className="font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground/50">·</span>
              <span>{product.salesCount.toLocaleString("ar-SA")} مبيعة</span>
            </div>
          </div>

          {/* بطاقة الشراء */}
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-glow font-display text-4xl font-bold tabular-nums" dir="ltr">
                ${product.price}
              </span>
              <span className="text-xs text-muted-foreground">دفعة واحدة · تحميل فوري</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              أضف إلى السلة
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                ترخيص تجاري مشمول
              </span>
              <span className="mx-2 text-muted-foreground/30">·</span>
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                تحميل فوري بعد الدفع
              </span>
            </p>
          </div>

          {/* الوصف */}
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* المميزات */}
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <h3 className="font-display text-lg font-semibold">ما يتضمنه المنتج</h3>
            <ul className="mt-3 grid gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* المواصفات */}
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <h3 className="font-display text-lg font-semibold">المواصفات</h3>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-background/40 p-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* البائع */}
          {vendor && (
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-200 hover:border-primary/30">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="min-w-0">
                <p className="font-display font-semibold">{vendor.name}</p>
                <p className="text-xs text-muted-foreground">بائع منذ {vendor.joined}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{vendor.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* آراء العملاء */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">آراء العملاء</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {product.reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-border bg-card/60 p-5 transition-all duration-200 hover:border-primary/30"
            >
              <header className="flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-semibold">{r.author}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="mr-auto flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < r.rating ? "fill-sunset text-sunset" : "text-muted-foreground/30"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </header>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
            </article>
          ))}
        </div>
      </section>

      {/* منتجات مشابهة */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">المزيد من {product.category}</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}