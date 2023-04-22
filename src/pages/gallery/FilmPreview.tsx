import { type FC } from "react";
import { Link } from "react-router-dom";
import { type FilmSearch } from "../../api/film";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";

type FilmPreviewProps = FilmSearch["films"][number];

const FilmPreview: FC<FilmPreviewProps> = ({
  filmId,
  title,
  genreId,
  ageRating,
  rating,
  releaseDate,
  directorFirstName,
  directorLastName,
}) => {
  const genres = useGenres();
  const { film: stamp } = useCacheControl();
  return (
    <Link
      key={filmId}
      to={`/film?id=${filmId}`}
      className="flex flex-col w-64 flex-shrink-0 h-full overflow-hidden bg-white rounded group"
    >
      <div className="object-cover w-64 h-48 rounded overflow-hidden">
        <Img
          className="object-cover w-64 h-48 rounded transition-all group-hover:scale-110"
          src={`${api}/films/${filmId}/image?${stamp}`}
          fallback={title}
          alt={title}
        />
      </div>
      <div className="flex flex-col w-full gap-1 py-2">
        <h3 className="max-w-[90%] font-semibold group-hover:text-zinc-500 group-hover:underline truncate text-sm">
          {title}
        </h3>
        <div className="flex flex-row justify-between gap-3 text-zinc-500 text-xs">
          <span className="max-w-[32rem] truncate">
            {directorFirstName} {directorLastName}
          </span>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 h-max gap-3 pr-1 text-xs">
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
        <div className="flex flex-row justify-between text-zinc-400 gap-3 pr-1 text-xs">
          <span>{releaseDate.toLocaleDateString()}</span>
          <span className="flex items-center">
            <img className="w-3 h-3 mr-[.125rem]" src="/icons/star.svg" />
            {rating.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FilmPreview;
