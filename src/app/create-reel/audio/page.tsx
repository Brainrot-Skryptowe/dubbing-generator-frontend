"use client";

import { useAuth } from "@/components/AuthProvider";
import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateReelAudio() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const router = useRouter();

  const [subtitlesText, setSubtitles] = useState("");
  const [voice, setVoice] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    console.log(subtitlesText);
    console.log(voice);
    console.log(language);
    console.log(e);
  };

  useEffect(() => {
    if (!isLoadingUser && !user && !token) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  return (
    <div className="flex flex-col text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
          Specify audio
        </h1>

        <InputForm
          name="Subtitles text"
          placeholder="Hello! Did you know that ...."
          type="description"
          onChange={setSubtitles}
        />

        <SelectForm label="Original voice" onChange={setVoice}>
          <SelectItem value="af">English (af)</SelectItem>
          <SelectItem value="am">English (am)</SelectItem>
          <SelectItem value="bf">English (bf)</SelectItem>
          <SelectItem value="bm">English (bm)</SelectItem>
          <SelectItem value="ef">Spanish (ef)</SelectItem>
          <SelectItem value="em">Spanish (em)</SelectItem>
          <SelectItem value="ff">French (ff)</SelectItem>
          <SelectItem value="if">Italian (if)</SelectItem>
          <SelectItem value="im">Italian (im)</SelectItem>
          <SelectItem value="pf">Portuguese (pf)</SelectItem>
          <SelectItem value="pm">Portuguese (pm)</SelectItem>
        </SelectForm>

        <SelectForm label="Language" onChange={setLanguage}>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pl">Polish</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectForm>

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
          <Button className="flex-1" variant="default" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
