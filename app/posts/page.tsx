"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LikeButton } from "./like-post/LikeButton";
import { DeleteButton } from "./delete-post/DeleteButton";
import { betterAuthClient } from "@/lib/auth";
import { serverUrl } from "@/enviroment";
import Link from "next/link";

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
  comments?: {
    id: string;
    userId: string;
  }[];
  likes?: {
    id: string;
    userId: string;
  }[];
}

interface ApiResponse {
  posts: Post[];
  total: number;
  hasMore: boolean;
}

export default function PostList() {
  const router = useRouter();
  const { data: session } = betterAuthClient.useSession();
  const [state, setState] = useState<{
    posts: Post[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
  }>({
    posts: [],
    loading: true,
    error: null,
    page: 1,
    hasMore: true,
  });

  const limit = 10;

  const fetchPosts = useCallback(async () => {
    if (!session?.user) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const res = await fetch(
        `${serverUrl}/posts?page=${state.page}&limit=${limit}`,
        {
          credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        router.push(`/login?from=/posts?page=${state.page}`);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
      }

      const data: ApiResponse = await res.json();
      setState((prev) => ({
        ...prev,
        posts: data.posts,
        loading: false,
        hasMore: data.hasMore,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch posts",
      }));
    }
  }, [state.page, session, router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePageChange = (newPage: number) => {
    setState((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center">
          Please{" "}
          <a href={`/login?from=/posts`} className="text-blue-600">
            login
          </a>{" "}
          to view posts
        </p>
      </div>
    );
  }

  if (state.loading && state.page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-4 bg-red-50 text-red-700 rounded">
          <p className="text-center">{state.error}</p>
          <button
            onClick={fetchPosts}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!state.posts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500">No posts found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {state.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              onClick={() => router.push(`/posts/${post.id}`)}
              className="p-4 cursor-pointer"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-sm text-gray-500">
                <span>{new Date(post.createdAt).toLocaleString()}</span>
                <span className="mx-2">•</span>
                <Link
                  href={`/users/profile/${post.author.id}`}
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author?.name || post.author?.username}
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
                  Comments ({post.comments?.length || 0})
                </button>

                <LikeButton
                  postId={post.id}
                  currentUserId={session.user.id}
                  onLikeChange={fetchPosts}
                />

                {post.author?.id === session.user.id && (
                  <DeleteButton
                    postId={post.id}
                    postOwnerId={post.author.id}
                    onDelete={fetchPosts}
                  />
                )}
              </div>
            </div>
          </article>

        ))}      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => handlePageChange(state.page - 1)}
          disabled={state.page === 1 || state.loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{state.page}</span>
        <button
          onClick={() => handlePageChange(state.page + 1)}
          disabled={!state.hasMore || state.loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
