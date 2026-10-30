import type { MetadataRoute } from "next";
import { getAllQuestions } from "@/lib/questions";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/questions", "/quiz"].map(path => ({
    url: `${SITE_URL}${path}`,
  }));

  const questions = getAllQuestions().map(q => ({
    url: `${SITE_URL}/questions/${q.id}`,
  }));

  return [...pages, ...questions];
}
