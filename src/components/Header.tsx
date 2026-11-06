import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const t = useTranslations("Header");
  const brand = useTranslations("Metadata");

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          {brand("title")}
        </Link>

        <nav className="flex items-center gap-4 text-sm text-muted sm:gap-5">
          <Link
            href="/questions"
            className="transition-colors hover:text-foreground"
          >
            {t("questions")}
          </Link>
          <Link
            href="/quiz"
            className="transition-colors hover:text-foreground"
          >
            {t("quiz")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
