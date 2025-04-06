import Button from "@/components/Button";

interface IFilterFilmProps {
  onChange: (genre: string) => void;
}

const genres = [
  "Romance",
  "Thriller",
  "Adventure",
  "Family",
  "Crime",
  "Comedy",
  "Horror",
  "Drama",
];

export default function FilterFilms({ onChange }: IFilterFilmProps) {
  return (
    <div className="relative flex flex-wrap justify-center md:flex-nowrap border-b-[2px] border-amber-400 sm:border-0 gap-5 py-5 text-amber-200 text-md z-10">
      <Button className="hover:underline hover:cursor-pointer" onClick={() => onChange("")}>
        All
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.toLowerCase()}
          className="hover:underline hover:cursor-pointer"
          onClick={() => onChange(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
