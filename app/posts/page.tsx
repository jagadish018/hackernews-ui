"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch {
      setError("Something went wrong while fetching posts");
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
        <div
          key={post.id}
          onClick={() => router.push(`/posts/${post.id}`)}
          className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents navigation on comment button click
              router.push(`/blocks/comments`);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Comment
          </button>
        </div>
      ))}
    </div>
  );
}
