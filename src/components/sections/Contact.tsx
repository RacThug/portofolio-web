import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="contact" label="contact" title="Let's build something" />
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-fg-secondary">
            {site.availability}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>Email me</Button>
            <Button href={site.linkedinUrl} variant="secondary" external>
              LinkedIn
            </Button>
            {site.githubUrl && (
              <Button href={site.githubUrl} variant="secondary" external>
                GitHub
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
      <footer className="mt-24 border-t border-line py-8">
        <Container className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-fg-muted">$ built with next.js + tailwind</p>
          <p className="font-mono text-xs text-fg-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </Container>
      </footer>
    </section>
  );
}
