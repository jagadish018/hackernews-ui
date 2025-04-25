import React from "react";
import NewPosts from "./NewPost";
import Navbar from "@/components/navigation-bar/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <NewPosts />
    </>
  );
};

export default page;
