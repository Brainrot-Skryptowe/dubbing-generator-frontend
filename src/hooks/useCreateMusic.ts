import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { TempMusic } from "@/types/temp-music";

type CreateMusicArgs = {
  tempMusic: TempMusic;
  token?: string;
};

export function useCreateMusic() {
  return useMutation({
    mutationFn: async ({ tempMusic, token }: CreateMusicArgs) => {
      const { musicTitle, musicFile } = tempMusic;
      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");

      const formData = new FormData();
      formData.append("title", musicTitle);
      if (musicFile) formData.append("music_file", musicFile);

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

      const musicData = await musicRes.json();
      return musicData;
    },
  });
}
