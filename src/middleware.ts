import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "your-secret-key";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // If the user is trying to access auth pages and is already logged in, redirect to homepage
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/auth/login") ||
     request.nextUrl.pathname.startsWith("/auth/signup"))
  ) {
    try {
      await jwtVerify(token, key);
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      // Token is invalid, allow access to auth pages
    }
  }

  // If the user is trying to access protected pages and is not logged in, redirect to login
  if (
    !token &&
    ["/profile", "/orders", "/schedule"].some(path => 
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(request.url)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/schedule/:path*",
  ],
};