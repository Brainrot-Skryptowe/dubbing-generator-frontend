import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ItemWithIcon } from "@/components/item-with-icon";
import { Movie } from "@/types/movie";
import { Calendar, Clock4, Languages, Pencil } from "lucide-react";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
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
        <Image
          src={movie.thumbnail_path}
          alt="Movie thumbnail"
          height={200}
          width={200}
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
  );
}
