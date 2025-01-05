"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export function GoogleLogin() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="w-full"
    >
      <Chrome className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
