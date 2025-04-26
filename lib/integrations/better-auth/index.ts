import { usernameClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const betterAuthClient = createAuthClient({
  baseURL:"https://hackernews.mangohill-f34a947a.centralindia.azurecontainerapps.io",
  plugins: [nextCookies(), usernameClient()],
});
