import React from "react";
import PastPosts from "./PastPost";
import NavBar from "@/components/navigation-bar/Navbar";



const page = () => {
  return (
    <>
      <NavBar />
      <PastPosts/>
    </>
  );
};

export default page;
