import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { PROFILE_DATA } from "@/data/profile";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F1FF" },
    { media: "(prefers-color-scheme: dark)", color: "#120F26" },
  ],
};

const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
  display: "swap",
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prensu Sonkar — UI/UX Designer",
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Prensu Sonkar",
    "Simplifyte",
    "Figma",
    "Wireframing",
    "Prototyping",
    "Branding",
    "Logo Design",
    "Behance",
    "MKBU",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: `${SITE_NAME} — UI/UX Designer Portfolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/works/og-image.png",
        alt: `${SITE_NAME} — UI/UX Designer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/works/og-image.png"],
  },
};

const themeScript = `(function(){try{var saved=localStorage.getItem("theme");if(saved==="light"||saved==="dark"){document.documentElement.setAttribute("data-theme",saved);}}catch(error){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE_DATA.name,
  jobTitle: PROFILE_DATA.title,
  url: SITE_URL,
  email: `mailto:${PROFILE_DATA.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhavnagar",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    PROFILE_DATA.linkedin,
    PROFILE_DATA.behance ?? "https://www.behance.net/prensusonkar",
    PROFILE_DATA.github,
  ],
  knowsAbout: [
    ...PROFILE_DATA.skillsUIUX,
    ...(PROFILE_DATA.skillsGraphic ?? []),
    ...(PROFILE_DATA.skillsTools ?? []),
    ...PROFILE_DATA.skillsTechnical,
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
