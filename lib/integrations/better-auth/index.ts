import { usernameClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const betterAuthClient = createAuthClient({
  baseURL:
    "https://hackernews.agreeablesmoke-a4d23e0d.centralindia.azurecontainerapps.io",
  plugins: [nextCookies(), usernameClient()],
});
