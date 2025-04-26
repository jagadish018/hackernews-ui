import React from "react";

import NavigationBar from "@/components/navigation-bar/Navbar";
import PostList from "./posts/page";

const RootPage = () => {
  return (
    <div className=" mx-auto max-w-7xl">
      <NavigationBar />
      <PostList />
    </div>
  );
};

export default RootPage;
