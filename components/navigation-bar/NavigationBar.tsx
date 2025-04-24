"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationLinks from "@/components/layout/NavigationLinks";


const NavigationBar = () => {
  const [mode, setMode] = useState<null | "signin" | "signup">(null);
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
    setMode(null); // Close the modal on success
  };

  return (
    <>
      <nav className="bg-orange-500 text-black px-4 py-2 flex justify-between items-center text-sm font-sans">
        <NavigationLinks />
        
      </nav>

     
    </>
  );
};

export default NavigationBar;
