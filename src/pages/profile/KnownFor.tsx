import { type FC } from "react";
import { FilmSearch } from "../../api/film";
import FilmsCaraousel from "../gallery/FilmsCaraousel";

type KnownForProps = {
  isLoading: boolean;
  films: FilmSearch["films"];
};

const KnownFor: FC<KnownForProps> = ({ films, isLoading }) => {
  return (
    <FilmsCaraousel
      title="Top 5 films you made"
      emptyMessage="There's no films you have directed yet"
      films={films}
      isLoading={isLoading}
    />
  );
};

export default KnownFor;
