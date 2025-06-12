import { useMutation } from "@tanstack/react-query";
import { MovieData } from "@/components/movie-provider";
import { useCreateMovies } from "@/hooks/useCreateMovie";
import {
  useCreateAudio,
  useCreateAudioTranscription,
} from "@/hooks/useCreateAudio";
import { useCreateReels } from "@/hooks/useCreateReel";
import { useCreateMusic } from "@/hooks/useCreateMusic";

type CreateReelPipelineArgs = {
  reel: MovieData;
  token?: string;
};

export function useCreatePipelineReel() {
  const { mutateAsync: createMusic } = useCreateMusic();
  const { mutateAsync: createAudio } = useCreateAudio();
  const { mutateAsync: createMovie } = useCreateMovies();
  const { mutateAsync: createReel } = useCreateReels();
  const { mutateAsync: createAudioTranscription } =
    useCreateAudioTranscription();

  return useMutation({
    mutationFn: async ({ reel, token }: CreateReelPipelineArgs) => {
      try {
        const movie = await createMovie({ reel, token });

        for (const item of reel.audiosWithMusic) {
          const audio = await createAudio({
            title: reel.title,
            tempAudio: item.audio,
            token,
          });

          const transcriptionModel = item.audio.transcriptionModel;
          const includeSrt = transcriptionModel !== "none";

          if (includeSrt) {
            await createAudioTranscription({
              audioId: audio.id,
              transcriptionModel,
              token,
            });
          }

          const music = await createMusic({ tempMusic: item.music, token });

          await createReel({
            movieId: movie.id,
            audioId: audio.id,
            musicId: music.id,
            musicVolume: item.music.musicVolume,
            includeSrt,
            token,
          });
        }
      } catch (error) {
        console.error("Error in reel pipeline:", error);
        throw error;
      }
    },
  });
}
