"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


const rightLinks = [
  { label: "| new", href: "/blocks/posts/new-post" },
  { label: "| past", href: "/blocks/posts/past-post" },
  { label: "| create", href: "/blocks/posts/create-post" },
  { label: "| my post", href: "/blocks/posts/post-curr" },
];

export default function NavigationBar() {
  const router = useRouter();
  const { data: session, isPending } = betterAuthClient.useSession();
   

  const handleSignOut = async () => {
    await betterAuthClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
      },
    });
  };

  return (
    <nav className="flex items-center justify-between gap-4 p-2 bg-orange-500 shadow-md mx-auto max-w-7xl sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="border h-6 w-6 border-white flex text-center items-center justify-center text-white font-extrabold">
          Y
        </span>

        <Link href={"/"}>
          <h1 className="font-extrabold">Hacker News</h1>
        </Link>
        {isPending ? null : session ? (
          <>
            <p>Welcome</p>
          </>
        ) : null}
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
        {isPending ? null : session ? (
          <>
            <p> {session.user.name}</p>
            {/* Display the user's name */}
            <Link href="/auth/settings" className="text-black hover:underline">
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="text-black hover:underline"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/sign-in" className="text-black hover:underline">
              Sign In
            </Link>
            <Link
              href="/auth/forgot-password"
              className="text-black hover:underline"
            >
              Forgot Password
            </Link>
            <Link
              href="/auth/reset-password"
              className="text-black hover:underline"
            >
              Reset Password
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
