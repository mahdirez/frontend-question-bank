"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <section className="py-24 text-center">
      <p className="font-mono text-sm text-accent">{t("label")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-2 text-muted">{t("description")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {t("retry")}
      </button>
    </section>
  );
}
