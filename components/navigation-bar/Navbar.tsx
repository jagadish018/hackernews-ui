"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";


const NavBar = () => {
  const { data, refetch } = betterAuthClient.useSession(); // Use refetch to refresh session

  // Trigger session refetch after login or signup
  const handleLogin = async () => {
    await betterAuthClient.signIn.username({
      username: "kabir",
      password: "HelloWorld@123",
    });
    await refetch(); // Refresh the session to update the UI
  };

  const handleSignUp = async () => {
    await betterAuthClient.signUp.email({
      name: "Kabi",
      email: "kabir@gmail.com",
      username: "kabir",
      password: "HelloWorld@123",
    });
    await refetch(); // Refresh the session to update the UI
  };

  const handleSignOut = async () => {
    await betterAuthClient.signOut();
    await refetch(); // Refresh the session to update the UI
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-between">
        <span>Gallium</span>
        {data?.user ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button onClick={handleSignUp}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
