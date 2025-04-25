type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
  Comment: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      username: string;
    };
  }[];
};

type tParams = Promise<{ id: string }>;

export default async function PostDetail(props: { params: tParams }) {
  const res = await fetch(
    `http://localhost:3000/posts/${(await props.params).id}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
      </div>
    );
  }

  const data = await res.json();
  const post: Post = data.post;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600 text-sm">
        by {post.author.username} •{new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-lg">{post.content}</p>
      <hr className="my-6" />
      <h2 className="text-2xl font-semibold">Comments</h2>
      <div className="space-y-4">
        {post.Comment.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}
        {post.Comment.map((comment) => (
          <div key={comment.id} className="border rounded p-4">
            <p className="font-medium">{comment.user.username}</p>
            <p>{comment.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
