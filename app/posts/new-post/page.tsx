import React from "react";
import NewPosts from "./NewPost";
import { Navbar } from "@/components/navigation-bar/Navbar";


const page = () => {
  return (
    <>
      <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
        
        <Navbar />
        <NewPosts />
      </div>
    </>
  );
};

export default page;
