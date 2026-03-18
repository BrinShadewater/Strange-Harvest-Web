import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AB_COOKIE = "sh_ab_theme_v1";
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has(AB_COOKIE)) {
    const variant = Math.random() < 0.5 ? "red" : "blue";
    response.cookies.set(AB_COOKIE, variant, {
      maxAge: AB_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/es"],
};
