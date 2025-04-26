"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import React, { useState } from "react";

const LoginPage = () => {
  const { data } = betterAuthClient.useSession();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    await betterAuthClient.signIn.email({ email, password });
  };

  const handleSignup = async () => {
    await betterAuthClient.signUp.email({ name, email, password });
  };

  const handleSignOut = async () => {
    await betterAuthClient.signOut();
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="text-2xl font-bold">Gallium</span>

        {data?.user ? (
          <>
            <div className="text-center">
              <p>Welcome, {data.user.name}!</p>
              <p className="text-sm text-gray-500">{data.user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <input
              type="text"
              placeholder="Name (only for Sign Up)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded"
            />

            <div className="flex gap-4 justify-between">
              <button
                onClick={handleLogin}
                className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
