import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
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

export function useCreatePipelineReel(
  options?: UseMutationOptions<void, unknown, CreateReelPipelineArgs>,
) {
  const { mutateAsync: createMusic } = useCreateMusic();
  const { mutateAsync: createAudio } = useCreateAudio();
  const { mutateAsync: createMovie } = useCreateMovies();
  const { mutateAsync: createReel } = useCreateReels();
  const { mutateAsync: createAudioTranscription } =
    useCreateAudioTranscription();

  return useMutation({
    mutationFn: async ({ reel, token }: CreateReelPipelineArgs) => {
      try {
        console.log("Creating movie");

        const movie = await createMovie({ reel, token });

        console.log("Movie created");

        for (const item of reel.audiosWithMusic) {
          const audio = await createAudio({
            title: reel.title,
            tempAudio: item.audio,
            token,
          });

          console.log("Audio created");

          const transcriptionModel = item.audio.transcriptionModel;
          const includeSrt = transcriptionModel !== "none";

          if (includeSrt) {
            await createAudioTranscription({
              audioId: audio.id,
              transcriptionModel,
              token,
            });

            console.log("Transcription created");
          }

          const music = await createMusic({ tempMusic: item.music, token });

          console.log("Music created");

          await createReel({
            movieId: movie.id,
            audioId: audio.id,
            musicId: music.id,
            musicVolume: item.music.musicVolume,
            includeSrt,
            token,
          });

          console.log("Reel craeted");
        }

        console.log("Movie created successfully");
      } catch (error) {
        console.error("Error in reel pipeline:", error);
        throw error;
      }
    },
    ...options,
  });
}
