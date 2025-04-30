"use client";

import { useState, useEffect, useCallback } from "react";
import { likePost, unlikePost, getLikes } from "./api";
import { SlLike, SlDislike } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { betterAuthClient } from "@/lib/auth";

type Props = {
  postId: string;
  currentUserId: string;
  onLikeChange?: () => void;
};

export const LikeButton = ({ postId, currentUserId, onLikeChange }: Props) => {
  const router = useRouter();
  const [likes, setLikes] = useState<Array<{ id: string; userId: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = betterAuthClient.useSession();

  const liked = likes.some((like) => like.userId === currentUserId);
  const likeCount = likes.length;

  const fetchLikes = useCallback(async () => {
    try {
      const result = await getLikes(postId);
      if (result.status === "SUCCESS") {
        setLikes(result.likes || []);
      } else {
        setError(result.message || "Failed to fetch likes");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Fetch likes error:", err);
    }

  }, [postId]);
  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLikeAction = async () => {
    if (!session?.user) {
      router.push(`/login?from=/posts/${postId}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (liked) {
        const result = await unlikePost(postId);
        if (result.status !== "SUCCESS") {
          throw new Error(result.message || "Failed to unlike");
        }
      } else {
        const result = await likePost(postId);
        if (result.status !== "SUCCESS") {
          throw new Error(result.message || "Failed to like");
        }
      }
      await fetchLikes();
      onLikeChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
      console.error("Like action error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLikeAction}
        disabled={loading}
        className={`p-1 rounded-full transition-colors ${
          liked
            ? "text-blue-500 hover:bg-blue-50"
            : "text-gray-500 hover:bg-gray-100"
        }`}
        aria-label={liked ? "Unlike post" : "Like post"}
      >
        {liked ? (
          <SlDislike size={16} className="fill-current" />
        ) : (
          <SlLike size={16} className="fill-current" />
        )}
      </button>
      <span className="text-sm text-gray-600 min-w-[20px] text-center">
        {likeCount}
      </span>
      {error && (
        <span className="text-xs text-red-500 ml-2" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
