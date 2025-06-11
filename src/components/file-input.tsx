import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

export default function FileInput({ onFileSelect }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoFileLocal, setVideoFileLocal] = useState<File | null>(null);

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
            setVideoFileLocal(file);
          }
        }}
        className="hidden"
      />
      <p className="text-sm text-gray-300 text-center w-full mt-2">
        Selected file:{" "}
        {videoFileLocal ? (
          <>
            <span className="font-medium">{videoFileLocal.name}</span> (
            {(videoFileLocal.size / (1024 * 1024)).toFixed(2)} MB)
          </>
        ) : (
          <span>None</span>
        )}
      </p>
    </div>
  );
}
