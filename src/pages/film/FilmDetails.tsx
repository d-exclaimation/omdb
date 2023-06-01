import { type FC } from "react";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { useToggle } from "../../common/hooks/useToggle";
import { ageRatingToColor } from "../../common/utils/color";
import { ageRatings } from "../../common/utils/constants";
import { tw } from "../../common/utils/tailwind";
import { type FilmDetail } from "../../types/film";
import FilmPosterDialog from "./FilmPosterDialog";

const FilmDetails: FC<FilmDetail> = (data) => {
  const genres = useGenres();
  const { film: stamp } = useCacheControl();
  const [show, { open, close }] = useToggle();

  return (
    <div className="flex h-max w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white dark:bg-zinc-900">
      <FilmPosterDialog
        previewing={show}
        filmId={data.filmId}
        fallback={data.title}
        onClose={close}
      />
      <button className="w-full" onClick={open}>
        <Img
          className="h-48 w-full object-cover md:h-72"
          src={`${api}/films/${data.filmId}/image?${stamp}`}
          fallback={data.title}
          alt={data.title}
        />
      </button>
      <div className="flex w-full flex-col p-6 md:p-8">
        <div className="flex w-full flex-row justify-between">
          <h3 className="max-w-[60%] truncate text-xl font-semibold dark:text-white">
            {data.title}
          </h3>
          <h4 className="text-xs font-light md:text-sm">
            <span className="hidden dark:text-white md:inline-block">
              {data.releaseDate.toLocaleString("en-NZ")}
            </span>
            <span className="dark:text-white md:hidden">
              {data.releaseDate.toLocaleDateString("en-NZ")}
            </span>
          </h4>
        </div>
        <div className="my-2 flex w-full flex-row justify-start gap-3 text-xs">
          <span className="rounded-lg bg-zinc-200 px-3 py-1 text-zinc-900">
            {genres.get(data.genreId)?.name ?? "Unknown"}
          </span>
          <span
            className={tw(
              "rounded-lg px-3 py-1",
              ageRatingToColor(data.ageRating).bg,
              ageRatingToColor(data.ageRating).text
            )}
          >
            {ageRatings[data.ageRating as keyof typeof ageRatings]}
          </span>
        </div>
        <div className="my-2 flex flex-wrap break-words text-sm text-zinc-600 dark:text-zinc-400">
          {data.description ? (
            data.description
          ) : (
            <span className="italic text-zinc-400 dark:text-zinc-600">
              No description given
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
