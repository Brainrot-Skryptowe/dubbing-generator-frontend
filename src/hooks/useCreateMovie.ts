import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { MovieData } from "@/components/movie-provider";

type CreateMovieArgs = {
  reel: MovieData;
  token?: string;
};

export function useCreateMovies() {
  return useMutation({
    mutationFn: async ({ reel, token }: CreateMovieArgs) => {
      const { title, description, nativeLang, videoFile } = reel;
      if (!token) throw new Error("Missing auth token");

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
          (await movieRes.json())?.detail || "Error creating movie";
        throw new Error(errorMessage);
      }

      return await movieRes.json();
    },
  });
}
