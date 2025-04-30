"use client";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
};

type CommentItemProps = {
  comment: Comment;
  isEditing: boolean;
  editContent: string;
  onEditChange: (text: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  currentUserId: string;
  isOwner: boolean;
};

export default function CommentItem({
  comment,
  isEditing,
  editContent,
  onEditChange,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  isOwner,
}: CommentItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="whitespace-pre-line">{comment.content}</p>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>
              by {comment.user.username} •{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </span>
            {isOwner && (
              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="text-orange-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
