export interface ShowcaseImage {
  src: string;
  w: number;
  h: number;
}

export interface ShowcaseWork {
  c: string;
  t: string;
  d: string;
  imgs?: ShowcaseImage[];
  g: [string, string];
  tools: string[];
  pos?: string;
  fit?: "cover" | "contain";
}

export const SHOWCASE_WORKS: ShowcaseWork[] = [
  // ─── 1. Social media post ───────────────────────────────────────────
  {
    c: "Social media post",
    t: "Bonchon – K-Style Feast",
    d: "A vibrant promotional social media design featuring Korean-style fried chicken, bold orange visuals, and engaging food photography. Created to capture attention and highlight the brand's energetic personality.",
    imgs: [
      { src: "/projects/1. Social media post/1. Bonchon – K-Style Feast.png", w: 1145, h: 1350 },
    ],
    g: ["#ea580c", "#fb923c"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media post",
    t: "Prensu – Personal Introduction",
    d: "A modern personal branding design featuring bold typography, vibrant red gradients, and a glassmorphism-inspired layout to create a distinctive designer identity.",
    imgs: [
      { src: "/projects/1. Social media post/2. Prensu – Personal Introduction.png", w: 1200, h: 1200 },
    ],
    g: ["#7f0000", "#ef2b36"],
    tools: ["Figma", "Photoshop"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media post",
    t: "Laufey – Falling Behind",
    d: "An elegant editorial-style social media design combining sophisticated typography, soft neutral tones, and artistic photography to create a timeless visual composition.",
    imgs: [
      { src: "/projects/1. Social media post/3. Laufey – Falling Behind.png", w: 1080, h: 1350 },
    ],
    g: ["#527058", "#384d3c"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media post",
    t: "Be You – Minimal Fashion",
    d: "A premium fashion-inspired social media design featuring minimalist typography, warm neutral tones, and elegant photography to communicate confidence, simplicity, and timeless style.",
    imgs: [
      { src: "/projects/1. Social media post/4. Be You – Minimal Fashion.png", w: 1080, h: 1350 },
    ],
    g: ["#27272a", "#18181b"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 2. Book design ─────────────────────────────────────────────────
  {
    c: "Book design",
    t: "Simplifyte – Book Design",
    d: "A modern book design featuring a clean navy-blue and white color palette, bold typography, and consistent brand elements. Designed with front and back covers, combining clear messaging and custom illustrations to create a professional and visually engaging presentation.",
    imgs: [
      { src: "/projects/2. Book design/1. book design/3.png", w: 3487, h: 3487 },
      { src: "/projects/2. Book design/1. book design/2.png", w: 2480, h: 3508 },
      { src: "/projects/2. Book design/1. book design/1.png", w: 2480, h: 3508 },
    ],
    g: ["#0c4a6e", "#0369a1"],
    tools: ["Photoshop", "Figma", "Canva"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 3. Landing pages ───────────────────────────────────────────────
  {
    c: "Landing pages",
    t: "WoodNest – Lodge Booking Website",
    d: "A modern lodge booking website featuring a misty forest atmosphere, immersive nature photography, and elegant glass-style booking panels. Designed for desktop and mobile to create a seamless and relaxing booking experience.",
    imgs: [
      { src: "/projects/3. Landing pages/1. WoodNest – Lodge Booking Website/1.png", w: 1728, h: 1117 },
      { src: "/projects/3. Landing pages/1. WoodNest – Lodge Booking Website/2.png", w: 1728, h: 1117 },
    ],
    g: ["#1e3a4c", "#f59e0b"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "Nutino – Productivity Platform",
    d: "A modern SaaS landing page featuring bold typography, vibrant gradients, and interactive 3D-inspired elements. Designed to communicate productivity, collaboration, and a smarter workflow through a clean visual experience.",
    imgs: [
      { src: "/projects/3. Landing pages/2. Nutino – Productivity Platform.png", w: 1024, h: 661 },
    ],
    g: ["#5B3DF5", "#8C76FF"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "Layers – Hiring Platform",
    d: "A vibrant recruitment platform landing page combining colorful gradients, modern typography, and engaging visual elements. Designed to simplify the hiring experience and connect businesses with potential talent.",
    imgs: [
      { src: "/projects/3. Landing pages/3. Layers – Hiring Platform.png", w: 1024, h: 632 },
    ],
    g: ["#0f766e", "#34d399"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "Nike Air Max 90 – Sneaker Landing Page",
    d: "A premium sneaker landing page featuring a bold dark theme, striking product visuals, and modern typography. Designed to highlight the Nike Air Max 90 through a dynamic product-focused layout.",
    imgs: [
      { src: "/projects/3. Landing pages/4. Nike Air Max 90 – Sneaker Landing Page.png", w: 1024, h: 661 },
    ],
    g: ["#e11d48", "#FF7A45"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "Design School – Online Learning Platform",
    d: "A creative online learning platform landing page featuring colorful geometric elements, bold typography, and a playful visual style. Designed to promote creative education and make learning more engaging and accessible.",
    imgs: [
      { src: "/projects/3. Landing pages/5. Design School – Online Learning Platform.png", w: 1024, h: 661 },
    ],
    g: ["#f59e0b", "#ec4899"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "Workups – AI-Powered Creative Platform",
    d: "A futuristic landing page featuring a dark purple theme, glowing 3D elements, and modern typography. Designed to communicate AI-powered creativity through an immersive and visually engaging digital experience.",
    imgs: [
      { src: "/projects/3. Landing pages/6. Workups – AI-Powered Creative Platform.png", w: 1024, h: 661 },
    ],
    g: ["#1e1b4b", "#7c3aed"],
    tools: ["Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Landing pages",
    t: "VoltRide",
    d: "A futuristic electric scooter landing page featuring a clean layout, vibrant aqua gradients, and modern product visuals. Designed to showcase innovation, speed, and a seamless user experience across desktop and mobile.",
    imgs: [
      { src: "/projects/3. Landing pages/7. VoltRide.png", w: 1024, h: 675 },
    ],
    g: ["#0f172a", "#06b6d4"],
    tools: ["Figma", "Photoshop"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 4. Creative designs ────────────────────────────────────────────
  {
    c: "Creative designs",
    t: "SimpliFyte – AIS Summit 2026",
    d: "A modern promotional design featuring a clean blue-and-white color palette, creative character illustration, and professional branding. Designed to highlight workflow clarity, collaboration, efficiency, and growth while promoting the AIS Summit 2026 campaign.",
    imgs: [
      { src: "/projects/4. Creative designs/1. SimpliFyte – AIS Summit 2026_master.png", w: 3000, h: 7182 },
    ],
    g: ["#0f2b48", "#1e3a5f"],
    tools: ["Figma", "Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 5. Logo designs ────────────────────────────────────────────────
  {
    c: "Logo designs",
    t: "Ghaddeer Cab – Brand Identity",
    d: "A premium logo design for Ghaddeer Cab, featuring a creative car-inspired emblem, elegant typography, and a sophisticated brown-and-beige color palette. Showcasing the logo across promotional displays, merchandise, and social media applications.",
    imgs: [
      { src: "/projects/5. Logo designs/1. Ghaddeer Cab – Brand Identity/2.png", w: 1280, h: 720 },
      { src: "/projects/5. Logo designs/1. Ghaddeer Cab – Brand Identity/3.png", w: 760, h: 766 },
      { src: "/projects/5. Logo designs/1. Ghaddeer Cab – Brand Identity/1.png", w: 800, h: 800 },
    ],
    g: ["#8a4b22", "#e0b36a"],
    tools: ["Figma", "Photoshop"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Logo designs",
    t: "Panda Coffee Shop & Pastries – Branding",
    d: "A charming coffee shop branding project featuring a distinctive logo, elegant typography, and a rich brown-and-cream color palette. Designed to create a warm and inviting brand identity across coffee packaging, pastry boxes, storefront signage, and promotional materials.",
    imgs: [
      { src: "/projects/5. Logo designs/2. Panda Coffee Shop & Pastries – Branding/2.png", w: 1122, h: 1402 },
      { src: "/projects/5. Logo designs/2. Panda Coffee Shop & Pastries – Branding/3.png", w: 1122, h: 1402 },
      { src: "/projects/5. Logo designs/2. Panda Coffee Shop & Pastries – Branding/1.png", w: 1024, h: 768 },
    ],
    g: ["#5a2d1e", "#d97706"],
    tools: ["Figma", "Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Logo designs",
    t: "Crumbo Cookies – Brand Identity",
    d: "A playful and modern bakery branding concept featuring a creative logo, warm earthy colors, and attractive packaging designs. Showcasing a consistent visual identity across cookie boxes, takeaway cups, shopping bags, merchandise, and promotional materials.",
    imgs: [
      { src: "/projects/5. Logo designs/3. Crumbo Cookies – Brand Identity/2.png", w: 1536, h: 1024 },
      { src: "/projects/5. Logo designs/3. Crumbo Cookies – Brand Identity/1.png", w: 1024, h: 768 },
    ],
    g: ["#7a4a33", "#e8bd84"],
    tools: ["Figma", "Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 6. Social media posters ────────────────────────────────────────
  {
    c: "Social media posters",
    t: "Ghaddeer Cab – Premium Travel",
    d: "A professional promotional poster featuring luxury car visuals, elegant typography, and a warm brown-and-beige color palette. Designed to highlight safe, comfortable, and reliable cab services through a clean and premium visual presentation.",
    imgs: [
      { src: "/projects/6. Social media posters/1. Ghaddeer Cab – Premium Travel/1.png", w: 1254, h: 1254 },
      { src: "/projects/6. Social media posters/1. Ghaddeer Cab – Premium Travel/2.png", w: 1254, h: 1254 },
    ],
    g: ["#c2813f", "#5a2d1e"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media posters",
    t: "SimpliFyte – Work Made Simple",
    d: "A creative promotional poster featuring an engaging character illustration and conversational storytelling. Designed to communicate the importance of clarity, organization, and productivity through SimpliFyte's digital workspace.",
    imgs: [
      { src: "/projects/6. Social media posters/2. SimpliFyte – Where's the Update.png", w: 1121, h: 1403 },
    ],
    g: ["#0f2238", "#1e3a5f"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media posters",
    t: "SimpliFyte – Where's the Update?",
    d: "A bold and engaging promotional design featuring a playful character illustration, modern typography, and vibrant blue accents. Created to highlight communication gaps and promote smarter workflow management.",
    imgs: [
      { src: "/projects/6. Social media posters/3. SimpliFyte – Where's the Update.png", w: 1254, h: 1254 },
    ],
    g: ["#0b1329", "#1e293b"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media posters",
    t: "SimpliFyte – With or Without",
    d: "A creative storytelling poster featuring adorable character illustrations and a dark cinematic background. Designed to highlight the benefits of using SimpliFyte for better clarity, control, and timely task management.",
    imgs: [
      { src: "/projects/6. Social media posters/4. SimpliFyte – With or Without.png", w: 1122, h: 1402 },
    ],
    g: ["#09090b", "#18181b"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Social media posters",
    t: "Happy Ganesh Chaturthi – SimpliFyte",
    d: "A festive social media poster celebrating Ganesh Chaturthi with a cute 3D Lord Ganesha illustration, soft blue background, and modern social media-inspired layout. Designed to combine festive emotions with SimpliFyte's brand identity.",
    imgs: [
      { src: "/projects/6. Social media posters/5. Happy Ganesh Chaturthi – SimpliFyte/1.png", w: 1122, h: 1402 },
      { src: "/projects/6. Social media posters/5. Happy Ganesh Chaturthi – SimpliFyte/2.png", w: 1254, h: 1254 },
    ],
    g: ["#0284c7", "#38bdf8"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
    pos: "center center",
  },

  // ─── 7. Brochure ────────────────────────────────────────────────────
  {
    c: "Brochure",
    t: "AKG- AKG alcotech",
    d: "A professional corporate brochure designed for ALQ Metals, showcasing its products, services, and company information through clean layouts and modern industrial visuals. Designed to communicate the brand's identity while presenting information in a clear and engaging way.",
    imgs: [
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/1.png", w: 280, h: 595 },
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/2.png", w: 280, h: 595 },
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/3.png", w: 280, h: 595 },
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/4.png", w: 280, h: 595 },
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/5.png", w: 280, h: 595 },
      { src: "/projects/7. Brochure/1. AKG- AKG alcotech/6.png", w: 280, h: 595 },
    ],
    g: ["#7c2d12", "#431407"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
    pos: "center center",
  },
  {
    c: "Brochure",
    t: "simplifyte",
    d: "A modern business brochure designed for Simplifyte to highlight its smart workspace solutions and key features. Featuring clean layouts, minimal visuals, and a professional blue-and-white color palette to communicate the value of simplified workflows and better team collaboration.",
    imgs: [
      { src: "/projects/7. Brochure/2. simplifyte/1.jpg", w: 1877, h: 3988 },
      { src: "/projects/7. Brochure/2. simplifyte/4.jpg", w: 1877, h: 3988 },
      { src: "/projects/7. Brochure/2. simplifyte/2.jpg", w: 451, h: 957 },
      { src: "/projects/7. Brochure/2. simplifyte/3.jpg", w: 451, h: 957 },
      { src: "/projects/7. Brochure/2. simplifyte/5.jpg", w: 451, h: 957 },
      { src: "/projects/7. Brochure/2. simplifyte/6.jpg", w: 451, h: 957 },
    ],
    g: ["#0369a1", "#0284c7"],
    tools: ["Figma", "Canva", "Photoshop"],
    fit: "contain",
    pos: "center center",
  },
];

export const SHOWCASE_CATEGORIES: string[] = [
  "All",
  "Social media post",
  "Book design",
  "Landing pages",
  "Creative designs",
  "Logo designs",
  "Social media posters",
  "Brochure",
];

export const TICKER_ITEMS: string[] = [
  "UI design",
  "UX design",
  "Landing pages",
  "Mobile screens",
  "Branding",
  "Logos",
  "Brochures",
  "Social media",
];
