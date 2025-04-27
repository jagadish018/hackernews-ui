// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { betterAuthClient } from "@/lib/auth";
import { withAuth } from "@/components/with-auth";
import { DeleteButton } from "./delete-post/DeleteButton";
import { LikeButton } from "./like-post/LikeButton";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name?: string;
    username?: string;
  };
};

function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session } = betterAuthClient.useSession();
  const currUser = session?.user.id || "";

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://hackernews.agreeablesmoke-a4d23e0d.centralindia.azurecontainerapps.io/posts?page=1&limit=20",
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      setPosts(data.posts || data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while fetching posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="p-4">Loading posts...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-1 p-1 mx-auto max-w-7xl">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-2 rounded cursor-pointer hover:bg-gray-50 transition"
        >
          <div className="flex justify-between items-start">
            <h4
              onClick={() => router.push(`/posts/${post.id}`)}
              className="text-l font-semibold"
            >
              {post.title}
            </h4>
            {post.author && (
              <span className="text-sm text-gray-500">
                by {post.author.username || post.author.name || "Anonymous"}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
            <span
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/comment-post/${post.id}`);
              }}
              className="text-blue-600 hover:underline cursor-pointer text-sm"
            >
              Comment
            </span>
            <div className="w-full sm:w-auto">
              <LikeButton postId={post.id} currentUserId={currUser} />
            </div>
            <DeleteButton
              postId={post.id}
              currentUserId={currUser}
              postOwnerId={post.author.id}
              onDelete={fetchPosts}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default withAuth(PostList);
