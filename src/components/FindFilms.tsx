interface IFindFilmsProps {
  nameFilm: string;
  setNameFilm: (value: string) => void;
}

export default function FindFilms(props: IFindFilmsProps) {
  const { setNameFilm, nameFilm } = props;
  return (
    <form className="relative text-center z-10">
      <input
        className="h-10 w-[200px] sm:w-[300px] rounded-lg p-5 bg-white"
        value={nameFilm}
        id="name"
        type="text"
        placeholder="Search film..."
        onChange={(event) => setNameFilm(event.target.value)}
      />
    </form>
  );
}
