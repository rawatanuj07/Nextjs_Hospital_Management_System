import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.rewrite(new URL("/home", request.url));
  } else {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/signup", "/login", "/"],
};
