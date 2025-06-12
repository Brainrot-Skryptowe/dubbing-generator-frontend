"use client";

import { useAuth } from "@/components/AuthProvider";
import InputForm from "@/components/input-form";
import NumberInputForm from "@/components/number-input";
import { useReelData } from "@/components/reel-data-provider";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { VOICE_OPTIONS } from "@/config/constants";
import { useTextGenerator } from "@/hooks/useAi";
import { PencilLine } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_SPEED = 1.0;
const DEFAULT_TRANSCRIPTION_MODEL = "tiny";

export default function MovieDetails() {
  const { user, isLoading: isLoadingUser, token } = useAuth();

  const params = useParams();
  const id = Number(params?.id);

  const { setTempAudio } = useReelData();
  const { mutateAsync: generateText } = useTextGenerator();
  const [subtitlesText, setSubtitlesText] = useState("");
  const [voice, setVoice] = useState("");
  const [audioLang, setAudioLang] = useState("");
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [transcriptionModel, setTranscriptionModel] = useState(
    DEFAULT_TRANSCRIPTION_MODEL
  );
  const [showDurationInput, setShowDurationInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState<number | undefined>(undefined);

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

      <div
        className={`relative transition-all ${!audioLang ? "opacity-50 pointer-events-none" : ""}`}
      >
        <InputForm
          name="Audio text"
          placeholder="Hello! Did you know that ...."
          type="description"
          onChange={setSubtitlesText}
          value={subtitlesText}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          onClick={() => setShowDurationInput(!showDurationInput)}
          disabled={isGenerating}
        >
          <PencilLine className="w-5 h-5 text-yellow-400" />
        </Button>

        {showDurationInput && (
          <div className="mt-4 flex flex-col gap-2">
            <NumberInputForm
              label="Target duration (sec)"
              value={duration}
              onChange={setDuration}
              min={1}
              max={120}
              step={1}
            />
            <Button
              type="button"
              variant="default"
              onClick={async () => {
                if (!duration || !audioLang) return;
                try {
                  setIsGenerating(true);
                  console.log(
                    "Generating text with duration:",
                    duration,
                    "and audioLang:",
                    audioLang
                  );
                  const result = await generateText({
                    description: subtitlesText,
                    duration: duration,
                    target_lang: audioLang,
                    token: token,
                  });
                  setSubtitlesText(result.text);
                } catch (e) {
                  console.error("Error:", e);
                } finally {
                  setIsGenerating(false);
                }
              }}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        )}
      </div>

      {!audioLang && (
        <p className="text-red-400 text-sm italic mt-1">
          Please select audio language first.
        </p>
      )}

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
        max={5}
        step={0.1}
      />

      <SelectForm
        label="Transcription model"
        onChange={setTranscriptionModel}
        value={transcriptionModel}
      >
        <SelectItem value="none">None</SelectItem>
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
            setSubtitlesText("");
            setVoice("");
            setAudioLang("");
            setSpeed(DEFAULT_SPEED);
            setTranscriptionModel(DEFAULT_TRANSCRIPTION_MODEL);
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
          onClick={() => {
            if (subtitlesText != "" && voice != "" && audioLang != "") {
              setTempAudio({
                subtitlesText,
                voice,
                audioLang,
                speed,
                transcriptionModel,
              });
              router.push(`/add-music-to-reel/${id}`);
            } else {
              toast.error("Please fill in all the parameters!");
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
