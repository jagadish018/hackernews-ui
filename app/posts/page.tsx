"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LikeButton } from "./like-post/LikeButton";

import { DeleteButton } from "./delete-post/DeleteButton";
import { betterAuthClient } from "@/lib/auth";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
  };
};

export default function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data } = betterAuthClient.useSession();
  const currUser = data?.user.id || "";

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
    <div className="space-y-1 p-1 mx-auto max-w-7xl">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-2 rounded  cursor-pointer hover:bg-gray-50 transition"
        >
          <h4
            onClick={() => router.push(`/posts/${post.id}`)}
            className="text-l font-semibold"
          >
            {post.title}
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent outer click
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
