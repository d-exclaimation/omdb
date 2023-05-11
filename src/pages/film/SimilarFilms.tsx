import { type FC } from "react";
import useQuery from "swr";
import { similarFilms } from "../../api/film";
import FilmsCaraousel from "../gallery/FilmsCaraousel";

type SimilarFilmsProps = {
  filmId: number;
  directorId: number;
  genreId: number;
};

const SimilarFilms: FC<SimilarFilmsProps> = ({
  genreId,
  directorId,
  filmId,
}) => {
  const { data, isLoading } = useQuery(
    similarFilms.keys([`${genreId}`, `${directorId}`, `${filmId}`]),
    similarFilms.fn
  );
  return (
    <FilmsCaraousel
      title="Similar Films"
      empty={{
        message: "No films similar to this one",
        action: {
          label: "Explore all films",
          kind: "link",
          href: "/explore",
        },
      }}
      films={data?.films ?? []}
      isLoading={isLoading}
    />
  );
};

export default SimilarFilms;
