"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { betterAuthClient } from "@/lib/auth";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  username?: string | null;
  displayUsername?: string | null;
};

type Session = {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
};

type AuthSession = {
  user: User;
  session: Session;
} | null;

const Navbar = () => {
  const [session, setSession] = useState<AuthSession>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await betterAuthClient.getSession();
        setSession(data);
      } catch (error) {
        console.error("Session check failed:", error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await betterAuthClient.signOut();
      setSession(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navItems = [
    { label: "new", href: "/new-post" },
    { label: "past", href: "/past-post" },
    { label: "comments", href: "#" },
    { label: "my post", href: "/post-curr" },
    { label: "submit", href: "/create-post" },
  ];

  if (isLoading) {
    return (
      <nav className="bg-orange-600 text-black text-sm font-sans max-w-screen-lg mx-auto w-full">
        <div className="w-full flex items-center justify-between px-3 py-1">
          <div className="flex items-center flex-wrap gap-2">
            <Link href="/" className="font-bold text-black">
              Hacker News
            </Link>
          </div>
          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </nav>
    );
  }

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
          {session?.user ? (
            <>
              <span className="text-xs">
                {session.user.username || session.user.name}
              </span>
              <button onClick={handleSignOut} className="hover:underline">
                logout
              </button>
            </>
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
