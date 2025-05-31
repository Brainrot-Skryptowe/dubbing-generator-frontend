"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemWithIcon } from "@/components/ui/item-with-icon";
import { useMovies } from "@/hooks/useMovies";
import { Calendar, Clock4, Languages, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie";
import { useAuth } from "@/components/AuthProvider";
import loading from "@/components/ui/loading";

export default function BrowseMovies() {
  const { user } = useAuth();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const { data: movies_data, isLoading } = useMovies(token);

  if (!user) {
    return loading();
  }

  if (isLoading || !movies_data) return loading();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-24 mb-16">
      {(movies_data as Movie[]).map((movie) => (
        <Card key={movie.id} className="p-4 bg-zinc-800 text-white">
          <CardHeader className="flex items-center justify-between mt-2">
            <CardTitle>
              <h1 className="text-2xl font-semibold">{movie.title}</h1>
            </CardTitle>
            <button>
              <Pencil className="w-6 h-6 text-white hover:text-gray-200" />
            </button>
          </CardHeader>

          <CardContent className="px-4">
            <img
              src={movie.thumbnail_path}
              alt="Movie thumbnail"
              className="h-[200px] w-auto rounded object-contain mx-auto mb-4"
            />

            <div className="flex gap-4 w-full text-center mt-8">
              <ItemWithIcon
                icon={<Clock4 className="w-6 h-6 text-white" />}
                label={`${movie.duration} seconds`}
              />
              <ItemWithIcon
                icon={<Calendar className="w-6 h-6 text-white" />}
                label={movie.created_at}
              />
              <ItemWithIcon
                icon={<Languages className="w-6 h-6 text-white" />}
                label={movie.native_lang}
              />
            </div>

            {movie.description && movie.description.trim() !== "" && (
              <CardDescription className="mt-6">
                <h1 className="text-lg font-bold text-white">Description</h1>
                <p className="text-base text-justify text-white mt-1">
                  {movie.description}
                </p>
              </CardDescription>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
