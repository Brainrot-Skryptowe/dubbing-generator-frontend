"use client";

import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "./button";

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
          <img
            src={user.profile_image_url}
            alt="User avatar"
            className="h-28 w-28 rounded-full"
          />

          <div className="ml-8 md:ml-12">
            <h1 className="text-2xl font-bold">{user.nick}</h1>
            <h2 className="mt-2">{user.email}</h2>
          </div>
        </div>

        <Button
          onClick={() => {
            setToken(undefined);
            router.push("/login");
          }}
          className="bg-transparent hover:bg-transparent mt-4 md:mt-0 md:ml-auto text-red-300 hover:text-red-400"
        >
          <h1>Logout</h1>
        </Button>
      </nav>
      <hr className="border-t border-gray-600 mb-12" />
    </div>
  );
}
