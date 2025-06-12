"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import InputForm from "@/components/input-form";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import NumberInputForm from "@/components/number-input";
import { useReelData } from "@/components/reel-data-provider";
import { useAddToMoviePipelineReel } from "@/hooks/useAddReelToMoviePipeline";
import toast from "react-hot-toast";
import SpinnerOverlay from "@/components/spinner-overlay";

const DEFAULT_VOLUME = 0.2;

export default function CreateReelUploadMovie() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const { setTempMusic, getAudioWithMusic, clearReelData } = useReelData();

  const params = useParams();
  const id = Number(params?.id);

  const { mutate, isPending } = useAddToMoviePipelineReel({
    onSuccess: () => {
      toast.success("Reel created successfully!");
      clearReelData();
      router.push(`/movies/${id}`);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const router = useRouter();

  const [musicTitle, setMusicTitle] = useState<string>("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicVolume, setMusicVolume] = useState<number>(DEFAULT_VOLUME);

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  if (isPending) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="flex flex-col text-white gap-4">
      <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
        Upload music
      </h1>
      <InputForm
        name="Title"
        placeholder="Music 1"
        type="title"
        onChange={setMusicTitle}
        value={musicTitle}
      />

      <FileInput
        onFileSelect={setMusicFile}
        value={musicFile}
        acceptTypes={"audio/wav"}
        label={"Upload WAV"}
      />

      <NumberInputForm
        label="Music volume"
        value={musicVolume}
        onChange={setMusicVolume}
        min={0}
        max={1}
        step={0.1}
      />

      <div className="flex gap-4 mt-4 mb-12">
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={() => {
            setMusicTitle("");
            setMusicFile(null);
            setMusicVolume(DEFAULT_VOLUME);
          }}
        >
          Clear
        </Button>
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
          disabled={isPending}
          onClick={() => {
            if (musicTitle && musicFile) {
              const music = {
                musicFile,
                musicTitle,
                musicVolume,
              };
              setTempMusic(music);
              const audioWithMusic = getAudioWithMusic(music);
              if (audioWithMusic) {
                mutate({ movieId: id, audioWithMusic, token });
              } else {
                toast.error("Something went wrong!");
              }
            } else {
              toast.error("Not enough data!");
            }
          }}
        >
          Add reel
        </Button>
      </div>
    </div>
  );
}
