import Audio from "./audio";

export default interface Reel {
  id: number;
  lang: string;
  file_path: string;
  movie_id: number;
  author: number;
  audio: Audio | null;
}
