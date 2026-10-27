import Link from "next/link";

const levels = [
  { name: "Basic", desc: "HTML, CSS and JavaScript fundamentals" },
  { name: "Intermediate", desc: "Async, closures, React, TypeScript" },
  { name: "Advanced", desc: "Performance, patterns, rendering strategies" },
  { name: "Engineering", desc: "Architecture, scalability, trade-offs" },
];

export default function Home() {
  return (
    <section className="py-20">
      <p className="mb-4 text-sm font-medium text-accent">
        Frontend interview prep
      </p>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        From the basics to frontend engineering.
      </h1>

      <p className="mt-5 max-w-xl text-lg text-muted">
        A minimal, curated bank of questions to test and grow your frontend
        knowledge at every level.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/questions"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Browse questions
        </Link>
        <Link
          href="/quiz"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          Start a quiz
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {levels.map((level, i) => (
          <div
            key={level.name}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h3 className="mt-2 font-medium">{level.name}</h3>
            <p className="mt-1 text-sm text-muted">{level.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
