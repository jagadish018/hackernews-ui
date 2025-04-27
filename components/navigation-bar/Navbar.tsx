"use client";

import { betterAuthClient } from "@/lib/auth";
import Link from "next/link";


const rightLinks = [
  { label: "| new", href: "/blocks/posts/new-post" },
  { label: "| past", href: "/blocks/posts/past-post" },
  { label: "| Posts", href: "/blocks/posts/all-post" },
  { label: "| create", href: "/blocks/posts/create-post" },
];

export default function NavigationBar() {
  const session = betterAuthClient.useSession(); // Get user session

  const authLinks = session.data?.user
    ? [
        // If signed in
        { label: "Sign Out", href: "/auth/sign-out" },
        { label: "Settings", href: "/auth/settings" },
      ]
    : [
        // If not signed in
        { label: "Sign In", href: "/auth/sign-in" },
        { label: "Forgot Password", href: "/auth/forgot-password" },
        { label: "Reset Password", href: "/auth/reset-password" },
      ];

  return (
    <nav className="flex items-center justify-between gap-4 p-2 bg-orange-500 shadow-md mx-auto max-w-7xl sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="border h-6 w-6 border-white flex text-center items-center justify-center text-white font-extrabold">
          Y
        </span>
        <Link href={"/"}>
          <h1 className="font-extrabold">Hacker News</h1>
        </Link>
        <div className="flex items-center gap-4">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {authLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-black hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
