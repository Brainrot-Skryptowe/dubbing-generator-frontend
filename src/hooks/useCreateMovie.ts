import { API_BASE_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";

type CreateMovieArgs = {
  reel: ReelData;
  token?: string;
};

type Srt = {
  id: number;
  audio_id: number;
  created_at: string;
  file_path: string;
};

type Audio = {
  id: number;
  title: string;
  text: string;
  voice: string;
  language: string;
  speed: number | null;
  file_path: string;
  created_at: string;
  srt: Srt | null;
};

type Reel = {
  id: number;
  lang: string;
  file_path: string | null;
  movie_id: number;
  author: number;
  audio: Audio | null;
};

type CreateMovieResponse = {
  id: number;
  title: string;
  description: string | null;
  native_lang: string | null;
  created_at: string;
  author: number;
  type: string | null;
  duration: number | null;
  file_path: string | null;
  thumbnail_path: string | null;
  reels: Reel[];
};

export function useCreateMovies() {
  return useMutation<CreateMovieResponse, Error, CreateMovieArgs>({
    mutationFn: async ({ reel, token }: CreateMovieArgs) => {
      const { title, description, nativeLang, videoFile } = reel;

      if (!token) throw new Error("Token is missing – user not logged in");

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

      const result: CreateMovieResponse = await movieRes.json();
      return result;
    },
  });
}
