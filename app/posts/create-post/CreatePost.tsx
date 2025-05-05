"use client";

import { serverUrl } from "@/enviroment";
import { betterAuthClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreatePost() {
  const { data: session, isPending } = betterAuthClient.useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login"); // Redirect if unauthenticated
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setTitle("");
        setContent("");
        setMessage("Post created successfully!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage(`Error: ${data.error || "Failed to create post"}`);
      }
    } catch {
      setMessage("Error: Network error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <p className="p-4">Checking authentication...</p>;
  }

  if (!session) return null; // Avoid flicker

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
           {" "}
      <div className="max-w-5xl mx-auto">
               {" "}
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                   {" "}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Create New Post          {" "}
          </h1>
                   {" "}
          <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title input */}            {/* Content input */}   
                    {/* Submit and Cancel buttons */}         {" "}
          </form>
                   {" "}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
                            {message}           {" "}
            </div>
          )}
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}
