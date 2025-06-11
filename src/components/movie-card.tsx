import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ItemWithIcon } from "@/components/item-with-icon";
import { Movie } from "@/types/movie";
import { Calendar, Clock4, Languages, Pencil, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  return (
    <>
      <Card key={movie.id} className="p-4 bg-zinc-800 text-white">
        <CardHeader className="flex items-center justify-between mt-2">
          <CardTitle>
            <h1 className="text-2xl font-semibold">{movie.title}</h1>
          </CardTitle>
          <button onClick={() => router.push(`/movies/${movie.id}/`)}>
            <Pencil className="w-6 h-6 text-white hover:text-gray-200" />
          </button>
        </CardHeader>

        <CardContent className="px-4">
          <Image
            src={movie.thumbnail_path}
            alt="Movie thumbnail"
            height={200}
            width={200}
            className="h-[200px] w-auto rounded object-contain mx-auto mb-4 cursor-pointer"
            onClick={() => setShowPreview(true)}
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
              src={movie.file_path}
              controls
              autoPlay
              className="w-full h-[70vh] rounded bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
