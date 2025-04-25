// components/PostList.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostByID() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch posts");
        } else {
          setPosts(data.posts || data); 
        }
      } catch {
        setError("Something went wrong while fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 p-4 mx-auto max-w-7xl">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p>
            <Link
              href={`/blocks/posts/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              Comment
            </Link>
            <div className="flex items-center gap-4">
           
            </div>
          </p>
        </div>
      ))}
    </div>
  );
}
