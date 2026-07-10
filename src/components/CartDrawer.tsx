import { X, Minus, Plus, Trash2, ShoppingBag, Check, ShoppingCart } from "lucide-react";
import { useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, subtotal, checkout } = useApp();

  const handleClose = useCallback(() => setCartOpen(false), [setCartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [cartOpen, handleClose]);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);

  const onCheckout = () => {
    if (cart.length === 0) return;
    checkout();
    toast.success("تمت عملية الشراء بنجاح", {
      description: `${totalItems.toLocaleString("ar-SA")} عنصر تمت إضافته إلى تحميلاتك.`,
      icon: <Check className="h-4 w-4" />,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-50 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سلة التسوق"
        aria-hidden={!cartOpen}
        dir="rtl"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out",
          cartOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* الرأس */}
        <header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10">
              <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">سلتك</h2>
              {totalItems > 0 && (
                <span className="text-xs text-muted-foreground">
                  {totalItems.toLocaleString("ar-SA")} {totalItems === 1 ? "عنصر" : "عناصر"}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="إغلاق السلة"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/40 transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        {/* المحتوى */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-border bg-secondary/30">
                <ShoppingCart className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="mt-4 font-semibold text-foreground">سلتك فارغة</p>
              <p className="mt-1 text-sm text-muted-foreground">
                تصفح السوق لإضافة منتجات رائعة.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                تصفح السوق
              </button>
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {cart.map((c) => (
                <li
                  key={c.product.id}
                  className="flex gap-3 rounded-xl border border-border bg-background/40 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-background/60"
                >
                  <img
                    src={c.product.image}
                    alt={c.product.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-semibold">{c.product.name}</p>
                      <button
                        onClick={() => removeFromCart(c.product.id)}
                        aria-label={`حذف ${c.product.name} من السلة`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 focus-visible:ring-offset-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.product.category}</p>
                    
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-primary" dir="ltr">
                        ${(c.product.price * c.quantity).toFixed(2)}
                      </span>
                      
                      <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5">
                        <button
                          onClick={() => updateQty(c.product.id, c.quantity - 1)}
                          disabled={c.quantity <= 1}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {c.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(c.product.id, c.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* التذييل */}
        <footer className="shrink-0 border-t border-border bg-card/80 px-5 py-4 backdrop-blur-xl">
          {cart.length > 0 ? (
            <>
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{totalItems.toLocaleString("ar-SA")} {totalItems === 1 ? "منتج" : "منتجات"}</span>
                <span>الإجمالي قبل الضريبة</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">المجموع</span>
                <span className="font-display text-2xl font-bold tabular-nums" dir="ltr">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3.5 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                إتمام الشراء
              </button>
              <p className="mt-2.5 text-center text-xs text-muted-foreground/80">
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true">🔒</span> دفع آمن
                </span>
                <span className="mx-2 text-muted-foreground/40">·</span>
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true">⚡</span> تحميل فوري
                </span>
              </p>
            </>
          ) : (
            <button
              disabled
              className="w-full rounded-full bg-secondary/30 px-4 py-3 text-sm font-semibold text-muted-foreground/50 cursor-not-allowed"
            >
              إتمام الشراء
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}