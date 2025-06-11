"use client";

import { useAuth } from "@/components/AuthProvider";
import loading from "@/components/ui/loading";
import { useMovieWithReels } from "@/hooks/useMovies";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ItemWithIcon } from "@/components/item-with-icon";
import { Calendar, Clock4, Languages } from "lucide-react";
import SelectForm from "@/components/select-form";
import { SelectItem } from "@/components/ui/select";

export default function MovieDetails() {
  const { user, isLoading: isLoadingUser, token } = useAuth();
  const params = useParams();
  const id = Number(params?.id);
  const [reelId, setReelId] = useState<number | undefined>();

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
      <h1 className="text-3xl font-semibold">{movieDetails.title}</h1>
      <div className="flex flex-col lg:flex-row items-center gap-24">
        <Image
          src={movieDetails.thumbnail_path}
          alt="Button Icon"
          height={216}
          width={216}
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
    </div>
  );
}
