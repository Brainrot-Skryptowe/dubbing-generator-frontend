"use client";
import { AudioWithMusic } from "@/types/audio-with-music";
import { TempAudio } from "@/types/temp-audio";
import { TempMusic } from "@/types/temp-music";
import { createContext, useContext, useState, ReactNode } from "react";

export type ReelData = {
  tempAudio: TempAudio | null;
  tempMusic: TempMusic | null;
};

type ReelDataContextType = {
  tempAudio: TempAudio | null;
  tempMusic: TempMusic | null;
  setTempAudio: (audio: TempAudio) => void;
  setTempMusic: (music: TempMusic) => void;
  getAudioWithMusic: () => AudioWithMusic | null;
  clearReelData: () => void;
};

const ReelDataContextType = createContext<ReelDataContextType | undefined>(
  undefined,
);

export const ReelDataProvider = ({ children }: { children: ReactNode }) => {
  const initialReelState: ReelData = {
    tempAudio: null,
    tempMusic: null,
  };

  const [reelData, setReel] = useState<ReelData>(initialReelState);

  const setTempAudio = (tempAudio: TempAudio) =>
    setReel((prev) => ({ ...prev, tempAudio }));

  const setTempMusic = (tempMusic: TempMusic) =>
    setReel((prev) => ({ ...prev, tempMusic }));

  const getAudioWithMusic = (): AudioWithMusic | null => {
    const { tempAudio, tempMusic } = reelData;
    if (tempAudio && tempMusic) {
      return { audio: tempAudio, music: tempMusic };
    }
    return null;
  };

  const clearReelData = () => setReel(initialReelState);

  return (
    <ReelDataContextType.Provider
      value={{
        tempAudio: reelData.tempAudio,
        tempMusic: reelData.tempMusic,
        setTempAudio,
        setTempMusic,
        getAudioWithMusic,
        clearReelData,
      }}
    >
      {children}
    </ReelDataContextType.Provider>
  );
};

export const useReelData = () => {
  const context = useContext(ReelDataContextType);
  if (!context)
    throw new Error("useReelData must be used within a ReelProvider");
  return context;
};
