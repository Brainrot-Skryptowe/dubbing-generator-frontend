import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";

type CreateReelArgs = {
  movieId: number;
  audioId: number;
  musicId: number;
  musicVolume: number;
  includeSrt: boolean;
  token: string;
};

type CreateReelResponse = {
  id: number;
  file_path: string;
  created_at: string;
};

export function useCreateReels() {
  return useMutation<CreateReelResponse, Error, CreateReelArgs>({
    mutationFn: async ({
      movieId,
      audioId,
      musicId,
      musicVolume,
      includeSrt,
      token,
    }) => {
      if (!token) throw new Error("Token is missing – user not logged in");

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

      const result: CreateReelResponse = await response.json();
      return result;
    },
  });
}
