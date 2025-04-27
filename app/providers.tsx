"use client";

import { betterAuthClient } from "@/lib/auth";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";


export function Providers(props:PropsWithChildren) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={betterAuthClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
    >
      {props.children}
    </AuthUIProvider>
  );
}
