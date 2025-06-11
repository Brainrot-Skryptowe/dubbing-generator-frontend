import { useMutation } from "@tanstack/react-query";
import { ReelData } from "@/components/movie-provider";
import { useCreateMovies } from "@/hooks/useCreateMovie";
import {
  useCreateAudio,
  useCreateAudioTranscription,
} from "@/hooks/useCreateAudio";
import { useCreateReels } from "@/hooks/useCreateReel";
import { useCreateMusic } from "@/hooks/useCreateMusic";

type CreateReelPipelineArgs = {
  reel: ReelData;
  token?: string;
};

type CreateReelPipelineResponse = {
  movieId: number;
  audioId: number;
  musicId: number;
  reelId: number;
};

export function useCreatePipelineReel() {
  const { mutateAsync: createMusic } = useCreateMusic();
  const { mutateAsync: createAudio } = useCreateAudio();
  const { mutateAsync: createMovie } = useCreateMovies();
  const { mutateAsync: createReel } = useCreateReels();
  const { mutateAsync: createAudioTranscription } =
      useCreateAudioTranscription();

  return useMutation<CreateReelPipelineResponse, Error, CreateReelPipelineArgs>({
    mutationFn: async ({ reel, token }) => {
      try {
        const movie = await createMovie({ reel, token });
        const audio = await createAudio({ reel, token });

        const { transcriptionModel, musicVolume } = reel;
        const includeSrt = transcriptionModel !== "none";

        if (includeSrt) {
          await createAudioTranscription({
            audioId: audio.id,
            transcriptionModel,
            token,
          });
        }

        const music = await createMusic({ reel, token });

        const reelResult = await createReel({
          movieId: movie.id,
          audioId: audio.id,
          musicId: music.id,
          musicVolume,
          includeSrt,
          token,
        });

        return {
          movieId: movie.id,
          audioId: audio.id,
          musicId: music.id,
          reelId: reelResult.id,
        };
      } catch (error) {
        console.error("❌ Error in reel pipeline:", error);
        throw error;
      }
    },
  });
}
