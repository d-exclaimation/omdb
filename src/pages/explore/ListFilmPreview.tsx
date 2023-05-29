import { type FC } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
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
      className="flex flex-row w-full items-center flex-shrink-0 overflow-hidden gap-2 bg-white dark:bg-zinc-900 rounded group 
      border border-zinc-500/10 hover:border-zinc-500/25"
    >
      <div className="object-cover h-28 md:h-32 w-24 md:w-[unset] md:aspect-square rounded-l overflow-hidden">
        <Img
          className="object-cover h-28 md:h-32 w-24 md:w-[unset] md:aspect-square rounded-l transition-all group-hover:scale-110"
          src={`${api}/films/${filmId}/image?${stamp}`}
          fallback={title}
          alt={title}
        />
      </div>
      <div className="flex flex-col h-full justify-around w-full gap-1 py-2 px-2">
        <h3 className="max-w-[90%] dark:text-white font-semibold group-hover:text-zinc-500 group-hover:underline truncate text-sm md:text-base">
          {title}
        </h3>

        <div className="flex flex-row w-full items-center justify-start">
          <Img
            className="w-4 h-4 md:w-5 md:h-5 rounded-full mr-1"
            src={`${api}/users/${directorId}/image?${user}`}
            fallback={`${directorFirstName}${directorLastName}`}
            alt={`${directorFirstName}${directorLastName}`}
          />
          <div className="flex flex-row justify-start gap-3 text-zinc-500 text-xs md:text-sm">
            <span className="max-w-[28rem] truncate">
              {directorFirstName} {directorLastName}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 h-max gap-3 pr-1 text-xs">
          <div className="flex items-center justify-end text-xs gap-2">
            <span className="px-1 rounded bg-zinc-200 text-zinc-900">
              {genres.get(genreId)?.name ?? "Unknown"}
            </span>
            <span
              className={`px-1 rounded
              ${ageRatingToColor(ageRating).bg} 
              ${ageRatingToColor(ageRating).text}`}
            >
              {ageRating}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 gap-3 pr-1 text-xs">
          <span className="md:hidden">
            {releaseDate.toLocaleDateString("en-NZ")}
          </span>
          <span className="hidden md:inline">
            {releaseDate.toLocaleString("en-NZ")}
          </span>
          <span className="flex items-center">
            <img
              className="w-3 h-3 mr-[.125rem] dark:content-[url('/icons/star-selected.svg')]"
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
