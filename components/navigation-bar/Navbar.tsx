"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const { data, refetch } = betterAuthClient.useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const handleLogin = async () => {
    if (!data?.user) {
      await betterAuthClient.signIn.username({
        username: "kabir",
        password: "HelloWorld@123",
      });
      await refetch();
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
      await refetch();
    }
  };

  const handleSignOut = async () => {
    await betterAuthClient.signOut();
    await refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
