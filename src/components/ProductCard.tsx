import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      
      {/* الصورة */}
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-1 font-display text-base font-semibold transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-sunset text-sunset" aria-hidden="true" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{product.salesCount.toLocaleString("ar-SA")} مبيعة</span>
        </div>

        {/* ✅ السعر على اليمين، الزر على اليسار */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="font-display text-lg font-bold text-foreground" dir="ltr">
            ${product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            أضف إلى السلة
          </button>
        </div>
      </div>
    </article>
  );
}