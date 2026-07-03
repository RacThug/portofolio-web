import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      {["about", "skills", "experience", "contact"].map((id) => (
        <section key={id} id={id} className="scroll-mt-24 p-8 text-fg-muted">
          {id}
        </section>
      ))}
    </main>
  );
}
