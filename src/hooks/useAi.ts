import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

type TextGenerator = {
  description: string;
  duration: number;
  target_lang: string;
  token: string | undefined;
};

export function useTextGenerator() {
  return useMutation({
    mutationFn: async ({
      description,
      duration,
      target_lang,
      token,
    }: TextGenerator) => {
      if (!token) throw new Error("Brak tokenu – użytkownik niezalogowany");
      const response = await fetch(`${API_BASE_URL}/reel-texts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          duration,
          target_lang,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json())?.detail || "Błąd przy generowaniu tekstu";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
  });
}
