import { useGoogleLogin } from "@react-oauth/google";
import ButtonForm from "./button-form";
import { API_BASE_URL } from "@/config/constants";

type GoogleAuthButtonProps = {
  onError: () => void;
  onSuccess: (access_token: string) => void;
};

export default function GoogleAuthButton({
  onError,
  onSuccess,
}: GoogleAuthButtonProps) {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await fetch(`${API_BASE_URL}/users/google/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: tokenResponse.access_token }),
      });

      if (!response.ok) {
        onError();
        return;
      }

      const data = await response.json();
      onSuccess(data.access_token);
    },
    onError: () => {
      onError();
    },
  });

  return (
    <ButtonForm
      onClick={() => handleGoogleLogin()}
      title="Continue with Google"
      imageSrc="/google.png"
      type="button"
    />
  );
}
