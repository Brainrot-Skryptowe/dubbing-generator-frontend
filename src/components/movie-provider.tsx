"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ReelData = {
  title: string;
  description: string;
  nativeLang: string;
  videoFile: File | null;
  text?: string;
  voice?: string;
};

type ReelContextType = {
  reel: ReelData;
  updateReel: (data: Partial<ReelData>) => void;
};

const ReelContext = createContext<ReelContextType | undefined>(undefined);

export const ReelProvider = ({ children }: { children: ReactNode }) => {
  const [reel, setReel] = useState<ReelData>({
    title: "",
    description: "",
    nativeLang: "",
    videoFile: null,
  });

  const updateReel = (data: Partial<ReelData>) => {
    setReel((prev) => ({ ...prev, ...data }));
  };

  return (
    <ReelContext.Provider value={{ reel, updateReel }}>
      {children}
    </ReelContext.Provider>
  );
};

export const useReel = () => {
  const context = useContext(ReelContext);
  if (!context) throw new Error("useReel must be used within an ReelProvider");
  return context;
};
