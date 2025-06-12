import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";

type CreateAudioArgs = {
  reel: ReelData;
  token?: string;
};

export function useCreateAudio() {
  return useMutation({
    mutationFn: async ({ reel, token }: CreateAudioArgs) => {
      const { title, subtitlesText, voice, audioLang, speed } = reel;
      if (!token) throw new Error("Missing auth token");
      const body = JSON.stringify({
        title,
        text: subtitlesText,
        voice,
        language: audioLang,
        speed,
      });
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

      return await response.json();
    },
  });
}

export function useCreateAudioTranscription() {
  return useMutation({
    mutationFn: async ({ audioId, transcriptionModel, token }) => {
      if (!token) throw new Error("Missing auth token");
      const body = JSON.stringify({
        audio_id: audioId,
        transcription_model: transcriptionModel,
      });
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

      return await response.json();
    },
  });
}
