"use client";

import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import AuthContainer from "@/components/auth-container";
import InputForm from "@/components/input-form";
import ButtonForm from "@/components/button-form";
import LinkForm from "@/components/link-form";
import ErrorWidget from "@/components/error";
import GoogleAuthButton from "@/components/google-auth-button";
import loading from "@/components/ui/loading";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();
  const router = useRouter();
  const { user, setToken, token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login.mutateAsync({ email, password });
      setToken(data.access_token);
      setIsLoading(true);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error && typeof error.message == "string") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong! Please try again!");
      }
      setPassword("");
    }
  };

  if (isLoading) {
    return loading();
  }

  if (token && user) {
    setIsLoading(true);
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <AuthContainer onSubmit={handleSubmit} title="Sign in">
        <InputForm
          name="Email"
          placeholder="jan.kowalski@gmail.com"
          type="email"
          onChange={setEmail}
        />
        <InputForm
          name="Password"
          placeholder="Your password..."
          type="password"
          onChange={setPassword}
        />
        <div className="flex flex-col gap-4">
          <ButtonForm
            onClick={() => handleSubmit}
            disabled={login.isPending}
            title="Log in"
            type="submit"
          />
          <GoogleAuthButton
            onSuccess={(access_token: string) => {
              setToken(access_token);
              setIsLoading(true);
              router.push("/");
            }}
            onError={() => {
              setErrorMessage("Google authorization failed");
            }}
          />
          <LinkForm
            href="/register"
            title="Dont have an account? Sign up for free!"
          />
        </div>
        {errorMessage && (
          <ErrorWidget
            errorMessage={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </AuthContainer>
    </div>
  );
}
