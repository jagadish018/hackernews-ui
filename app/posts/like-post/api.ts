export const likePost = async (postId: string) => {
  const res = await fetch(`http://localhost:3000/likes/on/${postId}`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export const unlikePost = async (postId: string) => {
  const res = await fetch(`http://localhost:3000/likes/on/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};

export const getLikes = async (postId: string) => {
  const res = await fetch(
    `http://localhost:3000/likes/on/${postId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return res.json();
};
