import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="flex min-h-dvh items-center">
      <Container>
        <Reveal>
          <p className="mb-6 font-mono text-sm text-fg-muted">
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full bg-accent-500 align-middle"
              aria-hidden
            />
            {site.statusLine}
          </p>
          <h1 className="font-heading font-semibold tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,8vw,5.5rem)]">
            {site.name}
            <br />
            <span className="text-fg-muted">{site.heroLine}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
            {site.oneLiner}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Get in Touch
            </Button>
            {site.cvUrl && (
              <Button href={site.cvUrl} variant="link" external>
                Download CV
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
