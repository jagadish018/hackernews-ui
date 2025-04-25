"use client";

import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: { username: string };
};

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/posts/${postId}/comments`
        );
        const data = await res.json();
        if (res.ok) setComments(data.comments);
        else setMessage("❌ Failed to load comments.");
      } catch {
        setMessage("❌ Error fetching comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      {message && <p className="text-red-500">{message}</p>}

      <CommentForm
        postId={postId}
        onSuccess={() => {
          setMessage("✅ Comment added!");
          setTimeout(() => setMessage(""), 2000);
        }}
      />

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
}
