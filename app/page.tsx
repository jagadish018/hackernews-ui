
import React from 'react'

import PostList from './blocks/posts/all-post/page';
import NavigationBar from '@/components/navigation-bar/Navbar';



const RootPage = () => {
  return (
    <div className=" mx-auto max-w-7xl">
      <NavigationBar />
    <PostList />
    

    
    </div>
  );
};

export default RootPage;
