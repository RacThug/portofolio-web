import { education, experience } from "@/content/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GraduationCap } from "lucide-react";

export function Experience() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="experience" label="experience" title="Where I've worked" />
        <ol className="relative ml-1 space-y-10 border-l border-line pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <li className="relative">
                <span
                  className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent-500 bg-bg"
                  aria-hidden
                />
                <p className="font-mono text-xs text-fg-muted">{e.period}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  {e.role} <span className="text-fg-muted">— {e.company}</span>
                </h3>
                <p className="font-mono text-xs text-fg-muted">{e.employment}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-secondary">
                  {e.summary}
                </p>
                {e.stack && <p className="mt-2 font-mono text-xs text-accent-400">{e.stack}</p>}
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center gap-4 rounded-xl border border-line bg-surface p-5">
            <GraduationCap className="shrink-0 text-accent-400" size={20} aria-hidden />
            <div>
              <h3 className="font-heading text-base font-semibold">{education.school}</h3>
              <p className="text-sm text-fg-secondary">{education.degree}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
