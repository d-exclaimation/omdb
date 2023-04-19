import { type FC } from "react";
import { FilmSearch } from "../../api/film";
import FilmsCaraousel from "../gallery/FilmsGallery";

type KnownForProps = {
  isLoading: boolean;
  films: FilmSearch["films"];
  cachestamp?: string;
};

const KnownFor: FC<KnownForProps> = ({ films, isLoading, cachestamp }) => {
  return (
    <FilmsCaraousel
      title="Known for"
      emptyMessage="There's no films you have directed yet"
      films={films}
      isLoading={isLoading}
      cachestamp={cachestamp}
    />
  );
};

export default KnownFor;
