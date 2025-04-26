export const likePost = async (postId: string) => {
  const res = await fetch(
    `https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io/likes/on/${postId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  return res.json();
};

export const unlikePost = async (postId: string) => {
  const res = await fetch(
    `https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io/likes/on/${postId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  return res.json();
};

export const getLikes = async (postId: string) => {
  const res = await fetch(
    `https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io/likes/on/${postId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return res.json();
};
