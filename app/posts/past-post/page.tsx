import React from "react";
import PastPosts from "./PastPost";
import Navbar from "@/components/navigation-bar/Navbar";



const page = () => {
  return (
    <>
      <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
        <Navbar />
        <PastPosts />
      </div>
    </>
  );
};

export default page;
