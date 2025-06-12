"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import InputForm from "@/components/input-form";
import { SelectItem } from "@/components/ui/select";
import SelectForm from "@/components/select-form";
import FileInput from "@/components/file-input";
import { useReel } from "@/components/movie-provider";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CreateReelUploadMovie() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const {
    title,
    setTitle,
    description,
    setDescription,
    nativeLang,
    setNativeLang,
    videoFile,
    setVideoFile,
    clearMovieData: clearReel,
  } = useReel();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  return (
    <div className="flex flex-col text-white gap-4">
      <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
        Upload movie
      </h1>
      <InputForm
        name="Title"
        placeholder="Movie 1"
        type="title"
        onChange={setTitle}
        value={title}
      />

      <InputForm
        name="Description"
        placeholder="Fun fact about ..."
        type="description"
        onChange={setDescription}
        value={description}
      />

      <SelectForm
        label="Original language"
        value={nativeLang}
        onChange={setNativeLang}
      >
        <SelectItem value="English">English</SelectItem>
        <SelectItem value="Polish">Polish</SelectItem>
        <SelectItem value="German">German</SelectItem>
        <SelectItem value="Spanish">Spanish</SelectItem>
        <SelectItem value="Italian">Italian</SelectItem>
        <SelectItem value="French">French</SelectItem>
        <SelectItem value="Portuguese">Portuguese</SelectItem>
      </SelectForm>

      <FileInput
        onFileSelect={setVideoFile}
        value={videoFile}
        acceptTypes={"video/mp4"}
        label={"Upload MP4"}
      />

      <div className="flex gap-4 mt-4 mb-12">
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => {
            clearReel();
          }}
        >
          Clear
        </Button>
        <Button
          className="flex-1"
          variant="default"
          onClick={() => {
            if (title && description && videoFile)
              router.push("/create-reel/reels-manager");
            else toast.error("Please fill in all the parameters!");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
