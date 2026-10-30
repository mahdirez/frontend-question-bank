export const SITE_NAME = "FE Question Bank";

export const SITE_DESCRIPTION =
  "A curated frontend question bank, from fundamentals to engineering.";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
