import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

export function useRegister() {
  return useMutation({
    mutationFn: async ({
      email,
      nick,
      password,
    }: {
      email: string;
      nick: string;
      password: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nick }),
      });
      if (!res.ok) {
        const msg = (await res.json())?.detail;
        throw new Error(msg || "Server error");
      }
      return res.json();
    },
  });
}
