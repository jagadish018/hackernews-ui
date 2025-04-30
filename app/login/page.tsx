import { Suspense } from "react";
import LoginForm from "./LoginForm";
import NavigationBar from "@/components/navigation-bar/NavigationBar";

export default function LoginPage() {
  return (
    <>
      <NavigationBar hideNavItems />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
