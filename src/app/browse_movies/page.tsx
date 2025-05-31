"use client";

import { useAuth } from "@/components/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMovies } from "@/hooks/useMovies";
import { useEffect, useState } from "react";

const movies = [
  {
    id: 1,
    name: "Movie1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam diam tellus, tristique vitae leo sed, auctor finibus est. Nam diam ligula, lobortis vel risus sit amet, accumsan viverra metus. Nullam vitae ipsum metus. Sed venenatis leo leo, et rutrum nisi suscipit eget. Nullam quis neque hendrerit, eleifend risus vitae, sollicitudin lorem. Sed consequat sem velit, volutpat accumsan magna rhoncus nec. Duis a justo tincidunt, varius felis a, varius massa. Nunc scelerisque ultricies elit, non lacinia nibh tristique eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed rutrum erat a tempus efficitur. Pellentesque scelerisque est leo, facilisis interdum libero rutrum a. Nullam pellentesque lectus at est commodo maximus. Proin rutrum pharetra aliquet. Curabitur vitae vehicula massa, faucibus bibendum ligula.",
    imgUrl: "https://picsum.photos/1080/1920",
  },
  {
    id: 2,
    name: "Movie1",
    description: "Bajojajo",
    imgUrl: "https://picsum.photos/1080/1920",
  },
];

export default function BrowseMovies() {

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token);
    }
  }, []);

  const { data: movies_data, isLoading} = useMovies(token);

  if (isLoading || !movies_data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-24">          
      {(movies_data as Movie[]).map((movie) => (
        <Card key={movie.id} className="p-4">  
          <CardTitle className="px-4">
            <h1 className="text-xl font-semibold">{movie.title}</h1>
          </CardTitle>
          <CardContent className="px-4">
            <img
                src={movie.thumbnail_path}
                alt="Movie thumbnail"
                className="h-[200px] w-auto rounded object-contain mx-auto mb-4"
              />
          </CardContent>
          <CardDescription className="px-4">
            <p>{movie.description}</p>
          </CardDescription>
          
        </Card>
      ))}
    </div>
  );
}
