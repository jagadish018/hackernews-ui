import React from "react";


import CurrPost from "./CurrPost";
import { Navbar } from "@/components/navigation-bar/Navbar";

const page = () => {
  return (
    <>
      <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
        <Navbar />
        <CurrPost />
      </div>
    </>
  );
};

export default page;
