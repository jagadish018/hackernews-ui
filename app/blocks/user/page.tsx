"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string | null;
  email: string;
};

export default function UserMe() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          "https://hackernews.agreeablesmoke-a4d23e0d.centralindia.azurecontainerapps.io/users/me",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "User not found");
        } else {
          setUser(data.user);
        }
      } catch {
        setError("Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <h4 className=" ">
      <p>
        
        {user?.name || "No Name"}
      </p>
    </h4>
  );
}
