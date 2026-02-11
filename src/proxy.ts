import { NextRequest, NextResponse } from "next/server";

import {
  checkPathHasAvailableLocale,
  getUserLocales,
} from "@/features/i18n/utils";
import { availableLocales, defaultLocale } from "@/features/i18n/config";
import { match } from "@formatjs/intl-localematcher";

export const config = {
  matcher: ["/((?!_next|icon.svg|admin|api).*)"],
};

export async function proxy(request: NextRequest) {
  const pathHasAvailableLocale = checkPathHasAvailableLocale(request);

  if (pathHasAvailableLocale) {
    console.log("Valid locale");
    return NextResponse.next();
  }

  console.log("Non valid locale");
  const userLocales = getUserLocales(request);

  const locale = match(userLocales, availableLocales, defaultLocale);

  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
