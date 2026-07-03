import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="skills" label="skills" title="What I work with" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04} className={g.featured ? "sm:col-span-2" : ""}>
              <div className="h-full rounded-xl border border-line bg-surface p-5">
                <h3 className="font-mono text-sm text-accent-400">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <TechBadge key={item}>{item}</TechBadge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
