export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[5px] border border-accent-500/25 bg-accent-subtle px-2 py-0.5 font-mono text-[11px] leading-5 text-accent-400">
      {children}
    </span>
  );
}
