"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navigation-bar/Navbar";


type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  Comment: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      username: string;
    };
  }[];
};

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${postId}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load post");
        } else {
          setPost(data.post);
        }
      } catch {
        setError("Error fetching post");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <NavBar />
      <div className="p-4 mx-auto max-w-7xl ">
        <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
        <p className="mb-4">{post?.content}</p>
        <p className="text-sm text-gray-600">By {post?.author.username}</p>

        <h2 className="mt-6 text-xl font-semibold">
       
        </h2>
      </div>
    </>
  );
}
