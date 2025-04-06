import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "your-secret-key";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;
  
  // Check if user is authenticated
  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, key);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }
  
  // Handle dashboard access attempts when not authenticated
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    // Store the original URL to redirect back after login
    const returnUrl = encodeURIComponent(request.url);
    const loginUrl = new URL(`/auth/login?returnUrl=${returnUrl}`, request.url);
    
    // If there's a selected plan in the URL, add it to the login redirect
    const url = new URL(request.url);
    if (url.searchParams.has('plan')) {
      loginUrl.searchParams.set('plan', url.searchParams.get('plan')!);
      if (url.searchParams.has('kilos')) {
        loginUrl.searchParams.set('kilos', url.searchParams.get('kilos')!);
      }
    }
    
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect authenticated users trying to access login/signup to profile
  if (isAuthenticated && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
    // Check if there are plan selection parameters to forward
    const url = new URL(request.url);
    const plan = url.searchParams.get('plan');
    
    if (plan) {
      // User is authenticated and has plan selection - redirect to orders
      const orderUrl = new URL('/dashboard/order', request.url);
      orderUrl.searchParams.set('plan', plan);
      if (url.searchParams.has('kilos')) {
        orderUrl.searchParams.set('kilos', url.searchParams.get('kilos')!);
      }
      return NextResponse.redirect(orderUrl);
    }
    
    // User is authenticated but no plan - redirect to profile
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }
  
  // Check for home page access when logged out
  if (!isAuthenticated && pathname === "/") {
    // Allow access to home page
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

// Routes that should be handled dynamically - these will be excluded from static generation
export const config = {
  matcher: [
    // Home and static pages that use auth context
    "/",
    // Auth-related pages
    "/auth/:path*",
    // Dashboard pages that need auth
    "/dashboard/:path*",
    // Pages that might have dynamic content
    "/pricing",
    "/services",
    "/products",
    "/about",
    "/contact",
  ],
};