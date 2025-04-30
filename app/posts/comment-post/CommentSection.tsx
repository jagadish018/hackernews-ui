"use client";

import { useEffect, useState, useCallback } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { serverUrl } from "@/enviroment";
import { betterAuthClient } from "@/lib/auth";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
};

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session } = betterAuthClient.useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${serverUrl}/comments/on/${postId}`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments || []);
      } else {
        setError(data.message || "Failed to load comments");
      }
    } catch  {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      const res = await fetch(`${serverUrl}/comments/on/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch {
      setError("Network error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`${serverUrl}/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        fetchComments();
      } else {
        setError("Failed to delete comment");
      }
    } catch  {
      setError("Network error occurred");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`${serverUrl}/comments/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setEditingCommentId(null);
        fetchComments();
      } else {
        setError("Failed to update comment");
      }
    } catch {
      setError("Network error occurred");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      {session?.user ? (
        <CommentForm
          newComment={newComment}
          onChange={setNewComment}
          onSubmit={handleSubmit}
        />
      ) : (
        <p className="mb-4 text-gray-500">
          Please{" "}
          <a href={`/login?from=/posts/${postId}`} className="text-orange-500">
            login
          </a>{" "}
          to comment
        </p>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <CommentList
          comments={comments}
          editingCommentId={editingCommentId}
          editContent={editContent}
          onEdit={(id, content) => {
            setEditingCommentId(id);
            setEditContent(content);
          }}
          onEditChange={setEditContent}
          onCancel={() => setEditingCommentId(null)}
          onSave={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
