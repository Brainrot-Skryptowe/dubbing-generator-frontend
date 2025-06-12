"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Music = {
  musicFile: File | null;
  musicTitle: string;
  musicVolume: number;
};

type Audio = {
  subtitlesText: string;
  voice: string;
  audioLang: string;
  speed: number;
  transcriptionModel: string;
};

type AudioWithMusic = {
  audio: Audio;
  music: Music | null;
};

export type ReelData = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  musicFile: File | null;
  musicTitle: string;
  musicVolume: number;
  subtitlesText: string;
  voice: string;
  audioLang: string;
  speed: number;
  transcriptionModel: string;
  tempAudio: Audio | null;
  tempMusic: Music | null;
  audiosWithMusic: AudioWithMusic[];
};

type ReelContextType = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  musicFile: File | null;
  musicTitle: string;
  musicVolume: number;
  subtitlesText: string;
  voice: string;
  audioLang: string;
  speed: number;
  transcriptionModel: string;
  tempAudio: Audio | null;
  tempMusic: Music | null;
  audiosWithMusic: AudioWithMusic[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setNativeLang: (lang: string) => void;
  setVideoFile: (file: File | null) => void;
  setMusicFile: (file: File | null) => void;
  setMusicTitle: (title: string) => void;
  setMusicVolume: (volume: number) => void;
  setSubtitlesText: (subtitlesText: string) => void;
  setVoice: (voice: string) => void;
  setAudioLang: (audioLang: string) => void;
  setSpeed: (speed: number) => void;
  setTranscriptionModel: (transcriptionModel: string) => void;
  setTempAudio: (audio: Audio) => void;
  setTempMusic: (music: Music) => void;
  addAudioWithMusic: () => void;
  clearReel: () => void;
  getReel: () => ReelData;
};

const ReelContext = createContext<ReelContextType | undefined>(undefined);

export const ReelProvider = ({ children }: { children: ReactNode }) => {
  const initialReelState: ReelData = {
    title: "",
    description: "",
    nativeLang: "English",
    videoFile: null,
    musicFile: null,
    musicTitle: "",
    musicVolume: 0.2,
    subtitlesText: "",
    voice: "",
    audioLang: "",
    speed: 1,
    transcriptionModel: "tiny",
    tempAudio: null,
    tempMusic: null,
    audiosWithMusic: [],
  };

  const [reel, setReel] = useState<ReelData>(initialReelState);

  const setTitle = (title: string) => setReel((prev) => ({ ...prev, title }));

  const setDescription = (description: string) =>
    setReel((prev) => ({ ...prev, description }));

  const setNativeLang = (lang: string) =>
    setReel((prev) => ({ ...prev, nativeLang: lang }));

  const setVideoFile = (file: File | null) =>
    setReel((prev) => ({ ...prev, videoFile: file }));

  const setMusicFile = (file: File | null) =>
    setReel((prev) => ({ ...prev, musicFile: file }));

  const setMusicTitle = (title: string) =>
    setReel((prev) => ({ ...prev, musicTitle: title }));

  const setMusicVolume = (volume: number) =>
    setReel((prev) => ({ ...prev, musicVolume: volume }));

  const setSubtitlesText = (subtitlesText: string) =>
    setReel((prev) => ({ ...prev, subtitlesText }));

  const setVoice = (voice: string) => setReel((prev) => ({ ...prev, voice }));

  const setAudioLang = (audioLang: string) =>
    setReel((prev) => ({ ...prev, audioLang }));

  const setSpeed = (speed: number) => setReel((prev) => ({ ...prev, speed }));

  const setTranscriptionModel = (transcriptionModel: string) =>
    setReel((prev) => ({ ...prev, transcriptionModel }));

  const setTempAudio = (tempAudio: Audio) =>
    setReel((prev) => ({ ...prev, tempAudio }));

  const setTempMusic = (tempMusic: Music) =>
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
        musicFile: reel.musicFile,
        setMusicFile,
        musicTitle: reel.musicTitle,
        setMusicTitle,
        musicVolume: reel.musicVolume,
        setMusicVolume,
        subtitlesText: reel.subtitlesText,
        setSubtitlesText,
        voice: reel.voice,
        setVoice,
        audioLang: reel.audioLang,
        setAudioLang,
        speed: reel.speed,
        setSpeed,
        transcriptionModel: reel.transcriptionModel,
        setTranscriptionModel,
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
