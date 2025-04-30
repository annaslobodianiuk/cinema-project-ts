import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GenresResponse {
  genres: Genre[];
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  genres: Genre[];
  adult: boolean;
  original_language: string;
  origin_country: string[];
  release_date: string;
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGQxYjFiZTY1YzMxYzdhNDBlYjI1YjM0MmQ2NWYyZSIsIm5iZiI6MTc0MDE0NDgxMC44NjA5OTk4LCJzdWIiOiI2N2I4ODBhYTU1MDMyOTI3NTYyMjc5YzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yuL-eK0zF_IXBf6885Zhinrugq2LuHMn6_G24w5_rAw",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, void>({
      query: () => "movie/popular",
    }),
    getGenres: builder.query<GenresResponse, void>({
      query: () => "genre/movie/list",
    }),
    getMovieById: builder.query<MovieDetails, string>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetGenresQuery,
  useGetMovieByIdQuery,
} = movieApi;

export type { Movie, Genre, MoviesResponse, GenresResponse, MovieDetails };
