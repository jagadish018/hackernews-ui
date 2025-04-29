"use client";
import { url } from "@/enviroment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name?: string;
  };
}

const PastPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${url}/posts/past?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPages(data.totalPages || 1);
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
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <h2 className="text-xl font-semibold mb-6">Posts (Yesterday)</h2>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <div className="mt-3 text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleString()}</span>
              <span className="mx-2">•</span>
              <Link
                href={`/users/profile/${post.author.id}`}
                className="hover:text-blue-600 hover:underline"
              >
                {post.author.name || post.author.username}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="flex gap-4 bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-md transition-colors ${
              page <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center px-4 text-gray-600">
            Page {page} of {totalPages}
          </div>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-md transition-colors ${
              page >= totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastPosts;
