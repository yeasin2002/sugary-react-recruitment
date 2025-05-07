"use client";

import { InputCombo, InputComboForPassword } from "@/components/ui/custom";
import Link from "next/link";

import { LoadingIcon } from "@/components/ui/custom/loading";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login(values.username, values.password);
      toast({
        title: "Success",
        description: "You have successfully logged in.",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center max-w-xl mx-auto w-full  p-8 md:p-12 lg:py-16  ">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-center">
        Welcome Back
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Enter your email and password to access your account
      </p>

      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <InputCombo
          labelName="Username"
          register={form.register("username")}
          placeholder="Enter your username"
          error={form.formState.errors.username?.message}
        />
        <InputComboForPassword
          labelName="Password"
          register={form.register("password")}
          error={form.formState.errors.password?.message}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center  mt-9"
        >
          {!isLoading ? "Sign In" : <LoadingIcon />}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {`Don't`} have an account?
          <Link
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

/*
Demo credentials helper 
<div className="text-center text-sm text-muted-foreground mt-4">
<p>Demo credentials:</p>
<p>Email: react@test.com</p>
<p>Password: playful009</p>
</div>
*/
