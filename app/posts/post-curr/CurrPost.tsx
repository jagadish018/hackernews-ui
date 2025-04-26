// components/PostList.tsx

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function CurrPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
     const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io/posts/me`,
          {
            credentials: "include",
          }
        );

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
     
    <>
      <div className="space-y-1 p-4 mx-auto max-w-7xl">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2
              className="text-l font-semibold cursor-pointer"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              {post.title}
            </h2>
           
          </div>
        ))}
      </div>
    </>
  );
}
