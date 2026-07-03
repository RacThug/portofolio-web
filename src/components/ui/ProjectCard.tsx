import type { Project } from "@/content/types";
import { TechBadge } from "@/components/ui/TechBadge";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="font-mono text-[11px] text-fg-muted">{project.label}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold">{project.title}</h3>
      <p className="mt-1 font-mono text-xs text-fg-muted">
        {project.type} · {project.role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
        <span className="text-fg">Problem — </span>
        {project.problem}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
        <span className="text-fg">Built — </span>
        {project.built}
      </p>
      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-fg-secondary">
            <span className="text-accent-400" aria-hidden>
              ▸
            </span>
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-accent-400 hover:text-accent-500"
        >
          <ExternalLink size={14} aria-hidden /> Live site
        </a>
      )}
    </article>
  );
}
