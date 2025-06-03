import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

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
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    enabled: !!token,
    retry: false,
  });
}
