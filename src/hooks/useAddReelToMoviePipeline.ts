import { useMutation } from "@tanstack/react-query";
import {
  useCreateAudio,
  useCreateAudioTranscription,
} from "@/hooks/useCreateAudio";
import { useCreateReels } from "@/hooks/useCreateReel";
import { useCreateMusic } from "@/hooks/useCreateMusic";
import { AudioWithMusic } from "@/types/audio-with-music";

type AddReelToMoviePipelineArgs = {
  movieId: number;
  audioWithMusic: AudioWithMusic;
  token?: string;
};

export function useAddToMoviePipelineReel() {
  const { mutateAsync: createMusic } = useCreateMusic();
  const { mutateAsync: createAudio } = useCreateAudio();
  const { mutateAsync: createReel } = useCreateReels();
  const { mutateAsync: createAudioTranscription } =
    useCreateAudioTranscription();

  return useMutation({
    mutationFn: async ({
      movieId,
      audioWithMusic,
      token,
    }: AddReelToMoviePipelineArgs) => {
      try {
        console.log("Start adding reel to movie");

        const audio = await createAudio({
          title: audioWithMusic.music.musicTitle,
          tempAudio: audioWithMusic.audio,
          token,
        });

        console.log("Audio created");

        const transcriptionModel = audioWithMusic.audio.transcriptionModel;
        const includeSrt = transcriptionModel !== "none";

        if (includeSrt) {
          await createAudioTranscription({
            audioId: audio.id,
            transcriptionModel,
            token,
          });
        }

        console.log("Transcript created");

        const music = await createMusic({
          tempMusic: audioWithMusic.music,
          token,
        });

        console.log("Music created");

        await createReel({
          movieId: movieId,
          audioId: audio.id,
          musicId: music.id,
          musicVolume: audioWithMusic.music.musicVolume,
          includeSrt,
          token,
        });

        console.log("Reel created");
      } catch (error) {
        console.error("Error in reel pipeline:", error);
        throw error;
      }
    },
  });
}
