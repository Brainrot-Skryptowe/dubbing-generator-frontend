import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";

type CreateMusicArgs = {
  reel: ReelData;
  token?: string;
};

type CreateMusicResponse = {
  id: number;
  title: string;
  file_path: string;
  duration: number;
  type: string;
  author: number;
  created_at: string;
};

export function useCreateMusic() {
  return useMutation<CreateMusicResponse, Error, CreateMusicArgs>({
    mutationFn: async ({ reel, token }: CreateMusicArgs) => {
      const { musicTitle, musicFile } = reel;
      if (!token) throw new Error("Token is missing – user not logged in");

      const formData = new FormData();
      formData.append("title", musicTitle);
      if (musicFile) {
        formData.append("music_file", musicFile);
      }

      const musicRes = await fetch(`${API_BASE_URL}/music/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!musicRes.ok) {
        const errorMessage =
            (await musicRes.json())?.detail || "Error creating music";
        throw new Error(errorMessage);
      }

      const musicData: CreateMusicResponse = await musicRes.json();
      return musicData;
    },
  });
}
