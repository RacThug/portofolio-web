import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Adi Sukma — Fullstack Web Developer (Next.js · NestJS · TypeScript)",
  description:
    "Fullstack web developer in Bali building production web apps with Next.js, NestJS, and TypeScript. Open to frontend, backend, and fullstack roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
