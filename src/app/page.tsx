import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      <Skills />
      {["experience", "contact"].map((id) => (
        <section key={id} id={id} className="scroll-mt-24 p-8 text-fg-muted">
          {id}
        </section>
      ))}
    </main>
  );
}
