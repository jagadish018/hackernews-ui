"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LikeButton } from "./like-post/LikeButton";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { DeleteButton } from "./delete-post/DeleteButton";

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
          onClick={() => {
            // no navigation for now, just keeping the click disabled
          }}
          className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering the div click
                router.push(`/posts/comment-post/${post.id}`);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
            >
              Comment
            </button>
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
