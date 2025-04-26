import React from "react";


import PostList from "./posts/page";
import NavBar from "@/components/navigation-bar/Navbar";
import LoginPage from "@/components/navigation-bar/Login";

const RootPage = () => {
  return (
    <div className=" mx-auto max-w-7xl  bg-[#F6F6EF] h-screen">
      <NavBar />
      <LoginPage />
      <div className=" ">
        <PostList />
      </div>
    </div>
  );
};

export default RootPage;
