import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";

type CreateReelArgs = {
  movieId: number;
  audioId: number;
  musicId?: number;
  musicVolume?: number;
  includeSrt?: boolean;
  token?: string;
};

export function useCreateReels() {
  return useMutation({
    mutationFn: async ({
      movieId,
      audioId,
      musicId,
      musicVolume,
      includeSrt,
      token,
    }: CreateReelArgs) => {
      if (!token) throw new Error("Missing auth token");
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
          (await response.json())?.detail || "Error creating reel";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
  });
}
