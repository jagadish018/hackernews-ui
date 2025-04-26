"use client";
import React, { useEffect, useState } from "react";

// Post Type
type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
};

// NewPosts Component
const NewPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io/posts/new?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          setError(data.error || "Failed to fetch posts");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <div className="mx-auto max-w-7xl ">
      <h2 className="text-xl font-semibold mb-4 max-w-7xl mx-auto">New Posts (Today)</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">By {post.author.username}</p>
            <p className="text-sm">{post.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Default export of NewPosts component for the page
export default NewPosts;
