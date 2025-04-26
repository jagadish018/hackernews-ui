"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import React from "react";

const NavBar = () => {
  const { data } = betterAuthClient.useSession();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-between">
        <span>Gallium</span>
        {data?.user ? (
          <button
            onClick={() => {
              betterAuthClient.signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer" 
              onClick={() => {
                betterAuthClient.signIn.username({
                  username: "kabir",
                  password: "HelloWorld@123",
                });
              }}
            >
              Log In
            </button>
            <button
              onClick={() => {
                betterAuthClient.signUp.email({
                  name: "Kabi",
                  email: "kabir@gmail.com",
                  username: "kabir",
                  password: "HelloWorld@123",
                });
              }}
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
