"use client";

import { serverUrl } from "@/enviroment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { betterAuthClient } from "@/lib/auth";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
}

export default function NewPosts() {
  const router = useRouter();
  const { data: session } = betterAuthClient.useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${serverUrl}/posts/new?page=${page}&limit=${limit}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            router.push(`/login?from=/posts/new-post`);
            return;
          }
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data.posts || []);
        setHasMore(data.posts?.length === limit);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, session, router]);

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p>
          Please{" "}
          <a href={`/login?from=/posts/new-post`} className="text-orange-500">
            login
          </a>{" "}
          to view new posts
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <h2 className="text-xl font-semibold mb-6">New Posts</h2>

      {loading && page === 1 ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No new posts found</p>
      ) : (
        <>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <Link href={`/posts/${post.id}`} className="block">
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700 line-clamp-2">{post.content}</p>
                  <div className="mt-3 text-sm text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span className="hover:text-orange-500 hover:underline">
                      {post.author.username}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore || loading}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
