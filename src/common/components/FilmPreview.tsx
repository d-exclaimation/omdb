import { type FC } from "react";
import { type FilmSearch } from "../../api/film";
import { api } from "../../api/url";
import { useGenres } from "../context/genre/useGenres";
import Img from "./Image";

type FilmPreviewProps = FilmSearch["films"][number] & {
  cachestamp?: string;
};

const FilmPreview: FC<FilmPreviewProps> = ({
  filmId,
  title,
  genreId,
  ageRating,
  rating,
  releaseDate,
  cachestamp,
}) => {
  const genres = useGenres();
  return (
    <div
      key={filmId}
      className="flex flex-col w-64 flex-shrink-0 overflow-hidden bg-white rounded"
    >
      <div className="object-cover w-64 h-48 rounded overflow-hidden">
        <Img
          className="object-cover w-64 h-48 rounded transition-all hover:scale-110"
          src={`${api}/films/${filmId}/image?${cachestamp ?? ""}`}
          fallback={title}
          alt={title}
        />
      </div>
      <div className="flex flex-col w-full gap-1 py-2">
        <h3 className="max-w-4xl font-semibold text-sm">{title}</h3>
        <div className="flex flex-row justify-between gap-3 text-zinc-500 text-xs">
          <span className="max-w-[32rem] truncate">First name Last Name</span>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 h-max gap-3 pr-1 text-xs">
          <span className="px-1 rounded bg-red-200 text-red-900">
            {genres.get(genreId)?.name ?? "Unknown"}
          </span>
          <span className="px-1 rounded bg-blue-200 text-blue-900">
            {ageRating}
          </span>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 gap-3 pr-1 text-xs">
          <span>{releaseDate.toLocaleDateString()}</span>
          <span>⭐️ {rating.toFixed(2)} </span>
        </div>
      </div>
    </div>
  );
};

export default FilmPreview;
