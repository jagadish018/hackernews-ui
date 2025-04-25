"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(""); // To show success or error message
  const router = useRouter(); // Move router hook here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      credentials: "include", // important for cookies/session
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setTitle(""); // Clear the title input field
      setContent(""); // Clear the content textarea
   
      // Redirect to the home page after a successful submission
      router.push("/"); // This will take the user to the homepage
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="space-y-4 p-4 mx-auto max-w-7xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-24"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Post
        </button>
      </form>

      {message && (
        <div
          className={`p-2 mt-4 ${
            message.includes("Error") 
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
