"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import SkeletonImg from "@/components/SkeletonImg";
import oneFilm from "@/content/onefilm.json";
import { Skeleton } from "@/components/ui/skeleton";

interface IGenre {
  id: number;
  name: string;
}

interface IResponseFilm {
  poster_path: string;
  title: string;
  genres: IGenre[];
  adult: boolean;
  original_language: string;
  origin_country: string;
  release_date: string;
  overview: string;
}

const imgLink = "https://image.tmdb.org/t/p/original";

const getDataFilm = async (idFilm: string): Promise<IResponseFilm> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${idFilm}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGQxYjFiZTY1YzMxYzdhNDBlYjI1YjM0MmQ2NWYyZSIsIm5iZiI6MTc0MDE0NDgxMC44NjA5OTk4LCJzdWIiOiI2N2I4ODBhYTU1MDMyOTI3NTYyMjc5YzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yuL-eK0zF_IXBf6885Zhinrugq2LuHMn6_G24w5_rAw",
    },
  });
  return response.json();
};

export default function CardPage() {
  const [likes, setLikes] = useState<number>(500);
  const [dislikes, setDislikes] = useState<number>(76);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);
  const path = usePathname();

  const idFilm = path.split("/");
  const { data, isLoading } = useQuery<IResponseFilm>({
    queryKey: ["film", idFilm[2]],
    queryFn: () => getDataFilm(idFilm[2]),
  });

  function handleLikeClick(): void {
    if (isLike) {
      setLikes((prev: number) => prev - 1);
      setIsLike(false);
    } else {
      setLikes((prev: number) => prev + 1);
      if (isDislike) {
        setDislikes((prev: number) => prev - 1);
      }
      setIsLike(true);
      setIsDislike(false);
    }
  }

  function handleDislikeClick(): void {
    if (isDislike) {
      setDislikes((prev: number) => prev - 1);
      setIsDislike(false);
    } else {
      setDislikes((prev: number) => prev + 1);
      if (isLike) {
        setLikes((prev: number) => prev - 1);
      }
      setIsDislike(true);
      setIsLike(false);
    }
  }

  return (
    <div className="relative py-[40px] px-[60px] md:px-[30px] lg:px-[60px] xl:px-[80px] bg-blue-950">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center py-[30px] px-[20px] sm:px-[50px] md:px-[25px] lg:px-[50px] xl:py-[50px] xl:px-[70px] 2xl:max-w-[1400px] 2xl:mx-auto text-white border-2 rounded-xl border-white z-10">
        <div className="w-[250px] h-[400px] sm:w-[300px] sm:h-[450px] md:justify-self-start relative">
          {isLoading && <Skeleton className="w-full h-full rounded-lg" />}
          {!isLoading && data?.poster_path && (
            <SkeletonImg
              height={300}
              width={300}
              className={"rounded-xl absolute top-0 left-0 w-full h-full"}
              src={imgLink + data.poster_path}
              alt={"Film poster"}
            />
          )}
        </div>
        <div className="font-graphik flex flex-col gap-2 pt-[30px] sm:px-[25px] md:px-0 md:pt-0">
          <div className="font-bold italic text-3xl pb-5">{data?.title}</div>
          <div className="flex flex-row text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">{oneFilm.genre}</span>
            {data?.genres?.map((genre: IGenre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <div className="flex flex-row text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">{oneFilm.age}</span>
            {data?.adult === false ? (
              <div>{oneFilm.sixteen}</div>
            ) : (
              <div>{oneFilm.eighteen}</div>
            )}
          </div>
          <div className="flex flex-row text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">{oneFilm.language}</span>
            {data?.original_language}
          </div>
          <div className="flex flex-row text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">{oneFilm.country}</span>
            {data?.origin_country}
          </div>
          <div className="flex flex-row text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">{oneFilm.release}</span>
            {data?.release_date}
          </div>
          <div className="text-sm xl:text-base gap-2">
            <span className="font-bold text-amber-200">
              {oneFilm.description}
            </span>{" "}
            {data?.overview}
          </div>
          <div>
            <div className="grid grid-cols-2 mt-3 text-center text-sm xl:text-base font-semibold">
              <p>
                <span className="text-amber-200">{oneFilm.likes}</span> {likes}
              </p>
              <p>
                <span className="text-amber-200">{oneFilm.dislikes}</span>{" "}
                {dislikes}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-5 text-sm xl:text-base text-black">
              <Button
                onClick={handleLikeClick}
                className="py-2 px-4 font-graphik flex justify-center gap-3 items-center rounded-lg border-2 bg-white cursor-pointer hover:bg-gray-400 hover:text-white"
              >
                {oneFilm.like}
                <Heart />
              </Button>
              <Button
                onClick={handleDislikeClick}
                className="py-2 px-4 font-graphik flex justify-center gap-3 items-center rounded-lg border-2 bg-white cursor-pointer hover:bg-gray-400 hover:text-white"
              >
                {oneFilm.dislike}
                <ThumbsDown />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[40px] md:pt-[80px]">
        <VideoPlayer />
      </div>
    </div>
  );
}
