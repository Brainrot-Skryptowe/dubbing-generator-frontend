import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/constants";

type TextGeneratorArgs = {
  description: string;
  duration: number;
  target_lang: string;
  token: string | undefined;
};

type TextGeneratorResponse = {
  text: string;
};

export function useTextGenerator() {
  return useMutation<TextGeneratorResponse, Error, TextGeneratorArgs>({
    mutationFn: async ({
                         description,
                         duration,
                         target_lang,
                         token,
                       }: TextGeneratorArgs) => {
      if (!token) throw new Error("Token is missing – user not logged in");

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
            (await response.json())?.detail || "Error generating text";
        throw new Error(errorMessage);
      }

      const result: TextGeneratorResponse = await response.json();
      return result;
    },
  });
}
