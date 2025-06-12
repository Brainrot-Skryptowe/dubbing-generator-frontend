import { API_BASE_URL } from "@/config/constants";
import { MovieWithReels } from "@/types/movie-with-reels";
import { useQuery } from "@tanstack/react-query";

export function useMovies(sortBy: string, sortDir: string, token?: string) {
  return useQuery({
    queryKey: ["userMovies", token, sortBy, sortDir],
    queryFn: async () => {
      const res = await fetch(
        `${API_BASE_URL}/movies/?sort_by=${sortBy}&sort_dir=${sortDir}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      if (!res.ok) throw new Error("Error fetching movies");
      return res.json();
    },
    enabled: !!token,
    retry: false,
  });
}

export function useMovieWithReels(id: string | number, token?: string) {
  return useQuery<MovieWithReels>({
    queryKey: ["movieWithReels", id, token],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Error fetching movie with reels");
      return res.json();
    },
    enabled: !!token && !!id,
    retry: false,
  });
}
