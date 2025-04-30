"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { betterAuthClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await betterAuthClient.signIn.username({
        username: loginData.username,
        password: loginData.password,
      });

      if ("data" in response && response.data?.user) {
        const redirectTo = searchParams.get("from") || "/";
        router.push(redirectTo);
      } else {
        setStatus({
          loading: false,
          error: "Login failed. Please check your credentials.",
        });
      }
    } catch {
      setStatus({
        loading: false,
        error: "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-3rem)] flex items-center justify-center bg-[#f1f1db]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {status.error && (
          <p className="text-red-500 mb-4 text-center">{status.error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status.loading}
            className="w-full mt-4 bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status.loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex justify-center text-sm mt-4">
            <span className="text-black">
              Don&apos;t have an account?&nbsp;
            </span>
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
