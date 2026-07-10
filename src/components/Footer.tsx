import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, Mail, Heart } from "lucide-react";

const currentYear = new Date().getFullYear();

const marketLinks = [
  { label: "تصفح المنتجات", to: "/" },
  { label: "قوالب برمجية", to: "/" },
  { label: "كتب إلكترونية", to: "/" },
  { label: "أوامر الذكاء الاصطناعي", to: "/" },
  { label: "أصول تصميم", to: "/" },
] as const;

const sellerLinks = [
  { label: "ابدأ البيع", to: "/dashboard" },
  { label: "لوحة التحكم", to: "/dashboard" },
  { label: "إرشادات البائع", to: "/" },
  { label: "سياسة العمولات", to: "/" },
  { label: "برنامج الشركاء", to: "/" },
] as const;

const supportLinks = [
  { label: "مركز المساعدة", to: "/" },
  { label: "تواصل معنا", to: "/" },
  { label: "سياسة الخصوصية", to: "/" },
  { label: "شروط الاستخدام", to: "/" },
  { label: "سياسة الاسترداد", to: "/" },
] as const;

const socialLinks = [
  { href: "https://twitter.com/zenova", label: "تويتر", icon: Twitter },
  { href: "https://github.com/zenova", label: "غيتهاب", icon: Github },
  { href: "mailto:hello@zenova.dev", label: "البريد الإلكتروني", icon: Mail },
] as const;

const trustBadges = [
  { icon: "🔒", label: "دفع آمن" },
  { icon: "⚡", label: "تحميل فوري" },
  { icon: "✓", label: "ترخيص تجاري" },
] as const;

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; to: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      dir="rtl"
      className="border-t border-border/40 bg-background/80 backdrop-blur-2xl"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        {/* الصف العلوي */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* الشعار والوصف */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">Zenova</span>
            </Link>
            
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground/90">
              سوق الأصول الرقمية المميزة. قوالب، أوامر، تصاميم وموسيقى لفرق تصنع أعمالاً استثنائية.
            </p>

            <nav aria-label="وسائل التواصل الاجتماعي" className="mt-5">
              <ul className="flex items-center gap-2">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-secondary/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* روابط سريعة */}
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterColumn title="السوق" links={marketLinks} />
          </div>

          {/* للبائعين */}
          <div className="lg:col-span-2">
            <FooterColumn title="للبائعين" links={sellerLinks} />
          </div>

          {/* الدعم والقانوني */}
          <div className="lg:col-span-2">
            <FooterColumn title="الدعم" links={supportLinks} />
          </div>
        </div>

        {/* الفاصل */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            
            <p className="text-xs text-muted-foreground/80">
              © <time dateTime={String(currentYear)}>{currentYear}</time> Zenova. جميع الحقوق محفوظة.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {trustBadges.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/20 px-3 py-1.5 text-[11px] font-medium text-muted-foreground/80 backdrop-blur-sm"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
              صنع بـ
              <Heart className="h-3.5 w-3.5 fill-primary/80 text-primary/80 animate-pulse" aria-hidden="true" />
              من فريق Zenova
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}