import { type FC } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { tw } from "../../common/utils/tailwind";
import { type FilmSearch } from "../../types/film";

type FlexibleFilmPreviewProps = FilmSearch["films"][number];

const ListFilmPreview: FC<FlexibleFilmPreviewProps> = ({
  filmId,
  title,
  genreId,
  ageRating,
  rating,
  releaseDate,
  directorId,
  directorFirstName,
  directorLastName,
}) => {
  const genres = useGenres();
  const { film: stamp, user } = useCacheControl();
  return (
    <Link
      key={filmId}
      to={`/film?id=${filmId}`}
      className={tw(`group flex w-full flex-shrink-0 flex-row items-center 
      gap-2 overflow-hidden rounded border border-zinc-500/10 
      bg-white hover:border-zinc-500/25 dark:bg-zinc-900`)}
    >
      <div className="h-28 w-24 overflow-hidden rounded-l object-cover md:aspect-square md:h-32 md:w-[unset]">
        <Img
          className="h-28 w-24 rounded-l object-cover transition-all group-hover:scale-110 md:aspect-square md:h-32 md:w-[unset]"
          src={`${api}/films/${filmId}/image?${stamp}`}
          fallback={title}
          alt={title}
        />
      </div>
      <div className="flex h-full w-full flex-col justify-around gap-1 px-2 py-2">
        <h3
          className={tw(`max-w-[90%] truncate text-sm font-semibold 
          group-hover:text-zinc-500 group-hover:underline dark:text-white md:text-base`)}
        >
          {title}
        </h3>

        <div className="flex w-full flex-row items-center justify-start">
          <Img
            className="mr-1 h-4 w-4 rounded-full md:h-5 md:w-5"
            src={`${api}/users/${directorId}/image?${user}`}
            fallback={`${directorFirstName}${directorLastName}`}
            alt={`${directorFirstName}${directorLastName}`}
          />
          <div className="flex flex-row justify-start gap-3 text-xs text-zinc-500 md:text-sm">
            <span className="max-w-[28rem] truncate">
              {directorFirstName} {directorLastName}
            </span>
          </div>
        </div>
        <div className="flex h-max flex-row justify-between gap-3 pr-1 text-xs text-zinc-400">
          <div className="flex items-center justify-end gap-2 text-xs">
            <span className="rounded bg-zinc-200 px-1 text-zinc-900">
              {genres.get(genreId)?.name ?? "Unknown"}
            </span>
            <span
              className={`rounded px-1
              ${ageRatingToColor(ageRating).bg} 
              ${ageRatingToColor(ageRating).text}`}
            >
              {ageRating}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3 pr-1 text-xs text-zinc-400">
          <span className="md:hidden">
            {releaseDate.toLocaleDateString("en-NZ")}
          </span>
          <span className="hidden md:inline">
            {releaseDate.toLocaleString("en-NZ")}
          </span>
          <span className="flex items-center">
            <img
              className="mr-[.125rem] h-3 w-3 dark:content-[url('/icons/star-selected.svg')]"
              src="/icons/star.svg"
            />
            {rating <= 0 ? "N/A" : rating.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListFilmPreview;
