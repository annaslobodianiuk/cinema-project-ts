"use client";
import Card from "@/components/Card";
import StarrySky from "@/components/StarrySky";
import FindFilms from "@/components/FindFilms";
import {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import FilterFilms from "@/components/FilterFilms";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";
import films from "@/content/films.json";

interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
}

interface IGenre {
  id: number;
  name: string;
}

interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IGenreResponse {
  genres: IGenre[];
}

const getData = async (): Promise<IMovieResponse> => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGQxYjFiZTY1YzMxYzdhNDBlYjI1YjM0MmQ2NWYyZSIsIm5iZiI6MTc0MDE0NDgxMC44NjA5OTk4LCJzdWIiOiI2N2I4ODBhYTU1MDMyOTI3NTYyMjc5YzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yuL-eK0zF_IXBf6885Zhinrugq2LuHMn6_G24w5_rAw",
    },
  });
  return response.json();
};

const getGenresFilms = async (): Promise<IGenreResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGQxYjFiZTY1YzMxYzdhNDBlYjI1YjM0MmQ2NWYyZSIsIm5iZiI6MTc0MDE0NDgxMC44NjA5OTk4LCJzdWIiOiI2N2I4ODBhYTU1MDMyOTI3NTYyMjc5YzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yuL-eK0zF_IXBf6885Zhinrugq2LuHMn6_G24w5_rAw",
      },
    },
  );
  return response.json();
};

export default function FilmPage() {
  const [nameFilm, setNameFilm] = useState<string>("");
  const [selectGenre, setSelectGenre] = useState<string>("");
  const { data, isLoading } = useQuery<IMovieResponse>({
    queryKey: ["user"],
    queryFn: getData,
  });

  const { data: genres } = useQuery<IGenreResponse>({
    queryKey: ["genre"],
    queryFn: getGenresFilms,
  });

  const selectedGenreId = genres?.genres?.find(
    (g: IGenre) => g.name === selectGenre,
  )?.id;

  const filteredMovies = data?.results?.filter((film: IMovie) => {
    const matchesName = film.title
      .toLowerCase()
      .includes(nameFilm.toLowerCase());

    const matchesGenre = selectedGenreId
      ? film.genre_ids.includes(selectedGenreId)
      : true;

    return matchesName && matchesGenre;
  });

  return (
      <div className="bg-blue-950">
        <div className="relative font-graphik">
          <div className="absolute inset-0 z-0">
            <StarrySky countStar={30}/>
          </div>
          <div className="relative text-white text-center font-bold text-3xl md:text-4xl lg:text-5xl p-5 sm:p-10">
            🎬 {films.title}
          </div>
          <FindFilms nameFilm={nameFilm} setNameFilm={setNameFilm}/>
          <FilterFilms onChange={setSelectGenre}/>
        </div>
        <div className="px-[30px] md:px-[60px]">
          {isLoading ? (
              <div
                  className="grid py-[60px] font-graphik sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-center min-h-screen">
                {Array.from({length: 20}).map((_, index) => (
                    <SkeletonCard key={index}/>
                ))}
              </div>
          ) : filteredMovies && filteredMovies.length > 0 ? (
              <div
                  className="grid py-[60px] font-graphik sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-center min-h-screen max-w-screen-2xl mx-auto px-4">
                {filteredMovies?.map((film: IMovie) => (
                    <div key={film.id} className="w-full md:max-w-[300px]">
                      <Link href={`/films/${film.id}`}>
                        <Card
                            image={film.poster_path}
                            title={film.title}
                            description={film.overview}
                        />
                      </Link>
                    </div>
                ))}
              </div>
          ) : (
              <div className="text-white text-center relative text-4xl font-bold  pt-[100px] z-10 min-h-screen">
                Not found...
              </div>
          )}
        </div>
      </div>
  );
}
