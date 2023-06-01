import { match, type Union } from "@d-exclaimation/common/union";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { tw } from "../../common/utils/tailwind";
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
    <div className="flex max-h-max w-full max-w-3xl flex-col rounded-lg bg-white p-6 dark:bg-zinc-900 md:p-8">
      <section className="flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white md:text-2xl">
          {title}
        </h2>
      </section>
      <section className="my-2 flex h-max w-full items-center justify-start gap-3 overflow-x-auto p-1">
        {films.length ? (
          films.map((film) => <FilmPreview {...film} key={film.filmId} />)
        ) : isLoading ? (
          [1, 2, 3, 4, 5].map((i) => <SkeletonFilmPreview key={i} />)
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center pb-4 pt-6">
            <h3 className="text-base font-bold dark:text-white">
              No films here
            </h3>
            <span className="my-2 text-sm text-zinc-500">{empty.message}</span>
            {empty.action &&
              match(empty.action, {
                link: ({ label, href }) => (
                  <Link
                    to={href}
                    className={tw(`border-b-[1px] border-zinc-500 text-xs text-zinc-700 
                    transition-all hover:border-zinc-500 hover:text-zinc-500 
                    active:border-zinc-500 active:text-zinc-500 dark:text-zinc-300`)}
                  >
                    {label} &rarr;
                  </Link>
                ),
                action: ({ label, onClick }) => (
                  <button
                    type="button"
                    onClick={onClick}
                    className={tw(`border-b-[1px] border-zinc-500 text-xs text-zinc-700
                    transition-all hover:border-zinc-500 hover:text-zinc-500
                    active:border-zinc-500 active:text-zinc-500 dark:text-zinc-300`)}
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
