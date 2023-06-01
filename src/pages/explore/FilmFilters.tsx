import { type FC } from "react";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { tw } from "../../common/utils/tailwind";
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
    <div className="flex h-max w-full max-w-3xl flex-row items-start justify-start gap-3 rounded-lg">
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
        className="mt-2 hidden h-full w-max items-start justify-center data-[empty='true']:hidden md:flex"
        data-empty={genreIds.length + ratings.length <= 0}
      >
        <div className="h-6 w-[1px] bg-zinc-400"></div>
      </div>

      <div className="hidden w-full flex-row gap-2 overflow-x-auto md:flex">
        {genreIds.map((genreId) => (
          <button
            type="button"
            key={genreId}
            className={tw(`w-max flex-shrink-0 animate-slide-right rounded-full bg-white 
            px-4 py-2 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400`)}
            onClick={() => onRemoveGenre(genreId)}
          >
            {genres.get(genreId)?.name} <span className="ml-2">✕</span>
          </button>
        ))}
        {ratings.map((rating) => (
          <button
            type="button"
            key={rating}
            className={tw(
              "text-smfont-medium w-max flex-shrink-0 animate-slide-right rounded-full px-4 py-2",
              ageRatingToColor(rating).text,
              ageRatingToColor(rating).bg
            )}
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
