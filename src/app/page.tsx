import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      {["skills", "experience", "contact"].map((id) => (
        <section key={id} id={id} className="scroll-mt-24 p-8 text-fg-muted">
          {id}
        </section>
      ))}
    </main>
  );
}
