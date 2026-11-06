import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLevelCounts } from "@/lib/questions";
import { LEVELS } from "@/types/question";

export default async function Home() {
  const t = await getTranslations("Home");
  const tl = await getTranslations("Levels");
  const format = await getFormatter();
  const counts = getLevelCounts();

  return (
    <section className="py-20">
      <p className="mb-4 text-sm font-medium text-accent">{t("eyebrow")}</p>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>

      <p className="mt-5 max-w-xl text-lg text-muted">{t("subtitle")}</p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/questions"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("browse")}
        </Link>
        <Link
          href="/quiz"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          {t("quiz")}
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {LEVELS.map((level, i) => (
          <div
            key={level}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">
                {format.number(i + 1, { minimumIntegerDigits: 2 })}
              </span>
              <span className="text-xs text-muted">
                {t("questionsCount", { count: counts[level] })}
              </span>
            </div>
            <h3 className="mt-2 font-medium">{tl(`${level}.name`)}</h3>
            <p className="mt-1 text-sm text-muted">{tl(`${level}.desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
