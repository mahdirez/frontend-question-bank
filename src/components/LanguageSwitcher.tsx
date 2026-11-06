"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next = locale === "en" ? "fa" : "en";

  function handleClick() {
    const search = window.location.search;
    router.replace(`${pathname}${search}`, { locale: next });
  }

  return (
    <button
      type="button"
      lang={next}
      aria-label={t("label")}
      onClick={handleClick}
      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium transition-colors hover:border-accent hover:text-foreground"
    >
      {next === "fa" ? "فارسی" : "English"}
    </button>
  );
}
