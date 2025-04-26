"use client";

import { useRouter } from "next/navigation";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  const { data, refetch } = betterAuthClient.useSession();
  const user = data?.user;

  const handleSignOut = async () => {
    await betterAuthClient.signOut();
    await refetch(); // Refresh session after sign out
    router.push("/");
  };

  return (
    <div className="bg-orange-600 text-black text-sm mx-auto max-w-7xl">
      <div className="max-w-screen-xl mx-auto px-2 py-1 flex justify-between items-center">
        {/* Left Side Navigation */}
        <div className="flex items-center gap-1">
          <span className="border h-6 w-6 border-white flex text-center items-center justify-center text-white font-extrabold">
            Y
          </span>
          <span
            onClick={() => router.push("/")}
            className="font-bold ml-1 cursor-pointer"
          >
            Hacker News
          </span>

          <span className="flex flex-row gap-2 ml-4 text-black">
            <button onClick={() => router.push("/posts/new-post")}>new</button>{" "}
            |
            <button onClick={() => router.push("/posts/past-post")}>
              past
            </button>{" "}
            |
            <button onClick={() => router.push("/posts/post-curr")}>
              show
            </button>
            {user && (
              <>
                |{" "}
                <button onClick={() => router.push("/posts/create-post")}>
                  submit
                </button>
              </>
            )}
          </span>
        </div>

        {/* Right Side Auth Controls */}
        <div className="flex items-center text-black text-sm">
          {user ? (
            <>
              <span className="mr-1">{user.name || user.username} (1)</span>
              <span className="mx-1">|</span>
              <button onClick={handleSignOut} className="hover:underline">
                logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/log")}
              className="hover:underline"
            >
              login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
