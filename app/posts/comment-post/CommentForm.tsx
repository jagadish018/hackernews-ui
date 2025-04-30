"use client";

type CommentFormProps = {
  newComment: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
};

export default function CommentForm({
  newComment,
  onChange,
  onSubmit,
  disabled = false,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <textarea
        value={newComment}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border border-gray-300 rounded p-2 min-h-[100px]"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !newComment.trim()}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Post Comment
      </button>
    </form>
  );
}
