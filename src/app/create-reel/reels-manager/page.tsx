"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReelsManager() {
  const { user, isLoading: isLoadingUser, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  return (
    <div className="flex flex-col text-white items-center gap-4">
      <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
        Add reels
      </h1>

      <p className="mt-4">Generated reels: 4</p>
      <Button
        className="w-128 p-6"
        variant="default"
        onClick={() => router.push("/create-reel/audio/")}
      >
        Add reel
      </Button>
      <div className="flex gap-4 mt-16 mb-12 w-100 md:w-128 lg:w-196">
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button
          className="flex-1"
          variant="default"
          onClick={() => router.push("/create-reel/submit-reel/")}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
