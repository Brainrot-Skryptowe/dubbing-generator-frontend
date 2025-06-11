"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import InputForm from "@/components/input-form";
import { SelectItem } from "@/components/ui/select";
import SelectForm from "@/components/select-form";
import FileInput from "@/components/file-input";
import { useReel } from "@/components/movie-provider";
import { Button } from "@/components/ui/button";

export default function CreateReelUploadMovie() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const { updateReel } = useReel();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nativeLang, setNativeLang] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateReel({
      title,
      description,
      nativeLang,
      videoFile,
    });

    router.push("/create-reel/audio");
  };

  useEffect(() => {
    if (!isLoadingUser && !user && !token) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
        Upload movie
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputForm
          name="Title"
          placeholder="Movie 1"
          type="title"
          onChange={setTitle}
        />

        <InputForm
          name="Description"
          placeholder="Fun fact about ..."
          type="description"
          onChange={setDescription}
        />

        <SelectForm label="Original language" onChange={setNativeLang}>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pl">Polish</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectForm>

        <FileInput onFileSelect={setVideoFile} />

        <div className="flex gap-4 mt-4 mb-12">
          <Button className="flex-1" variant="outline">
            Clear
          </Button>
          <Button className="flex-1" variant="default" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
