import React from "react";


import PostList from "./posts/page";
import NavBar from "@/components/navigation-bar/Navbar";

const RootPage = () => {
  return (
    <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
    <NavBar />
      <div className=" ">
        <PostList />
      </div>
    </div>
  );
};

export default RootPage;
