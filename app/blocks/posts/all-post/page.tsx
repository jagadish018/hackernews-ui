"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostList() {
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Define outside useEffect so it can be passed as prop
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/posts?page=1&limit=20", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      setPosts(data.posts || data);
    } catch  {
      setError( "Something went wrong while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 p-4 mx-auto max-w-7xl">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start ">
            <div className="flex gap-2 items-center">
            

              <Link
                href={`/blocks/posts/${post.id}`}
                className="text-blue-600 hover:underline mt-2 sm:mt-0 inline-block"
              >
                Comment
              </Link>
            </div>

     
           
          </div>
        </div>
      ))}
    </div>
  );
}
