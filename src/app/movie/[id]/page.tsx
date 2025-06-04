"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMovieWithReels } from "@/hooks/useMovies";
import { useAuth } from "@/components/AuthProvider";
import loading from "@/components/ui/loading";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { token, user, isLoading: isLoadingUser } = useAuth();
  const {
    data: movie,
    isPending,
    refetch,
  } = useMovieWithReels(Number(id), token);
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  useEffect(() => {
    if (!user && !isLoadingUser) {
      router.push("/login");
    }
  }, [user, isLoadingUser, router]);

  if (isPending || isLoadingUser) {
    return loading();
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p>The movie with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Movie Detail Page</h1>
      <p>Movie ID: {movie?.title}</p>
    </div>
  );
}
