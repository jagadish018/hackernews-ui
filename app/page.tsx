
import React from 'react'
import NavigationBar from '../components/navigation-bar/NavigationBar';
import PostList from './blocks/posts/all-post/page';


const RootPage = () => {
  return (
    <div>
      <NavigationBar />
      <PostList />
    </div>
  );
};

export default RootPage;
