import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

export function useUserDetails(token?: string) {
  return useQuery({
    queryKey: ["userDetails", token],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    enabled: !!token,
    retry: false,
  });
}
