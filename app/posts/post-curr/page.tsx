import React from "react";

import NavBar from "@/components/navigation-bar/Navbar";
import CurrPost from "./CurrPost";

const page = () => {
  return (
    <>
      <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
        <NavBar />
        <CurrPost />
      </div>
    </>
  );
};

export default page;
