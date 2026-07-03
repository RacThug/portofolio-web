import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <section id="contact" className="scroll-mt-24 p-8 text-fg-muted">
        contact
      </section>
    </main>
  );
}
