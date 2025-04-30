"use client";

import { betterAuthClient } from "@/lib/auth";
import CommentItem from "./CommentItem";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
};

type CommentListProps = {
  comments: Comment[];
  editingCommentId: string | null;
  editContent: string;
  onEdit: (id: string, content: string) => void;
  onEditChange: (value: string) => void;
  onCancel: () => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CommentList({
  comments,
  editingCommentId,
  editContent,
  onEdit,
  onEditChange,
  onCancel,
  onSave,
  onDelete,
}: CommentListProps) {
  const { data: session } = betterAuthClient.useSession();
  const currentUserId = session?.user?.id || "";

  if (comments.length === 0) {
    return (
      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isEditing={editingCommentId === comment.id}
          editContent={editContent}
          onEdit={() => onEdit(comment.id, comment.content)}
          onEditChange={onEditChange}
          onCancel={onCancel}
          onSave={() => onSave(comment.id)}
          onDelete={() => onDelete(comment.id)}
          currentUserId={currentUserId}
          isOwner={comment.user.id === currentUserId}
        />
      ))}
    </div>
  );
}
