"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import AuthContainer from "@/components/auth-container";
import ButtonForm from "@/components/button-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import loading from "@/components/ui/loading";

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user && !token) {
      router.push("/login");
    }
  }, [isLoading, user, router, token]);

  if (isLoading || !user) return loading();

  return (
    <AuthContainer title={`Welcome, ${user.nick}!`} onSubmit={() => {}}>
      <div className="flex flex-row justify-center items-center mb-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.profile_image_url} alt={user.nick} />
        </Avatar>
      </div>
      <Link href="/browse_movies">
        <h1>Browse movies</h1>
      </Link>
      <ButtonForm
        onClick={() => {
          setToken(undefined);
          router.push("/login");
        }}
        title="Logout"
        type="button"
      />
    </AuthContainer>
  );
}
