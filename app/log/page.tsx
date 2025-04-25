"use client";

import React, { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import NavBar from "@/components/navigation-bar/Navbar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const { data } = betterAuthClient.useSession();
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
    await betterAuthClient.signIn.username({
      username: loginData.username,
      password: loginData.password,
    });
      router.push("/");
      
  };

  const handleSignUp = async () => {
    await betterAuthClient.signUp.email({
      email: formData.email,
      name: formData.name,
      username: formData.username,
      password: formData.password,
    });
      router.push("/");
  };

  return (
    <div className="p-4 font-sans text-sm mx-30">
      <div className="flex justify-between items-center border-b pb-2 mb-6">
        {data?.user && <NavBar />}
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
