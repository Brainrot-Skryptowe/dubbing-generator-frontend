"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import InputForm from "@/components/input-form";
import FileInput from "@/components/file-input";
import { useReel } from "@/components/movie-provider";
import { Button } from "@/components/ui/button";
import NumberInputForm from "@/components/number-input";

export default function CreateReelUploadMovie() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const {
    // musicTitle,
    // setMusicTitle,
    // musicFile,
    // setMusicFile,
    // musicVolume,
    // setMusicVolume,
    setTempMusic,
    addAudioWithMusic,
  } = useReel();
  const router = useRouter();

  const [musicTitle, setMusicTitle] = useState<string>("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicVolume, setMusicVolume] = useState<number>(0.2);

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

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
            router.back();
          }}
        >
          Back
        </Button>
        <Button
          className="flex-1"
          variant="default"
          onClick={() => {
            setTempMusic({
              musicFile,
              musicTitle,
              musicVolume,
            });
            addAudioWithMusic();
            router.push("/create-reel/reels-manager");
          }}
        >
          Add reel
        </Button>
      </div>
    </div>
  );
}
