"use client";

import { useAuth } from "@/components/AuthProvider";
import InputForm from "@/components/input-form";
import { useReel } from "@/components/movie-provider";
import NumberInputForm from "@/components/number-input";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { VOICE_OPTIONS } from "@/config/constants";
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
    speed,
    setSpeed,
    transcriptionModel,
    setTranscriptionModel,
  } = useReel();
  const router = useRouter();
  const filteredVoices = VOICE_OPTIONS[audioLang] || [];

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
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

      <SelectForm
        label="Audio language"
        onChange={setAudioLang}
        value={audioLang}
      >
        <SelectItem value="a">English</SelectItem>
        <SelectItem value="e">Spanish</SelectItem>
        <SelectItem value="f">French</SelectItem>
        <SelectItem value="i">Italian</SelectItem>
        <SelectItem value="p">Portuguese</SelectItem>
      </SelectForm>

      <SelectForm
        label="Voice"
        onChange={setVoice}
        value={voice}
        disabled={!audioLang}
      >
        {filteredVoices.map((voiceOption) => (
          <SelectItem key={voiceOption.value} value={voiceOption.value}>
            {voiceOption.label}
          </SelectItem>
        ))}
      </SelectForm>

      <NumberInputForm
        label="Speed"
        value={speed}
        onChange={setSpeed}
        min={0}
        max={1}
        step={0.1}
      />

      <SelectForm
        label="Transcription model"
        onChange={setTranscriptionModel}
        value={transcriptionModel}
      >
        <SelectItem value="tiny">tiny</SelectItem>
        <SelectItem value="base">base</SelectItem>
        <SelectItem value="small">small</SelectItem>
        <SelectItem value="medium">medium</SelectItem>
        <SelectItem value="turbo">turbo</SelectItem>
        <SelectItem value="large">large</SelectItem>
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
          onClick={() => router.push("/create-reel/submit-reel/")}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
