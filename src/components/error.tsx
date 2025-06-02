import { X } from "lucide-react";

type ErrorWidgetProps = {
  errorMessage: string;
  onClose: () => void;
};

export default function ErrorWidget({
  errorMessage,
  onClose,
}: ErrorWidgetProps) {
  return (
    <div className="flex flex-row w-104 p-4 bg-[#2e1214] rounded-2xl justify-between border-1 border-red-400 ">
      <h3 className="text-white ml-2">{errorMessage}</h3>
      <button className="text-red-500 mr-4" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
