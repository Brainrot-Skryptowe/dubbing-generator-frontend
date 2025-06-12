"use client";
import { AudioWithMusic } from "@/types/audio-with-music";
import { TempAudio } from "@/types/temp-audio";
import { TempMusic } from "@/types/temp-music";
import { createContext, useContext, useState, ReactNode } from "react";

export type MovieData = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  tempAudio: TempAudio | null;
  tempMusic: TempMusic | null;
  audiosWithMusic: AudioWithMusic[];
};

type MovieContextType = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  tempAudio: TempAudio | null;
  tempMusic: TempMusic | null;
  audiosWithMusic: AudioWithMusic[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setNativeLang: (lang: string) => void;
  setVideoFile: (file: File | null) => void;
  setTempAudio: (audio: TempAudio) => void;
  setTempMusic: (music: TempMusic) => void;
  addAudioWithMusic: () => void;
  clearReel: () => void;
  getReel: () => MovieData;
};

const ReelContext = createContext<MovieContextType | undefined>(undefined);

export const ReelProvider = ({ children }: { children: ReactNode }) => {
  const initialReelState: MovieData = {
    title: "",
    description: "",
    nativeLang: "English",
    videoFile: null,
    tempAudio: null,
    tempMusic: null,
    audiosWithMusic: [],
  };

  const [reel, setReel] = useState<MovieData>(initialReelState);

  const setTitle = (title: string) => setReel((prev) => ({ ...prev, title }));

  const setDescription = (description: string) =>
    setReel((prev) => ({ ...prev, description }));

  const setNativeLang = (lang: string) =>
    setReel((prev) => ({ ...prev, nativeLang: lang }));

  const setVideoFile = (file: File | null) =>
    setReel((prev) => ({ ...prev, videoFile: file }));

  const setTempAudio = (tempAudio: TempAudio) =>
    setReel((prev) => ({ ...prev, tempAudio }));

  const setTempMusic = (tempMusic: TempMusic) =>
    setReel((prev) => ({ ...prev, tempMusic }));

  const addAudioWithMusic = () => {
    setReel((prev) => {
      if (prev.tempAudio && prev.tempMusic) {
        const newAudioWithMusic: AudioWithMusic = {
          audio: prev.tempAudio,
          music: prev.tempMusic,
        };
        return {
          ...prev,
          audiosWithMusic: [...prev.audiosWithMusic, newAudioWithMusic],
          tempAudio: null,
          tempMusic: null,
        };
      }
      return prev; // nic nie zmieniaj, jeśli któryś nie istnieje
    });
  };

  const getReel = () => reel;

  const clearReel = () => setReel(initialReelState);

  return (
    <ReelContext.Provider
      value={{
        title: reel.title,
        setTitle,
        description: reel.description,
        setDescription,
        nativeLang: reel.nativeLang,
        setNativeLang,
        videoFile: reel.videoFile,
        setVideoFile,
        tempAudio: reel.tempAudio,
        setTempAudio,
        tempMusic: reel.tempMusic,
        setTempMusic,
        audiosWithMusic: reel.audiosWithMusic,
        addAudioWithMusic,
        getReel,
        clearReel,
      }}
    >
      {children}
    </ReelContext.Provider>
  );
};

export const useReel = () => {
  const context = useContext(ReelContext);
  if (!context) throw new Error("useReel must be used within a ReelProvider");
  return context;
};
