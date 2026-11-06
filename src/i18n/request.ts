import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  const param = await rootParams.locale();

  if (!hasLocale(routing.locales, param)) {
    notFound();
  }

  return {
    locale: param,
    messages: (await import(`../../messages/${param}.json`)).default,
  };
});
