// middleware.ts
import { betterFetch } from "@better-fetch/fetch";

import { NextRequest, NextResponse } from "next/server";
import { betterAuthClient } from "./lib/auth";

type Session = typeof betterAuthClient.$Infer.Session;

const PUBLIC_ROUTES = ["/login"];
const PROTECTED_POST_ACTIONS = [
  "/posts/create-post",
  "/posts/comment-post",
  "/posts/delete-post",
  "/posts/like-post",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verify session for protected routes
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    const redirectUrl = new URL("/login", request.url);
    // Store original path for redirect after login
    redirectUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Additional verification for sensitive post actions
  if (PROTECTED_POST_ACTIONS.some((route) => pathname.startsWith(route))) {
    const { data: isValid } = await betterFetch<{ valid: boolean }>(
      "/api/auth/validate-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
          "x-required-role": "post_editor", // Example of role-based protection
        },
      }
    );

    if (!isValid?.valid) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  // Add user info to headers for downstream routes
  const headers = new Headers(request.headers);
  headers.set("x-user-id", session.user?.id || "");
  headers.set("x-user-email", session.user?.email || "");

  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}

export const config = {
  matcher: [
    // Protect all post management routes
    "/posts/(create-post|comment-post|delete-post|like-post)/:path*",

    // User profile routes
    "/users/profile/:path*",
    "/users/my-profile",

    // Current user's posts
    "/posts/post-curr",

    // API routes
    "/api/posts/:path*",
    "/api/users/:path*",

    // Exclude public post viewing routes
    "/((?!posts/page$|posts/[id]$|posts/new-post$|posts/past-post$).*)",
  ],
};
