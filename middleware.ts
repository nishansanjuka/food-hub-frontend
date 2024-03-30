import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userBio = request.cookies.get("user-bio");
  const userShippingInfo = request.cookies.get("user-shipping");

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);


  if (request.nextUrl.pathname === "/you") {
    return NextResponse.redirect(
      new URL("/you/personal-informations", request.nextUrl)
    );
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
