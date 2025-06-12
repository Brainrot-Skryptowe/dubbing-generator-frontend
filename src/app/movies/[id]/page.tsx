"use client";

import { useAuth } from "@/components/AuthProvider";
import loading from "@/components/ui/loading";
import { useMovieDelete, useMovieWithReels } from "@/hooks/useMovies";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ItemWithIcon } from "@/components/item-with-icon";
import { Calendar, Clock4, Languages, X } from "lucide-react";
import SelectForm from "@/components/select-form";
import { SelectItem } from "@/components/ui/select";
import { Trash } from "lucide-react";

export default function MovieDetails() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const params = useParams();
  const id = Number(params?.id);
  const [reelId, setReelId] = useState<number | undefined>();
  const [showPreview, setShowPreview] = useState(false);
  const deleteMutation = useMovieDelete(token);

  const { data: movieDetails, isLoading: isLoading } = useMovieWithReels(
    id,
    token,
  );

  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  if (!id || isNaN(id)) router.back();

  if (isLoadingUser || isLoading || !user || !movieDetails) return loading();

  const handleReelChange = (value: string) => {
    setReelId(Number(value));
  };

  return (
    <div className="flex flex-col text-white items-center gap-8 mb-12 mx-36">
      <div className="w-full flex items-center justify-between px-4 md:px-0">
        <h1 className="text-3xl font-semibold text-center flex-1">
          {movieDetails.title}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-600 hover:text-white ml-4"
          onClick={() => {
            if (!confirm("Are you sure you want to delete this movie?")) return;

            deleteMutation.mutate(id, {
              onSuccess: () => {
                router.push("/");
              },
              onError: () => {
                alert("Failed to delete the movie.");
              },
            });
          }}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-24">
        <Image
          src={movieDetails.thumbnail_path}
          alt="Button Icon"
          height={216}
          width={216}
          onClick={() => setShowPreview(true)}
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold mt-6">Description</h1>
          {movieDetails.description.trim() &&
            movieDetails.description.trim() !== "" && (
              <p className="text-base text-justify text-white mt-1">
                {movieDetails.description}
              </p>
            )}

          <h1 className="text-lg font-bold mt-6">Details</h1>
          <div className="flex gap-4 w-full text-center min-w-128 mt-8">
            <ItemWithIcon
              icon={<Clock4 className="w-6 h-6 text-white" />}
              label={`${movieDetails.duration} seconds`}
            />
            <ItemWithIcon
              icon={<Calendar className="w-6 h-6 text-white" />}
              label={movieDetails.created_at}
            />
            <ItemWithIcon
              icon={<Languages className="w-6 h-6 text-white" />}
              label={movieDetails.native_lang}
            />
          </div>

          <h1 className="text-lg font-bold mt-6">Reels</h1>
          {movieDetails.reels.length !== 0 ? (
            <SelectForm
              label="Choose reel"
              onChange={handleReelChange}
              value={reelId !== undefined ? String(reelId) : ""}
            >
              {movieDetails.reels.map((reel, index) => (
                <SelectItem key={reel.id} value={String(index)}>
                  Reel {index + 1}
                </SelectItem>
              ))}
            </SelectForm>
          ) : (
            <p className="text-base">No reels yet. Add your first one below!</p>
          )}
        </div>
      </div>
      <div className="flex flex-row w-100 md:w-128 lg:w-196 gap-8 mt-4">
        <Button
          className="flex-1 mt-2"
          variant="outline"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          className="flex-1 mt-2"
          variant="default"
          type="button"
          onClick={() => {
            router.push(`/add-reel-to-movie/${id}`);
          }}
        >
          Add reel
        </Button>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
              onClick={() => setShowPreview(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src={
                reelId !== undefined
                  ? movieDetails.reels[reelId].file_path
                  : movieDetails.file_path
              }
              controls
              autoPlay
              className="w-full h-[70vh] rounded bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}
