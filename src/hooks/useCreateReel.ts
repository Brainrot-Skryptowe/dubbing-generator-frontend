import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";

export function useCreateReels() {
  return useMutation({
    mutationFn: async ({
      movieId,
      audioId,
      musicId,
      musicVolume,
      includeSrt,
      token,
    }) => {
      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");
      const response = await fetch(`${API_BASE_URL}/reels/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: movieId,
          audio_id: audioId,
          music_id: musicId,
          music_volume: musicVolume,
          include_srt: includeSrt,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json())?.detail || "Błąd przy tworzeniu rolki";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
  });
}
