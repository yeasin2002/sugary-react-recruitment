"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, status } = useAuth();
  const router = useRouter();

  if (status !== "unauthenticated") {
    router.push("/dashboard");
  }

  return <div>{children}</div>;
};
