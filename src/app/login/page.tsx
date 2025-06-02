"use client";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import AuthContainer from "@/components/auth-container";
import InputForm from "@/components/input-form";
import ButtonForm from "@/components/button-form";
import LinkForm from "@/components/link-form";
import ErrorWidget from "@/components/error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const login = useLogin();
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login.mutateAsync({ email, password });
      setToken(data.access_token);
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

  console.log(errorMessage);

  return (
    <div className="flex flex-col items-center gap-4">
      {errorMessage && (
        <ErrorWidget
          errorMessage={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
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
          <ButtonForm
            onClick={() => router.push("#")}
            title="Continue with Google"
            imageSrc="/google.png"
            type="button"
          />
          <LinkForm
            href="/register"
            title="Dont have an account? Sign up for free!"
          />
        </div>
      </AuthContainer>
    </div>
  );
}
