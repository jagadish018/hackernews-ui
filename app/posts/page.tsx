"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LikeButton } from "./like-post/LikeButton";
import { DeleteButton } from "./delete-post/DeleteButton";
import { betterAuthClient } from "@/lib/auth";
import { url } from "@/enviroment";
import Link from "next/link";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name?: string;
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    user: {
      id: string;
      username: string;
      name?: string;
    };
  }[];
  likes: {
    id: string;
    createdAt: string;
    userId: string;
    user: {
      id: string;
      username: string;
      name?: string;
    };
  }[];
}

export default function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 5;
  const { data } = betterAuthClient.useSession();
  const currUser = data?.user.id || "";

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/posts?page=${page}&limit=${limit}`, {
        credentials: "include",
      });
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to fetch posts");
      }

      setPosts(responseData.posts || responseData || []);
      setTotalPages(responseData.totalPages || 1);
    } catch {
      setError("Something went wrong while fetching posts");
    } finally {
      setLoading(false);
    }
  }, [page, limit]); // Added dependencies

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, page]); // Added fetchPosts to dependencies

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500">Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 max-w-md px-4">{error}</p>
      </div>
    );

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div
              onClick={() => router.push(`/posts/${post.id}`)}
              className="cursor-pointer mb-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-3 sm:mb-0">
                <span>{new Date(post.createdAt).toLocaleString()}</span>
                <span className="mx-2">•</span>
                <Link
                  href={`/users/profile/${post.author.id}`}
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name || post.author.username}
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/posts/comment-post/${post.id}`);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {post.comments.length} Comments
                </button>

                <LikeButton
                  postId={post.id}
                  currentUserId={currUser}
                 
                />

                <DeleteButton
                  postId={post.id}
                  currentUserId={currUser}
                  postOwnerId={post.author.id}
                  onDelete={fetchPosts}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${
              page <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <div className="text-sm sm:text-base text-gray-600 px-2 sm:px-4">
            Page {page} of {totalPages}
          </div>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${
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
}
