"use client";

import { useAuth } from "@/components/AuthProvider";
import { useReel } from "@/components/movie-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreatePipelineReel } from "@/hooks/useCreateReelPipeline";

export default function CreateReelAudio() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const { getReel } = useReel();
  const reel = getReel();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  const { mutate, isPending, error, isSuccess } = useCreatePipelineReel();

  return (
    <>
      <Button
        className="flex-1"
        variant="default"
        disabled={isPending}
        onClick={() => {
          mutate({ reel, token });
        }}
      >
        Submit reel
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-500">{(error as Error).message}</p>
      )}
      {isSuccess && (
        <p className="mt-2 text-sm text-green-500">Film został utworzony 🎉</p>
      )}
    </>
  );
}
