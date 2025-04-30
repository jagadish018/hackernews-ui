"use client";

import { serverUrl } from "@/enviroment";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { betterAuthClient } from "@/lib/auth";

type DeleteButtonProps = {
  postId: string;
  postOwnerId: string;
  onDelete?: () => void;
};

export const DeleteButton = ({
  postId,
  postOwnerId,
  onDelete,
}: DeleteButtonProps) => {
  const { data: session } = betterAuthClient.useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!session?.user) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${serverUrl}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete post");
      }

      onDelete?.();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.id !== postOwnerId) return null;

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={loading}
        aria-label="Delete post"
        className="flex items-center gap-1 text-red-600 hover:text-red-800 disabled:opacity-50"
      >
        <MdDelete size={18} />
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
