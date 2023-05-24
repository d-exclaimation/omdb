import { match, type Union } from "@d-exclaimation/common/union";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { type FilmSearch } from "../../types/film";
import FilmPreview from "./FilmPreview";
import SkeletonFilmPreview from "./SkeletonFilmPreview";

type FilmCaraouselProps = {
  title: string;
  isLoading: boolean;
  films: FilmSearch["films"];
  empty: {
    message: string;
    action?: Union<{
      link: { label: string; href: string };
      action: { label: string; onClick: () => void };
    }>;
  };
};

const FilmsCaraousel: FC<FilmCaraouselProps> = ({
  title,
  empty,
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
          [1, 2, 3, 4, 5].map((i) => <SkeletonFilmPreview key={i} />)
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center pt-6 pb-4">
            <h3 className="font-bold text-base">No films here</h3>
            <span className="text-sm my-2 text-zinc-500">{empty.message}</span>
            {empty.action &&
              match(empty.action, {
                link: ({ label, href }) => (
                  <Link
                    to={href}
                    className="text-xs text-zinc-700 border-b-[1px] border-zinc-500 transition-all
                    hover:text-zinc-500 hover:border-zinc-500 active:text-zinc-500 active:border-zinc-500"
                  >
                    {label} &rarr;
                  </Link>
                ),
                action: ({ label, onClick }) => (
                  <button
                    type="button"
                    onClick={onClick}
                    className="text-xs text-zinc-700 border-b-[1px] border-zinc-500 transition-all
                    hover:text-zinc-500 hover:border-zinc-500 active:text-zinc-500 active:border-zinc-500"
                  >
                    {label} &rarr;
                  </button>
                ),
              })}
          </div>
        )}
      </section>
    </div>
  );
};

export default FilmsCaraousel;
