import { type FC } from "react";
import { FilmSearch } from "../../api/film";
import Button from "../../common/components/Button";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import FilmPreview from "./FilmPreview";

type FilmCaraouselProps = {
  title: string;
  isLoading: boolean;
  films: FilmSearch["films"];
  emptyMessage: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const FilmsCaraousel: FC<FilmCaraouselProps> = ({
  title,
  emptyMessage,
  films,
  isLoading,
  action,
}) => {
  return (
    <div className="w-full max-w-2xl max-h-max bg-white flex flex-col rounded-lg p-6 md:p-8">
      <section className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl">{title}</h2>
        {action ? (
          <Button
            color={{
              bg: "bg-zinc-200",
              text: "text-zinc-900",
              hover: "hover:bg-zinc-300",
              active: "active:bg-zinc-300",
              border: "focus-visible:ring-zinc-200",
            }}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ) : null}
      </section>
      <section className="w-full flex items-center justify-start gap-3 my-2 p-1 overflow-x-auto">
        {films.length ? (
          films.map((film) => <FilmPreview {...film} key={film.filmId} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center pt-6 pb-4 text-zinc-500">
            {emptyMessage}
          </div>
        )}
        {isLoading ? <LoadingIndicator /> : null}
      </section>
    </div>
  );
};

export default FilmsCaraousel;
