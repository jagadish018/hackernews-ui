import { betterFetch } from "@better-fetch/fetch";

import { NextRequest, NextResponse } from "next/server";
import { betterAuthClient } from "./lib/auth";

type Session = typeof betterAuthClient.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posts"], // Apply middleware to specific routes
};
