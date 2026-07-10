export type Category =
  | "قوالب برمجية"
  | "كتب إلكترونية"
  | "أوامر ذكاء اصطناعي"
  | "أصول تصميم"
  | "صوتيات وموسيقى"
  | "خطوط وطباعة";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joined: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  downloadUrl?: string;
  directUrl?: string;
  imageUrl?: string;
  image: string;
  gallery: string[];
  features: string[];
  specs: Record<string, string>;
  vendorId: string;
  rating: number;
  salesCount: number;
  reviews: Review[];
}

export interface NewProductInput {
  name: string;
  price: number;
  category: Category;
  description: string;
  downloadUrl?: string;
  directUrl?: string;
  imageUrl?: string;
  vendorId: string;
}

export const CATEGORIES: Category[] = [
  "قوالب برمجية",
  "كتب إلكترونية",
  "أوامر ذكاء اصطناعي",
  "أصول تصميم",
  "صوتيات وموسيقى",
  "خطوط وطباعة",
];

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "استوديو نوفا",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    bio: "استوديو رقمي حائز على جوائز، متخصص في صناعة قوالب وواجهات مستخدم مميزة.",
    joined: "2022",
  },
  {
    id: "v2",
    name: "دار أطلس للنشر",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    bio: "دار نشر مستقلة متخصصة في كتب الأعمال والتقنية الحديثة.",
    joined: "2021",
  },
  {
    id: "v3",
    name: "مصنع الأوامر",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    bio: "مكتبات أوامر منتقاة بعناية للمبدعين وفرق المنتجات.",
    joined: "2023",
  },
  {
    id: "v4",
    name: "كايت ساوند",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    bio: "مقطوعات سينمائية وحلقات صوتية هادئة للأفلام والمنتجات.",
    joined: "2020",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "حزمة لوحات تحكم زينيث",
    tagline: "أكثر من 80 شاشة لوحة تحكم SaaS احترافية بتقنية React و Tailwind",
    description:
      "نظام لوحات تحكم مصمم بعناية فائقة لفرق SaaS الحديثة. مكونات React كاملة التوثيق بأنواع TypeScript، ورموز تصميم Tailwind، وسمات داكنة وفاتحة، ورسوم بيانية بجودة إنتاجية. أطلق لوحة تحكم مصقولة في ساعات بدلاً من أسابيع.",
    price: 79,
    category: "قوالب برمجية",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    ],
    features: [
      "أكثر من 80 شاشة متجاوبة",
      "React 19 مع TypeScript",
      "رموز تصميم Tailwind",
      "سمة داكنة وفاتحة",
      "تحديثات مدى الحياة",
    ],
    specs: {
      الإطار: "React 19",
      التنسيق: "Tailwind v4",
      الترخيص: "تجاري",
      الصيغة: ".zip (42 م.ب)",
    },
    vendorId: "v1",
    rating: 4.9,
    salesCount: 1284,
    reviews: [
      {
        id: "r1",
        author: "إيلينا ك.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        rating: 5,
        comment: "اختصرت وقت التطوير لدينا إلى النصف. المكونات دقيقة حتى آخر بكسل.",
        date: "قبل أسبوعين",
      },
      {
        id: "r2",
        author: "ماركوس ت.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 5,
        comment: "يستحق كل قرش. التوثيق ممتاز.",
        date: "قبل شهر",
      },
    ],
  },
  {
    id: "p2",
    name: "دليل المؤسِّس العملي",
    tagline: "دليل ميداني من 320 صفحة لإطلاق شركة ناشئة حديثة",
    description:
      "أطر عمل مجرّبة من خبراء أداروا شركات نمت من الصفر إلى مئات الملايين. يغطي التموضع والتسعير والتوظيف وجمع التمويل وإيقاع التشغيل الذي يراكم النجاحات.",
    price: 24,
    category: "كتب إلكترونية",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=800&fit=crop",
    ],
    features: [
      "320 صفحة بصيغتي EPUB و PDF",
      "24 دراسة حالة واقعية",
      "قوالب قابلة للتحميل",
      "تحديثات ربع سنوية",
    ],
    specs: {
      الصيغة: "PDF + EPUB",
      الصفحات: "320",
      اللغة: "العربية",
      المستوى: "متوسط",
    },
    vendorId: "v2",
    rating: 4.7,
    salesCount: 812,
    reviews: [
      {
        id: "r3",
        author: "بريا س.",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
        rating: 5,
        comment: "أغزر محتوى من معظم كتب الأعمال. بلا حشو.",
        date: "قبل 3 أسابيع",
      },
    ],
  },
  {
    id: "p3",
    name: "مصنع الأوامر — الإصدار الثاني",
    tagline: "500 أمر احترافي للصور والبرمجة والكتابة",
    description:
      "مكتبة حيّة من أوامر جاهزة للإنتاج مصنفة حسب النتيجة المطلوبة. كل أمر يأتي مع توصية بالنموذج الأنسب، والمخرجات المتوقعة، ونسخ معدّلة — صُقلت عبر آلاف التجارب.",
    price: 39,
    category: "أوامر ذكاء اصطناعي",
    image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&h=800&fit=crop",
    ],
    features: [
      "500 أمر منتقى بعناية",
      "صياغة متوافقة مع كل النماذج",
      "تصدير بصيغ Notion و JSON",
      "الإصدارات القادمة مجاناً",
    ],
    specs: {
      الصيغة: "Notion + JSON",
      "عدد الأوامر": "500",
      الترخيص: "شخصي + فرق عمل",
      التحديثات: "شهرية",
    },
    vendorId: "v3",
    rating: 4.8,
    salesCount: 2140,
    reviews: [
      {
        id: "r4",
        author: "دييغو ر.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 5,
        comment: "أوامر الصور وحدها تساوي سعر الحزمة كاملة.",
        date: "قبل أسبوع",
      },
    ],
  },
  {
    id: "p4",
    name: "نظام أيقونات أورورا",
    tagline: "1,200 أيقونة مصممة يدوياً بستة أوزان",
    description:
      "نظام أيقونات موحّد مبني للواجهات الحديثة. محاذاة بصرية متسقة، وسماكة خطوط متغيرة، ودقة مثالية عند المقاسات 16 و20 و24 و32. يأتي بصيغة SVG ومكتبة Figma ومكونات React.",
    price: 49,
    category: "أصول تصميم",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=1200&h=800&fit=crop",
    ],
    features: ["1,200 أيقونة", "6 أوزان", "مكتبة Figma", "مكونات React"],
    specs: {
      الصيغة: "SVG, Figma, React",
      "عدد الأيقونات": "1,200",
      الترخيص: "تجاري",
      الأوزان: "6",
    },
    vendorId: "v1",
    rating: 4.9,
    salesCount: 967,
    reviews: [
      {
        id: "r5",
        author: "هناء م.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        rating: 5,
        comment: "أخيراً مجموعة أيقونات تبدو مصمَّمة بإتقان لا مولَّدة آلياً.",
        date: "قبل 5 أيام",
      },
    ],
  },
  {
    id: "p5",
    name: "موسيقى منتصف الليل السينمائية",
    tagline: "12 مقطوعة مرخّصة لأفلام المنتجات والإعلانات",
    description:
      "اثنتا عشرة مقطوعة سينمائية سُجّلت مع فرقة حيّة من 32 عازفاً. تتضمن المسارات المنفصلة، ومزيجات بديلة، ونسخاً بطول 30 ثانية جاهزة لأفلام الإطلاق والعروض التقديمية والمقاطع القصيرة.",
    price: 89,
    category: "صوتيات وموسيقى",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=800&fit=crop",
    ],
    features: [
      "12 مقطوعة كاملة مع المسارات المنفصلة",
      "ترخيص بث إعلامي",
      "نسخ بطول 30 و60 ثانية",
      "صيغتا WAV و MP3",
    ],
    specs: {
      "عدد المقطوعات": "12",
      الصيغة: "WAV, MP3, مسارات منفصلة",
      الترخيص: "بث إعلامي",
      المدة: "58 دقيقة",
    },
    vendorId: "v4",
    rating: 4.8,
    salesCount: 421,
    reviews: [
      {
        id: "r6",
        author: "أوين ب.",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
        rating: 5,
        comment: "استخدمنا مقطوعتين في إطلاق منتجنا. تأثير فوري.",
        date: "قبل شهرين",
      },
    ],
  },
  {
    id: "p6",
    name: "عائلة خطوط ميريديان",
    tagline: "خط هندسي بتسعة أوزان ومائل حقيقي",
    description:
      "ميريديان خط هندسي معاصر صُمم للواجهات والمحتوى التحريري. تغطية لغوية واسعة، وخط متغير، وميزات OpenType غنية تشمل الأرقام الجدولية والأنماط البديلة.",
    price: 129,
    category: "خطوط وطباعة",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?w=1200&h=800&fit=crop",
    ],
    features: ["9 أوزان مع المائل", "خط متغير", "دعم أكثر من 500 لغة", "ترخيص سطح مكتب وويب"],
    specs: {
      الأوزان: "9",
      الصيغ: "OTF, WOFF2, متغير",
      الترخيص: "سطح مكتب + ويب",
      "عدد المحارف": "820",
    },
    vendorId: "v1",
    rating: 4.9,
    salesCount: 356,
    reviews: [
      {
        id: "r7",
        author: "يوكي إ.",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
        rating: 5,
        comment: "الأحرف المائلة رائعة. استبدلنا به خط علامتنا التجارية فوراً.",
        date: "قبل 3 أسابيع",
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getVendor(id: string): Vendor | undefined {
  return VENDORS.find((v) => v.id === id);
}

function getNextProductId(products: Product[]) {
  const maxId = products.reduce((max, product) => {
    const numericId = Number.parseInt(product.id.replace(/^p/, ""), 10);
    return Number.isNaN(numericId) ? max : Math.max(max, numericId);
  }, 0);

  return `p${maxId + 1}`;
}

export function createMockProduct(input: NewProductInput, products: Product[] = PRODUCTS): Product {
  const template = products.find((product) => product.category === input.category) ?? products[0];
  const trimmedDescription = input.description.trim();
  const normalizedImageUrl = input.imageUrl?.trim() || undefined;

  return {
    id: getNextProductId(products),
    name: input.name.trim(),
    tagline:
      trimmedDescription.length > 96
        ? `${trimmedDescription.slice(0, 93).trimEnd()}...`
        : trimmedDescription,
    description: trimmedDescription,
    price: input.price,
    category: input.category,
    downloadUrl: input.downloadUrl?.trim() || undefined,
    directUrl: input.directUrl?.trim() || undefined,
    imageUrl: normalizedImageUrl,
    image: normalizedImageUrl ?? template?.image ?? "",
    gallery:
      normalizedImageUrl || template
        ? [normalizedImageUrl ?? template?.image ?? "", ...(template?.gallery ?? []).filter((image) => image !== (normalizedImageUrl ?? template?.image))].slice(
          0,
          2,
        )
      : [],
    features: [
      "ملف رقمي جاهز للتحميل الفوري",
      "ترخيص استخدام تجاري مرن",
      "إمكانية الوصول إلى التحديثات القادمة",
    ],
    specs: {
      الصيغة: "أصل رقمي",
      الترخيص: "تجاري",
      الحالة: "جديد",
      الفئة: input.category,
    },
    vendorId: input.vendorId,
    rating: 0,
    salesCount: 0,
    reviews: [],
  };
}

export function replaceMockProducts(products: Product[]) {
  PRODUCTS.splice(0, PRODUCTS.length, ...products);
}
