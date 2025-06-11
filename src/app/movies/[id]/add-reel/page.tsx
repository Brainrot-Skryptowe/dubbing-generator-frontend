import { useAuth } from "@/components/AuthProvider";

export default function AddReel() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
}
