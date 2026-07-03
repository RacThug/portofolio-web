import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      {["projects", "about", "skills", "experience", "contact"].map((id) => (
        <section key={id} id={id} className="scroll-mt-24 p-8 text-fg-muted">
          {id}
        </section>
      ))}
    </main>
  );
}
