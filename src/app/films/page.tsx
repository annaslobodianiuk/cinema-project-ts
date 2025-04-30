"use client";
import Card from "@/components/Card";
import StarrySky from "@/components/StarrySky";
import FindFilms from "@/components/FindFilms";
import { useState } from "react";
import FilterFilms from "@/components/FilterFilms";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";
import films from "@/content/films.json";
import { useGetPopularMoviesQuery, useGetGenresQuery } from "@/store/movieApi";

export default function FilmPage() {
  const [nameFilm, setNameFilm] = useState<string>("");
  const [selectGenre, setSelectGenre] = useState<string>("");
  const { data, isLoading } = useGetPopularMoviesQuery();
  const { data: genres } = useGetGenresQuery();

  const selectedGenreId = genres?.genres?.find(
    (g) => g.name === selectGenre,
  )?.id;

  const filteredMovies = data?.results?.filter((film) => {
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
          <StarrySky countStar={30} />
        </div>
        <div className="relative text-white text-center font-bold text-3xl md:text-4xl lg:text-5xl p-5 sm:p-10">
          🎬 {films.title}
        </div>
        <FindFilms nameFilm={nameFilm} setNameFilm={setNameFilm} />
        <FilterFilms onChange={setSelectGenre} />
      </div>
      <div className="px-[30px] md:px-[60px]">
        {isLoading ? (
          <div className="grid py-[60px] font-graphik sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-center min-h-screen">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredMovies && filteredMovies.length > 0 ? (
          <div className="grid py-[60px] font-graphik sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-center min-h-screen max-w-screen-2xl mx-auto px-4">
            {filteredMovies?.map((film) => (
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
