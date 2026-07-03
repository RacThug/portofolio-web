export function SectionHeading({
  id,
  label,
  title,
}: {
  id: string;
  label: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-10">
      <p className="font-mono text-sm text-accent-400 mb-2">## {label}</p>
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
