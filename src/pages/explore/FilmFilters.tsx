import { type FC } from "react";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { Sorting } from "../../types/constants";
import FilmAgeRatingFilter from "./FilmAgeRatingFilter";
import FilmGenreFilter from "./FilmGenreFilter";
import FilmSort from "./FilmSort";

type FilmFiltersProps = {
  sort: Sorting;
  onSortChange: (sort: Sorting) => void;
  genreIds: number[];
  onAddGenre: (genreId: number) => void;
  onRemoveGenre: (genreId: number) => void;
  ratings: string[];
  onAddAgeRating: (rating: string) => void;
  onRemoveAgeRating: (rating: string) => void;
};

const FilmFilters: FC<FilmFiltersProps> = ({
  sort,
  onSortChange,
  genreIds,
  onAddGenre,
  onRemoveGenre,
  ratings,
  onAddAgeRating,
  onRemoveAgeRating,
}) => {
  const genres = useGenres();
  return (
    <div className="w-full h-max flex items-start justify-start flex-row rounded-lg max-w-3xl gap-3">
      <FilmSort sort={sort} onSortChange={onSortChange} />

      <FilmGenreFilter
        genreIds={genreIds}
        onAddGenreId={onAddGenre}
        onRemoveGenreId={onRemoveGenre}
      />

      <FilmAgeRatingFilter
        ratings={ratings}
        onAddAgeRating={onAddAgeRating}
        onRemoveAgeRating={onRemoveAgeRating}
      />

      <div
        className="w-max h-full mt-2 md:flex items-start justify-center hidden data-[empty='true']:hidden"
        data-empty={genreIds.length + ratings.length <= 0}
      >
        <div className="w-[1px] h-6 bg-zinc-400"></div>
      </div>

      <div className="w-full hidden md:flex flex-row overflow-x-auto gap-2">
        {genreIds.map((genreId) => (
          <button
            type="button"
            key={genreId}
            className="px-4 py-2 rounded-full text-sm bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 w-max flex-shrink-0 animate-slide-right"
            onClick={() => onRemoveGenre(genreId)}
          >
            {genres.get(genreId)?.name} <span className="ml-2">✕</span>
          </button>
        ))}
        {ratings.map((rating) => (
          <button
            type="button"
            key={rating}
            className={`px-4 py-2 rounded-full text-smfont-medium w-max flex-shrink-0 
            ${ageRatingToColor(rating).text} 
            ${ageRatingToColor(rating).bg} 
            animate-slide-right`}
            onClick={() => onRemoveAgeRating(rating)}
          >
            {rating} <span className="ml-2">✕</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilmFilters;
