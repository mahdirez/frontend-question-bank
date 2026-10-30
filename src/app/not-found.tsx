import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/questions"
        className="mt-8 inline-flex rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Browse questions
      </Link>
    </section>
  );
}
