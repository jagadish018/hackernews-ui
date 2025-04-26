import React from "react";

import NavigationBar from "@/components/navigation-bar/Navbar";
import PostList from "./posts/page";

const RootPage = () => {
  return (
    <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
      <NavigationBar />
      <div className=" ">
        <PostList />
      </div>
    </div>
  );
};

export default RootPage;
