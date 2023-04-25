import { type FC } from "react";
import { Sorting } from "../../types/constants";
import FilmSort from "./FilmSort";
import FilmGenreFilter from "./FilmGenreFilter";
import FilmAgeRatingFilter from "./FilmAgeRatingFilter";
import { useGenres } from "../../common/context/genre/useGenres";

type FilmFiltersProps = {
  sort: Sorting
  onSortChange: (sort: Sorting) => void;
  genreIds: number[],
  onAddGenre: (genreId: number) => void;
  onRemoveGenre: (genreId: number) => void;
  ratings: string[];
  onAddAgeRating: (rating: string) => void;
  onRemoveAgeRating: (rating: string) => void;
};

const FilmFilters: FC<FilmFiltersProps> = ({ sort, onSortChange, genreIds, onAddGenre, onRemoveGenre, ratings, onAddAgeRating, onRemoveAgeRating }) => {
  const genres = useGenres();
  return (
    <div className="w-full h-max flex items-start justify-around md:justify-start flex-row rounded-lg max-w-3xl gap-3">
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
        <div
          className="w-[1px] h-6 bg-zinc-400"
        >
        </div>
      </div>

      <div className="w-full hidden md:flex flex-row overflow-x-auto gap-2">
        {genreIds.map((genreId) => (
          <button
            key={genreId}
            className="px-4 py-2 rounded-full text-sm bg-white text-black w-max flex-shrink-0"
            onClick={() => onRemoveGenre(genreId)}
          >
            {genres.get(genreId)?.name} <span className="ml-2">✕</span>
          </button>
        ))}
        {ratings.map((rating) => (
          <button
            key={rating}
            className="px-4 py-2 rounded-full text-sm bg-white text-black w-max flex-shrink-0"
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
