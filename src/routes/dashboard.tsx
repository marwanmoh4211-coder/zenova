import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Download,
  Store,
  User,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, type Category, getVendor } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — Zenova" },
      { name: "description", content: "تتبع مبيعاتك وإيراداتك وتحميلاتك على Zenova." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  const switchRole = (nextRole: "buyer" | "vendor") => {
    setRole(nextRole);
    navigate({ to: "/dashboard" });
  };

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {role === "vendor"
              ? "تتبع مبيعاتك ومنتجاتك وإيراداتك."
              : "مكتبتك ونظرة عامة على حسابك."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card p-1">
          <RoleTab
            active={role === "vendor"}
            onClick={() => switchRole("vendor")}
            icon={<Store className="h-3.5 w-3.5" />}
          >
            بائع
          </RoleTab>
          <RoleTab
            active={role === "buyer"}
            onClick={() => switchRole("buyer")}
            icon={<User className="h-3.5 w-3.5" />}
          >
            مشتري
          </RoleTab>
        </div>
      </div>
      {role === "vendor" ? <VendorView /> : <BuyerView />}
    </main>
  );
}

function RoleTab({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        active
          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground btn-glow"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      )}
    >
      {icon} {children}
    </button>
  );
}

function VendorView() {
  const { addProduct, currentVendorId, products, vendorStats } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [form, setForm] = useState<ProductFormState>(defaultProductFormState);
  const stats = vendorStats[currentVendorId] ?? { revenue: 0, sales: 0 };
  const vendor = getVendor(currentVendorId);
  const myProducts = products.filter((p) => p.vendorId === currentVendorId);

  const revenueSeries = [
    { m: "مار", v: Math.round(stats.revenue * 0.5) },
    { m: "أبر", v: Math.round(stats.revenue * 0.62) },
    { m: "مايو", v: Math.round(stats.revenue * 0.71) },
    { m: "يون", v: Math.round(stats.revenue * 0.83) },
    { m: "يول", v: Math.round(stats.revenue * 0.91) },
    { m: "أغس", v: stats.revenue },
  ];

  const salesSeries = [
    { m: "مار", v: Math.round(stats.sales * 0.4) },
    { m: "أبر", v: Math.round(stats.sales * 0.55) },
    { m: "مايو", v: Math.round(stats.sales * 0.7) },
    { m: "يون", v: Math.round(stats.sales * 0.82) },
    { m: "يول", v: Math.round(stats.sales * 0.91) },
    { m: "أغس", v: stats.sales },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const price = Number(form.price);

    if (!name || !description || !Number.isFinite(price) || price <= 0) {
      toast.error("يرجى تعبئة كل الحقول بقيم صحيحة قبل الحفظ.");
      return;
    }

    const product = addProduct({
      name,
      description,
      price,
      category: form.category,
    });

    toast.success(`تمت إضافة "${product.name}" إلى قائمة منتجاتك.`);
    setForm(defaultProductFormState);
    setIsAddDialogOpen(false);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Metric
          icon={<DollarSign className="h-4 w-4" />}
          label="إجمالي الإيرادات"
          value={`$${stats.revenue.toLocaleString()}`}
          accent="from-primary to-accent"
          trend="+12%"
        />
        <Metric
          icon={<ShoppingBag className="h-4 w-4" />}
          label="إجمالي المبيعات"
          value={stats.sales.toLocaleString()}
          accent="from-accent to-neon"
          trend="+8%"
        />
        <Metric
          icon={<Package className="h-4 w-4" />}
          label="المنتجات النشطة"
          value={myProducts.length.toString()}
          accent="from-sunset to-primary"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="اتجاه الإيرادات">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="grev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.24 300)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.68 0.24 300)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
              <XAxis
                dataKey="m"
                stroke="oklch(0.72 0.02 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.72 0.02 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.19 0.025 265)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  borderRadius: 12,
                  fontFamily: "Cairo, sans-serif",
                }}
                labelStyle={{ color: "oklch(0.97 0.005 260)" }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke="oklch(0.68 0.24 300)"
                strokeWidth={2}
                fill="url(#grev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="المبيعات الشهرية">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesSeries}>
              <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
              <XAxis
                dataKey="m"
                stroke="oklch(0.72 0.02 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.72 0.02 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.19 0.025 265)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  borderRadius: 12,
                  fontFamily: "Cairo, sans-serif",
                }}
                labelStyle={{ color: "oklch(0.97 0.005 260)" }}
              />
              <Bar dataKey="v" fill="oklch(0.78 0.17 200)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-semibold">منتجاتك</h2>
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              إضافة منتج جديد
            </button>
          </div>
          {vendor && (
            <div className="flex items-center gap-2">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="h-6 w-6 rounded-full object-cover ring-2 ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                البيع بوصفك <span className="font-medium text-foreground">{vendor.name}</span>
              </p>
            </div>
          )}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
          {myProducts.map((p, i) => (
            <div
              key={p.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 transition-all duration-200 hover:bg-white/5",
                i > 0 && "border-t border-border"
              )}
            >
              <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0">
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="line-clamp-1 font-semibold transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {p.category} · {p.salesCount.toLocaleString("ar-SA")} مبيعة
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="font-display text-lg font-bold tabular-nums" dir="ltr">
                  ${p.price}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                  <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" /> نشط
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) setForm(defaultProductFormState);
        }}
      >
        <DialogContent
          dir="rtl"
          className="border-border bg-card/95 text-foreground backdrop-blur-xl sm:max-w-xl"
        >
          <DialogHeader className="text-right">
            <DialogTitle className="font-display text-xl">إضافة منتج جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات المنتج الأساسية فقط، وسيتم تحديث القائمة والإحصائيات فورًا.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="product-name" className="text-sm font-medium">
                اسم المنتج
              </label>
              <Input
                id="product-name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="مثال: حزمة قوالب تسويق رقمي"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="product-price" className="text-sm font-medium">
                  السعر
                </label>
                <Input
                  id="product-price"
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  value={form.price}
                  onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                  placeholder="79"
                />
              </div>

              <div className="grid gap-2">
                <span className="text-sm font-medium">القسم</span>
                <Select
                  value={form.category}
                  onValueChange={(value: Category) =>
                    setForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="product-description" className="text-sm font-medium">
                الوصف
              </label>
              <Textarea
                id="product-description"
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="اكتب وصفًا مختصرًا وواضحًا للمنتج..."
                className="min-h-28 resize-none"
              />
            </div>

            <DialogFooter className="gap-2 sm:justify-start sm:space-x-0">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                حفظ المنتج
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(defaultProductFormState);
                  setIsAddDialogOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 px-5 py-2 text-sm font-medium transition-all duration-200 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                إلغاء
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

type ProductFormState = {
  name: string;
  price: string;
  category: Category;
  description: string;
};

const defaultProductFormState: ProductFormState = {
  name: "",
  price: "",
  category: CATEGORIES[0],
  description: "",
};

function BuyerView() {
  const { purchases } = useApp();
  return (
    <>
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent btn-glow">
          <User className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold">Alex Rivera</p>
          <p className="text-sm text-muted-foreground">alex@zenova.io · عضو منذ 2024</p>
        </div>
        <div className="mr-auto hidden text-start sm:block">
          <p className="text-xs text-muted-foreground">التحميلات</p>
          <p className="font-display text-2xl font-bold tabular-nums">{purchases.length}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">تحميلاتي</h2>
        {purchases.length === 0 ? (
          <div className="mt-4 grid place-items-center rounded-2xl border border-dashed border-border bg-card/40 py-16 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-secondary/40">
              <Download className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="mt-3 font-medium">لا توجد مشتريات بعد</p>
            <p className="text-sm text-muted-foreground">
              ستظهر هنا العناصر التي تشتريها للتحميل الفوري.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              تصفح السوق
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            {purchases.map((p) => (
              <div
                key={p.product.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition-all duration-200 hover:border-primary/30"
              >
                <img
                  src={p.product.image}
                  alt={p.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: p.product.id }}
                    className="line-clamp-1 font-semibold transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm"
                  >
                    {p.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {p.product.category} · تم الشراء{" "}
                    {new Date(p.purchasedAt).toLocaleDateString("ar-EG")}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground btn-glow transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" /> تحميل
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Metric({
  icon,
  label,
  value,
  accent,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  trend?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 transition-all duration-200 hover:border-primary/30 hover:card-glow">
      <div
        className={cn(
          "absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl",
          accent
        )}
      />
      <div className="relative flex items-center justify-between">
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-primary-foreground",
            accent
          )}
        >
          {icon}
        </span>
        {trend && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            {trend}
          </span>
        )}
      </div>
      <p className="relative mt-3 font-display text-3xl font-bold tabular-nums" dir="ltr">
        {value}
      </p>
      <p className="relative mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground">{title}</h3>
      <div dir="ltr">{children}</div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}