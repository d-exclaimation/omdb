import { type FC } from "react";
import { type FilmDetail } from "../../api/film";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { ageRatings } from "../../common/utils/constants";

const FilmDetails: FC<FilmDetail> = (data) => {
  const genres = useGenres();
  const { film: stamp } = useCacheControl();

  return (
    <div className="w-full max-w-2xl h-max bg-white flex overflow-hidden flex-col rounded-lg">
      <Img
        className="w-full h-48 md:h-64 object-cover"
        src={`${api}/films/${data.filmId}/image?${stamp}`}
        fallback={data.title}
        alt={data.title}
      />
      <div className="flex w-full flex-col p-6 md:p-8">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl font-semibold">{data.title}</h3>
          <h3 className="text-sm font-light">
            {data.releaseDate.toLocaleDateString()}
          </h3>
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
        <div className="flex flex-wrap text-sm my-2 text-zinc-600">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;