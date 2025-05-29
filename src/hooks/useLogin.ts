import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const msg = (await res.json())?.detail;
        throw new Error(msg || "Server error");
      }
      return res.json();
    },
  });
}
