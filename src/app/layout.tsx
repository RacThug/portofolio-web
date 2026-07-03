import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/ui/NavBar";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adi Sukma — Fullstack Web Developer (Next.js · NestJS · TypeScript)",
  description:
    "Fullstack web developer in Bali building production web apps with Next.js, NestJS, and TypeScript. Open to frontend, backend, and fullstack roles.",
  keywords: [
    "fullstack developer",
    "web developer",
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "Node.js",
    "PHP",
    "Symfony",
    "Bali",
    "Indonesia",
    "remote developer",
  ],
  openGraph: {
    title: "Adi Sukma — Fullstack Web Developer",
    description: "Production web apps with Next.js, NestJS, and TypeScript.",
    url: siteUrl,
    siteName: "Adi Sukma",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: siteUrl,
  sameAs: [site.linkedinUrl, site.githubUrl].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denpasar",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
