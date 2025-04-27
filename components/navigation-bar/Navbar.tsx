"use client";

import React from "react";
import Link from "next/link";
import { betterAuthClient } from "@/lib/auth";
const Navbar = () => {
  const { data } = betterAuthClient.useSession();
  const navItems = [
    { label: "new", href: "/new-post" },
    { label: "past", href: "/past-post" },
    { label: "comments", href: "#" },
    {label: "my post", href: "/post-curr"},
   
    { label: "submit", href: "/create-post" },
  ];
  return (
    <nav className="bg-orange-600 text-black text-sm font-sans max-w-screen-lg mx-auto w-full">
      <div className="w-full flex items-center justify-between px-3 py-1">
        <div className="flex items-center flex-wrap gap-2">
          <Link href="/" className="font-bold text-black">
            Hacker News
          </Link>
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <span className="text-black">|</span>
              <Link href={item.href}>{item.label}</Link>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {data?.user ? (
            <button
              onClick={() => betterAuthClient.signOut()}
              className="hover:underline"
            >
              logout
            </button>
          ) : (
            <Link href="/sign-in" className="hover:underline">
              login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
