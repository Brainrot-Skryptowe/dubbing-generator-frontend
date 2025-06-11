"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ReelData = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  subtitlesText: string;
  voice: string;
  audioLang: string;
};

type ReelContextType = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  subtitlesText: string;
  voice: string;
  audioLang: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setNativeLang: (lang: string) => void;
  setVideoFile: (file: File | null) => void;
  setSubtitlesText: (subtitlesText: string) => void;
  setVoice: (voice: string) => void;
  setAudioLang: (audioLang: string) => void;
  clearReel: () => void;
};

const ReelContext = createContext<ReelContextType | undefined>(undefined);

export const ReelProvider = ({ children }: { children: ReactNode }) => {
  const initialReelState: ReelData = {
    title: "",
    description: "",
    nativeLang: "",
    videoFile: null,
    subtitlesText: "",
    voice: "",
    audioLang: "",
  };

  const setTitle = (title: string) => setReel((prev) => ({ ...prev, title }));
  const [reel, setReel] = useState<ReelData>(initialReelState);

  const setDescription = (description: string) =>
    setReel((prev) => ({ ...prev, description }));

  const setNativeLang = (lang: string) =>
    setReel((prev) => ({ ...prev, nativeLang: lang }));

  const setVideoFile = (file: File | null) =>
    setReel((prev) => ({ ...prev, videoFile: file }));

  const setSubtitlesText = (subtitlesText: string) =>
    setReel((prev) => ({ ...prev, subtitlesText: subtitlesText }));

  const setVoice = (voice: string) =>
    setReel((prev) => ({ ...prev, voice: voice }));

  const setAudioLang = (audioLang: string) =>
    setReel((prev) => ({ ...prev, audioLang: audioLang }));

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
        subtitlesText: reel.subtitlesText,
        setSubtitlesText,
        voice: reel.voice,
        setVoice,
        audioLang: reel.audioLang,
        setAudioLang,
        clearReel,
      }}
    >
      {children}
    </ReelContext.Provider>
  );
};

export const useReel = () => {
  const context = useContext(ReelContext);
  if (!context) throw new Error("useReel must be used within an ReelProvider");
  return context;
};
