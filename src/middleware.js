import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  if (token && (pathname === "/" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/main", request.url));
  }
  const protectedPaths = [
    "/main",
    "/main/profile",
    "/main/liked-videos",
    "/main/subscription",
    "/main/create-channel",
    "/main/create-post",
    "/main/channel-profile",
  ];
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/main/:path*"],
};
