import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

/* ────────────────────────────
   Error & Not-Found Components
   ──────────────────────────── */

function NotFoundComponent() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-app-gradient px-4">
      <div className="max-w-md text-center">
        <h1 className="text-glow font-display text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-glow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            العودة إلى السوق
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-app-gradient px-4">
      <div className="max-w-md text-center">
        <h1 className="text-glow font-display text-5xl font-bold">خطأ</h1>
        <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
          لم يتم تحميل هذه الصفحة
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          حدث خطأ ما. يمكنك المحاولة مجدداً أو العودة للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-glow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            حاول مجدداً
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────
   Route Definition
   ──────────────────────────── */

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Zenova — سوق الأصول الرقمية المميزة" },
      { name: "description", content: "اكتشف وتداول أصولاً رقمية مميزة: قوالب SaaS، كتب إلكترونية، أوامر ذكاء اصطناعي، أنظمة تصميم، موسيقى وخطوط." },
      { name: "keywords", content: "أصول رقمية, قوالب, SaaS, كتب إلكترونية, أوامر AI, تصميم, موسيقى, خطوط" },
      { property: "og:title", content: "Zenova — سوق الأصول الرقمية المميزة" },
      { property: "og:description", content: "اكتشف وتداول أصولاً رقمية مميزة من شبكة منتقاة من المبدعين." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0f172a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ────────────────────────────
   Shell & Root Components
   ──────────────────────────── */

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="flex min-h-screen flex-col bg-app-gradient">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-b-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            تخطي إلى المحتوى الرئيسي
          </a>
          
          <Navbar />
          
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Outlet />
          </main>
          
          <Footer />
          <CartDrawer />
          
          <Toaster
            theme="dark"
            position="bottom-left"
            dir="rtl"
            richColors
            closeButton
            toastOptions={{
              style: {
                fontFamily: "Cairo, sans-serif",
              },
            }}
          />
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}