import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllQuestions } from "@/lib/questions";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/questions",
    "/quiz",
    ...getAllQuestions().map(q => `/questions/${q.id}`),
  ];

  return paths.flatMap(path =>
    routing.locales.map(locale => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(l => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
