"use client";

import { serverUrl } from "@/enviroment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { betterAuthClient } from "@/lib/auth";

export default function CreatePost() {
  const { data: session } = betterAuthClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({
    loading: false,
    error: null,
    success: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      router.push(`/login?from=/posts/create-post`);
      return;
    }

    setStatus({ loading: true, error: null, success: null });

    try {
      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      setStatus({
        loading: false,
        error: null,
        success: "Post created successfully!",
      });

      // Reset form and redirect
      setFormData({ title: "", content: "" });
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="What's your post about?"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                required
                minLength={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Share your thoughts..."
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={status.loading}
                className={`px-6 py-2 rounded-md font-medium text-white ${
                  status.loading
                    ? "bg-orange-400"
                    : "bg-orange-500 hover:bg-orange-600"
                } transition-colors`}
              >
                {status.loading ? "Creating..." : "Create Post"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>

            {status.error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {status.error}
              </div>
            )}

            {status.success && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                {status.success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
