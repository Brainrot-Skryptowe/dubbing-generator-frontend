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

  if (!user) return null;
  
  if (isLoading || !movies_data) return loading();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-24 mb-16">
      {(movies_data as Movie[]).map((movie) => (
        <Card key={movie.id} className="p-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>
              <h1 className="text-2xl font-semibold">{movie.title}</h1>
            </CardTitle>
            <button>
              <Pencil className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </CardHeader>

          <CardContent className="px-4">
            <img
              src={movie.thumbnail_path}
              alt="Movie thumbnail"
              className="h-[200px] w-auto rounded object-contain mx-auto mb-4"
            />

            <div className="flex gap-4 w-full text-center mt-6">
              <ItemWithIcon
                icon={<Clock4 className="w-6 h-6 text-gray-600" />}
                label={`${movie.duration} seconds`}
              />
              <ItemWithIcon
                icon={<Calendar className="w-6 h-6 text-gray-600" />}
                label={movie.created_at}
              />
              <ItemWithIcon
                icon={<Languages className="w-6 h-6 text-gray-600" />}
                label={movie.native_lang}
              />
            </div>

            {movie.description && movie.description.trim() !== "" && (
              <CardDescription className="mt-4">
                <h1 className="text-lg font-bold text-black">Description</h1>
                <p className="text-base text-justify text-gray-600">
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
