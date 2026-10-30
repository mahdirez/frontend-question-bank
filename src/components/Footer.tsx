import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Built with Next.js · From basics to engineering</p>
        <nav className="flex items-center gap-5">
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
    </footer>
  );
}
