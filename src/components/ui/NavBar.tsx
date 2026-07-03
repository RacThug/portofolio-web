"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

const NAV = [
  ["projects", "#projects"],
  ["about", "#about"],
  ["skills", "#skills"],
  ["experience", "#experience"],
  ["contact", "#contact"],
] as const;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map(([, href]) => document.querySelector(href)).filter(
      Boolean,
    ) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const linkCls = (href: string) =>
    `font-mono text-sm transition-colors duration-200 hover:text-accent-400 ${
      active === href ? "text-accent-400" : "text-fg-secondary"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/80 backdrop-blur">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a href="#main" className="font-mono text-sm font-semibold text-fg">
          adi<span className="text-accent-400">.dev</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map(([name, href]) => (
            <a key={href} href={href} data-active={active === href} className={linkCls(href)}>
              {name}
            </a>
          ))}
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-3 py-1.5 font-mono text-sm text-fg hover:border-accent-500"
            >
              cv
            </a>
          )}
        </div>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-fg md:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>
      </nav>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur md:hidden"
        >
          <div className="flex h-14 items-center justify-end px-5">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-fg cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV.map(([name, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-heading text-2xl font-semibold text-fg hover:text-accent-400"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
