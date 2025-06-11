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
      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");
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
          (await response.json())?.detail || "Błąd przy tworzeniu audio";
        throw new Error(errorMessage);
      }

      const audioData = await response.json();
      console.log(`audio id : ${audioData.id}`);
      return audioData;
    },
  });
}

export function useCreateAudioTranscription() {
  return useMutation({
    mutationFn: async ({ audioId, transcriptionModel, token }) => {
      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");
      const body = JSON.stringify({
        audio_id: audioId,
        transcription_model: transcriptionModel,
      });
      console.log("Creating audio transcript with body:", body);
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
          "Błąd przy tworzeniu transkrypcji audio";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
  });
}
