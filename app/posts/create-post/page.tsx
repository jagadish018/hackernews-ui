import React from "react";
import CreatePost from "./CreatePost";
import { Navbar } from "@/components/navigation-bar/Navbar";



const page = () => {
  return (
    <>
      <Navbar />
      <CreatePost />
    </>
  );
};

export default page;
