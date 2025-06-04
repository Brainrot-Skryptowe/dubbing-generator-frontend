"use client";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import AuthContainer from "@/components/auth-container";
import InputForm from "@/components/input-form";
import ButtonForm from "@/components/button-form";
import LinkForm from "@/components/link-form";
import ErrorWidget from "@/components/error";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const register = useRegister();
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email not given.");
      return;
    }

    if (!nick) {
      setErrorMessage("Nick not given.");
      return;
    }

    if (!password) {
      setErrorMessage("Password not given.");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(
        "Password must be at least 5 characters long and include uppercase, lowercase, and a number.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      const data = await register.mutateAsync({ email, nick, password });
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

  return (
    <div className="flex flex-col items-center gap-4">
      <AuthContainer onSubmit={handleSubmit} title="Sign up">
        <InputForm
          name="Email"
          placeholder="jan.kowalski@gmail.com"
          type="email"
          onChange={setEmail}
        />
        <InputForm
          name="Nick"
          placeholder="jankowalski1234"
          type="text"
          onChange={setNick}
        />
        <InputForm
          name="Password"
          placeholder="Your password..."
          type="password"
          onChange={setPassword}
        />
        <InputForm
          name="Confirm Password"
          placeholder="Repeat your password..."
          type="password"
          onChange={setConfirmPassword}
        />
        <div className="flex flex-col gap-4">
          <ButtonForm
            onClick={() => handleSubmit}
            disabled={register.isPending}
            title="Sign Up"
            type="submit"
          />
          <ButtonForm
            onClick={() => router.push("#")}
            title="Continue with Google"
            imageSrc="/google.png"
            type="button"
          />
          <LinkForm
            href="/login"
            title="Have you already an account? Sign in now!"
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
