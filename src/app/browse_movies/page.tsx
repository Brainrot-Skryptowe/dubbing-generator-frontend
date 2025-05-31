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
import { useRouter } from "next/navigation";

export default function BrowseMovies() {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();

  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  useEffect(() => {
    if (token === "") return;
    if (!user && !token) {
      router.push("/login");
    }
  }, [user, router, token]);

  const { data: movies_data, isLoading } = useMovies(sortBy, sortDir, token!);

  if (!user || isLoading || !movies_data) return loading();

  if ((movies_data as Movie[]).length === 0) {
    return (
      <div className="text-white text-center mb-16">
        <h1 className="text-2xl font-semibold">No movies found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mx-24">
        <h2 className="text-white text-xl font-semibold">Sort movies</h2>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="w-48 bg-zinc-800 text-white p-3 rounded border border-white"
        >
          <option value="title">Title</option>
          <option value="duration">Duration</option>
          <option value="created_at">Created At</option>
        </select>
        <select
          value={sortDir}
          onChange={(event) => setSortDir(event.target.value)}
          className="w-48 bg-zinc-800 text-white p-3 rounded border border-white"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-24 mb-16 mt-8">
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
    </>
  );
}
