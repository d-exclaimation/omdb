import { type FC } from "react";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { type FilmSearch } from "../../types/film";
import FilmPreview from "./FilmPreview";

type FilmCaraouselProps = {
  title: string;
  isLoading: boolean;
  films: FilmSearch["films"];
  emptyMessage: string;
};

const FilmsCaraousel: FC<FilmCaraouselProps> = ({
  title,
  emptyMessage,
  films,
  isLoading,
}) => {
  return (
    <div className="w-full max-w-3xl max-h-max bg-white flex flex-col rounded-lg p-6 md:p-8">
      <section className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl md:text-2xl">{title}</h2>
      </section>
      <section className="w-full flex items-center h-max justify-start gap-3 my-2 p-1 overflow-x-auto">
        {films.length ? (
          films.map((film) => <FilmPreview {...film} key={film.filmId} />)
        ) : isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="w-full h-full flex items-center justify-center pt-6 pb-4 text-zinc-500">
            {emptyMessage}
          </div>
        )}
      </section>
    </div>
  );
};

export default FilmsCaraousel;
