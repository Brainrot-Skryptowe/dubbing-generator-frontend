"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";

export default function NavBar() {
  const { user, isLoading, setToken } = useAuth();
  const router = useRouter();

  if (!user || isLoading) {
    return null;
  }

  return (
    <div>
      <nav className="text-white flex flex-col md:flex-row items-center gap-4 py-6 md:mx-24 lg:mx-36 xl:mx-64">
        <div className="flex items-center">
          <Image
            width={112}
            height={112}
            src={user.profile_image_url}
            alt="User avatar"
            className="h-28 w-28 rounded-full"
          />

          <div className="ml-8 md:ml-12">
            <h1 className="text-2xl font-bold">{user.nick}</h1>
            <h2 className="mt-2">{user.email}</h2>
          </div>
        </div>

        <div className="flex mt-4 md:mt-0 md:ml-auto gap-4">
          <Button
            onClick={() => router.push("/")}
            className="bg-transparent hover:bg-transparent text-white hover:text-gray-300"
          >
            <h1>Home</h1>
          </Button>

          <Button
            onClick={() => router.push("/create-reel/upload-movie/")}
            className="bg-transparent hover:bg-transparent text-white hover:text-gray-300"
          >
            <h1>Create reel</h1>
          </Button>

          <Button
            onClick={() => {
              setToken(undefined);
              router.push("/login");
            }}
            className="bg-transparent hover:bg-transparent text-red-300 hover:text-red-400"
          >
            <h1>Logout</h1>
          </Button>
        </div>
      </nav>
      <hr className="border-t border-gray-600 mb-8" />
    </div>
  );
}
