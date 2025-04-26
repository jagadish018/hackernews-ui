"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import React from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();

  const handleLogin = async () => {
    if (!data?.user) {
      await betterAuthClient.signIn.username({
        username: "kabir",
        password: "HelloWorld@123",
      });
      router.refresh(); // <-- refresh page to update session
    }
  };

  const handleSignUp = async () => {
    if (!data?.user) {
      await betterAuthClient.signUp.email({
        name: "Kabi",
        email: "kabir@gmail.com",
        username: "kabir",
        password: "HelloWorld@123",
      });
      router.refresh(); // <-- refresh page to update session
    }
  };

  const handleSignOut = async () => {
    await betterAuthClient.signOut();
    router.refresh(); // <-- refresh page to clear session
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col items-center justify-between gap-4">
        <span className="text-2xl font-bold">Gallium</span>
        {data?.user ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
