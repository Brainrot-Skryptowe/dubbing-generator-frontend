import Srt from "./srt";

export default interface Audio {
  id: number;
  title: string;
  text: string;
  voice: string;
  language: string;
  speed: number;
  created_at: string;
  file_path: string;
  srtObject: Srt | null;
}
