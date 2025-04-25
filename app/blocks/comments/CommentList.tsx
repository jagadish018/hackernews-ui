export default function CommentList({
  comments,
}: {
  comments: { id: string; content: string; user: { username: string } }[];
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border p-3 rounded">
          <p>{comment.content}</p>
          <p className="text-xs text-gray-500">By {comment.user.username}</p>
        </div>
      ))}
    </div>
  );
}
