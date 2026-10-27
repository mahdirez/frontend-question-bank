import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          FE Question Bank
        </Link>

        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link
            href="/questions"
            className="transition-colors hover:text-foreground"
          >
            Questions
          </Link>
          <Link
            href="/quiz"
            className="transition-colors hover:text-foreground"
          >
            Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
