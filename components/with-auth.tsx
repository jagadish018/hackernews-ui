// components/with-auth.tsx
"use client";

import { betterAuthClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const { data: session, error } = await betterAuthClient.getSession();

        if (!session || error) {
          router.push("/sign-in");
        }
      };
      checkAuth();
    }, [router]);

    return <Component {...props} />;
  };
}
