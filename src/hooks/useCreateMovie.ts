import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";

type CreateMovieArgs = {
  reel: ReelData;
  token?: string;
};

export function useCreateMovies() {
  return useMutation({
    mutationFn: async ({ reel, token }: CreateMovieArgs) => {
      console.log("reel:", reel);
      const { title, description, nativeLang, videoFile } = reel;

      console.log("token:", token);
      console.log("reel:", reel);

      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("native_lang", nativeLang);
      if (videoFile) formData.append("movie_file", videoFile);

      const movieRes = await fetch(`${API_BASE_URL}/movies/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!movieRes.ok) {
        const errorMessage =
          (await movieRes.json())?.detail || "Błąd przy tworzeniu filmu";
        throw new Error(errorMessage);
      }

      return await movieRes.json();
    },
  });
}
