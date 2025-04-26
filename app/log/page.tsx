"use client";

import React, { useState, useEffect } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navigation-bar/Navbar";

const LoginPage = () => {
  const { data, refetch } = betterAuthClient.useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async () => {
    try {
      await betterAuthClient.signIn.username({
        username: loginData.username,
        password: loginData.password,
      });
      await refetch(); // Important to refresh session after login
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      await betterAuthClient.signUp.email({
        email: formData.email,
        name: formData.name,
        username: formData.username,
        password: formData.password,
      });
      await refetch(); // Refresh session after signup
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    if (data?.user) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div className="p-4 font-sans text-sm">
      <div className="flex justify-between items-center border-b pb-2 mb-6">
        <NavBar />
      </div>

      {!data?.user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <LoginForm
            loginData={loginData}
            handleChangeLogin={handleChangeLogin}
            handleSignIn={handleSignIn}
          />
          <SignUpForm
            formData={formData}
            handleChangeSignUp={handleChangeSignUp}
            handleSignUp={handleSignUp}
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
