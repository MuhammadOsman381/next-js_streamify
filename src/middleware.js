import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  if (token && (pathname === "/" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/main", request.url));
  }
  if (!token && pathname === "/main") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/signup", "/main"],
};
