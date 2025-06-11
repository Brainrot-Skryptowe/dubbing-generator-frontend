import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";

type CreateAudioArgs = {
  reel: ReelData;
  token?: string;
};

type AudioResponse = {
  id: number;
  title: string;
  text: string;
  voice: string;
  language: string;
  speed: number | null;
  created_at: string;
  file_path: string;
  srt: {
    id: number;
    audio_id: number;
    created_at: string;
    file_path: string;
  } | null;
};

export function useCreateAudio() {
  return useMutation<AudioResponse, Error, CreateAudioArgs>({
    mutationFn: async ({ reel, token }: CreateAudioArgs) => {
      const { title, subtitlesText, voice, audioLang, speed } = reel;
      if (!token) throw new Error("Token is missing – user not logged in");

      const body = JSON.stringify({
        title,
        text: subtitlesText,
        voice,
        language: audioLang,
        speed,
      });

      console.log("Creating audio with body:", body);

      const response = await fetch(`${API_BASE_URL}/audios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (!response.ok) {
        const errorMessage =
            (await response.json())?.detail || "Error creating audio";
        throw new Error(errorMessage);
      }

      const audioData: AudioResponse = await response.json();
      console.log(`audio id : ${audioData.id}`);
      return audioData;
    },
  });
}

type CreateAudioTranscriptionArgs = {
  audioId: number;
  transcriptionModel: string;
  token?: string;
};

type AudioTranscriptionResponse = {
  id: number;
  audio_id: number;
  file_path: string;
  created_at: string;
};

export function useCreateAudioTranscription() {
  return useMutation<AudioTranscriptionResponse, Error, CreateAudioTranscriptionArgs>({
    mutationFn: async ({ audioId, transcriptionModel, token }: CreateAudioTranscriptionArgs) => {
      if (!token) throw new Error("Token is missing – user not logged in");

      const body = JSON.stringify({
        audio_id: audioId,
        transcription_model: transcriptionModel,
      });

      console.log("Creating audio transcription with body:", body);

      const response = await fetch(`${API_BASE_URL}/audios/transcribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (!response.ok) {
        const errorMessage =
            (await response.json())?.detail ||
            "Error creating audio transcription";
        throw new Error(errorMessage);
      }

      const data: AudioTranscriptionResponse = await response.json();
      return data;
    },
  });
}
