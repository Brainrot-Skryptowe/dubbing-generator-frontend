"use client";

import { useAuth } from "@/components/AuthProvider";
import InputForm from "@/components/input-form";
import { useReel } from "@/components/movie-provider";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateReelAudio() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const {
    subtitlesText,
    setSubtitlesText,
    voice,
    setVoice,
    audioLang,
    setAudioLang,
  } = useReel();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !user && !token) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  return (
    <div className="flex flex-col text-white gap-4">
      <h1 className="text-2xl w-96 md:w-150 lg:w-216 xl:w-256 font-bold mb-4 text-center">
        Specify audio
      </h1>

      <InputForm
        name="Subtitles text"
        placeholder="Hello! Did you know that ...."
        type="description"
        onChange={setSubtitlesText}
        value={subtitlesText}
      />

      <SelectForm label="Voice" onChange={setVoice} value={voice}>
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

      <SelectForm
        label="Audio language"
        onChange={setAudioLang}
        value={audioLang}
      >
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="esp">Spanish</SelectItem>
        <SelectItem value="fr">French</SelectItem>
        <SelectItem value="itl">Italian</SelectItem>
        <SelectItem value="pr">Portuguese</SelectItem>
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
        <Button
          className="flex-1"
          variant="default"
          //   type="submit"
        >
          Next
        </Button>
      </div>
      {/* </form> */}
    </div>
  );
}
