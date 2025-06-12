import { Loader2 } from "lucide-react";

export default function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-white" />
    </div>
  );
}
