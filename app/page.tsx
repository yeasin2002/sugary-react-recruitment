"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  const { user, status } = useAuth();

  if (user && status === "authenticated") {
    return push("/dashboard");
  } else {
    return push("/login");
  }
}
