import { type FC } from "react";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { ageRatings } from "../../common/utils/constants";
import { type FilmDetail } from "../../types/film";

const FilmDetails: FC<FilmDetail> = (data) => {
  const genres = useGenres();
  const { film: stamp } = useCacheControl();

  return (
    <div className="w-full max-w-3xl h-max bg-white flex overflow-hidden flex-col rounded-lg">
      <Img
        className="w-full h-48 md:h-64 object-cover"
        src={`${api}/films/${data.filmId}/image?${stamp}`}
        fallback={data.title}
        alt={data.title}
      />
      <div className="flex w-full flex-col p-6 md:p-8">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl max-w-[60%] truncate font-semibold">
            {data.title}
          </h3>
          <h4 className="text-xs md:text-sm font-light">
            <span className="hidden md:inline-block">
              {data.releaseDate.toLocaleString("en-NZ")}
            </span>
            <span className="md:hidden">
              {data.releaseDate.toLocaleDateString("en-NZ")}
            </span>
          </h4>
        </div>
        <div className="flex flex-row w-full justify-start gap-3 my-2 text-xs">
          <span className="px-3 py-1 rounded-lg bg-zinc-200 text-zinc-900">
            {genres.get(data.genreId)?.name ?? "Unknown"}
          </span>
          <span
            className={`px-3 py-1 rounded-lg
            ${ageRatingToColor(data.ageRating).bg} 
            ${ageRatingToColor(data.ageRating).text}`}
          >
            {ageRatings[data.ageRating as keyof typeof ageRatings]}
          </span>
        </div>
        <div className="flex flex-wrap break-words text-sm my-2 text-zinc-600">
          {data.description ? (
            data.description
          ) : (
            <span className="italic text-zinc-400">No description given</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
