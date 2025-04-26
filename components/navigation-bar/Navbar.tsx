"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation"; // ADD this import
import React from "react";

const NavBar = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter(); // ADD this

  const handleLogin = async () => {
    await betterAuthClient.signIn.username({
      username: "kabir",
      password: "HelloWorld@123",
    });
    router.refresh(); // Refresh the page after login
  };

  const handleSignup = async () => {
    await betterAuthClient.signUp.email({
      name: "Kabi",
      email: "kabir@gmail.com",
      username: "kabir",
      password: "HelloWorld@123",
    });
    router.refresh(); // Refresh after signup too
  };

  const handleLogout = async () => {
    await betterAuthClient.signOut();
    router.refresh(); // Refresh after logout
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-between">
        <span>Gallium</span>
        {data?.user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Sign Out
          </button>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
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
