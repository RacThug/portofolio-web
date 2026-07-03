// Primary sits on accent-600, not 500: white on #3B82F6 is ~3.7:1 (fails AA);
// white on #2563EB is ~5.2:1 (passes). Hover lightens to 500.
const variants = {
  primary: "bg-accent-600 text-fg hover:bg-accent-500 active:bg-accent-600 font-semibold",
  secondary: "border border-line text-fg hover:border-accent-500",
  link: "text-accent-400 underline underline-offset-4 hover:text-accent-500 px-0",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  external = false,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm transition-colors duration-200 cursor-pointer ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
