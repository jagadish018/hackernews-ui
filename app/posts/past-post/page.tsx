import React from "react";
import PastPosts from "./PastPost";
import NavBar from "@/components/navigation-bar/Navbar";

const page = () => {
  return (
    <>
      <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
        <NavBar />
        <PastPosts />
      </div>
    </>
  );
};

export default page;
