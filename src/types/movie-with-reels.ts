import Reel from "./reel";

export interface MovieWithReels {
  id: number;
  title: string;
  description: string;
  native_lang: string;
  created_at: string;
  author: number;
  type: string;
  duration: number;
  file_path: string;
  thumbnail_path: string;
  reels: Reel[];
}
