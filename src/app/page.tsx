"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import AuthContainer from "@/components/auth-container";
import ButtonForm from "@/components/button-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Page() {
  const { user, isLoading, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Redirecting to login...</h1>
      </div>
    );
  }

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
