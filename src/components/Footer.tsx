import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const h = useTranslations("Header");

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t("text")}</p>
        <nav className="flex items-center gap-5">
          <Link
            href="/questions"
            className="transition-colors hover:text-foreground"
          >
            {h("questions")}
          </Link>
          <Link
            href="/quiz"
            className="transition-colors hover:text-foreground"
          >
            {h("quiz")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
