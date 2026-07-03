import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PHOTO_URL = ""; // set to "/profile.jpg" once the photo is added to public/

const BIO = [
  "I'm a fullstack web developer who enjoys turning messy, manual processes into clean, reliable software. Over the past year I've contributed to several production systems — from a compliance platform that automates regulatory document generation, to a multi-app sales platform covering a full customer journey, to a customized e-commerce store.",
  "My core stack is TypeScript with Next.js / React on the frontend and NestJS / Node.js on the backend, and I'm comfortable in PHP / Symfony environments too. I care about shipping features end to end: understanding the spec, building the frontend and backend, writing tests, and getting it to production.",
  "I work AI-first — AI coding assistants are part of my daily workflow, which lets me ramp quickly on unfamiliar codebases and deliver production-quality code at pace. I graduated in Information Systems from Institut Teknologi dan Bisnis STIKOM Bali, and I'm open to frontend, backend, and fullstack roles, on-site, hybrid, or remote.",
];

export function About() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="about" label="about" title="Who I am" />
        <div className="flex flex-col gap-10 md:flex-row">
          <Reveal className="shrink-0">
            {PHOTO_URL ? (
              <Image
                src={PHOTO_URL}
                alt="Portrait of Adi Sukma"
                width={224}
                height={272}
                data-testid="profile-photo"
                className="rounded-xl border border-line object-cover"
              />
            ) : (
              <div
                data-testid="profile-photo"
                role="img"
                aria-label="Portrait of Adi Sukma (photo coming soon)"
                className="flex h-[272px] w-[224px] items-center justify-center rounded-xl border border-line bg-surface"
              >
                <span className="font-mono text-xs text-fg-muted">photo — soon</span>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.05} className="max-w-2xl space-y-4">
            {BIO.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-fg-secondary">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
