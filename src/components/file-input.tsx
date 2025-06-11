import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface FileInputProps {
  onFileSelect: (file: File) => void;
  value?: File | null;
}

export default function FileInput({ onFileSelect, value }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full text-center mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="w-64"
      >
        Upload MP4
      </Button>
      <input
        type="file"
        accept="video/mp4"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelect(file);
          }
        }}
        className="hidden"
      />
      <p className="text-sm text-gray-300 text-center w-full mt-2">
        Selected file:{" "}
        {value ? (
          <>
            <span className="font-medium">{value.name}</span> (
            {(value.size / (1024 * 1024)).toFixed(2)} MB)
          </>
        ) : (
          <span>None</span>
        )}
      </p>
    </div>
  );
}
