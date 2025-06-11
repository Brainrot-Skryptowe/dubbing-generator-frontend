"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import loading from "@/components/ui/loading";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/movie-card";
import SortingSettingsContainer from "@/components/sorting-settings-container";
import type { Movie } from "@/types/movie";

export default function Page() {
  const { user, isLoading: isLoadingUser, token } = useAuth();

  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  const { data: movies_data, isLoading: isLoadingMovies } = useMovies(
    sortBy,
    sortDir,
    token!,
  );
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && (!token || !user)) {
      router.push("/login");
    }
  }, [isLoadingUser, user, token, router]);

  if (isLoadingUser || isLoadingMovies || !user || !movies_data)
    return loading();

  if ((movies_data as Movie[]).length === 0) {
    return (
      <div className="text-white text-center mb-16">
        <h1 className="text-2xl font-semibold">No movies found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-24">
      <SortingSettingsContainer
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-16 mt-8">
        {(movies_data as Movie[]).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
