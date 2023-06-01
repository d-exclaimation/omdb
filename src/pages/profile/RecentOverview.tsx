import { useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/color";
import { tw } from "../../common/utils/tailwind";
import { type FilmSearch } from "../../types/film";

type RecentOverviewProps = {
  data?: FilmSearch;
};

const RecentOverview: FC<RecentOverviewProps> = ({ data }) => {
  const genres = useGenres();

  const mostAgeRating = useMemo(() => {
    const countMap = new Map<string, number>();
    data?.films?.forEach((film) => {
      countMap.set(film.ageRating, (countMap.get(film.ageRating) ?? 0) + 1);
    });

    const [ageRating, count] = [...countMap.entries()].reduce(
      (acc, [ageRating, count]) => (count > acc[1] ? [ageRating, count] : acc),
      ["TBC", 0]
    );
    return {
      name: ageRating ?? "TBC",
      count,
    };
  }, [data]);

  const mostGenre = useMemo(() => {
    const countMap = new Map<number, number>();
    data?.films?.forEach((film) => {
      countMap.set(film.genreId, (countMap.get(film.genreId) ?? 0) + 1);
    });

    const [genre, count] = [...countMap.entries()].reduce(
      (acc, [genreId, count]) => (count > acc[1] ? [genreId, count] : acc),
      [0, 0]
    );
    return {
      name: genres.get(genre)?.name ?? "None",
      count,
    };
  }, [data]);

  const highestRated = useMemo(() => {
    const sorted =
      [...(data?.films ?? [])].sort((a, b) => b.rating - a.rating) ?? [];
    return sorted.at(0);
  }, [data]);

  const mostRecent = useMemo(() => data?.films?.at(0), [data]);
  return (
    <div
      className={tw(`flex min-h-max w-full max-w-3xl flex-col 
      items-start gap-2 overflow-x-hidden rounded-lg bg-white 
      p-6 dark:bg-zinc-900 dark:text-white md:p-8`)}
    >
      <div className="mb-2 flex w-full flex-row items-center justify-start">
        <h3 className="text-xl font-semibold">Dashboard</h3>
      </div>
      <div
        className={tw(`flex w-full flex-col justify-center 
        gap-3 overflow-x-auto md:h-28 md:flex-row 
        md:items-center md:justify-start`)}
      >
        <div className="h-[6.5rem] w-full flex-shrink-0 rounded-lg border shadow-sm dark:border-white/30 md:w-52">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Most popular genre
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="max-w-full truncate text-xl font-bold">
              {mostGenre.name}
            </div>
            <p className="text-muted-foreground text-xs">
              {mostGenre.count} film(s)
            </p>
          </div>
        </div>

        <div
          className={tw(`h-[6.5rem] w-full flex-shrink-0 truncate 
          rounded-lg border shadow-sm dark:border-white/30 md:w-52`)}
        >
          <div className="flex w-full flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Most recent release
            </h3>
          </div>
          <div className="w-full p-4 pt-0">
            {mostRecent ? (
              <>
                <Link
                  to={`/film?id=${mostRecent.filmId}`}
                  className={tw(`block max-w-full truncate bg-gradient-to-r 
                  from-purple-600 via-indigo-500 to-blue-500 
                  bg-clip-text text-xl font-bold text-transparent 
                  dark:from-lime-400 dark:via-green-300 dark:to-emerald-300`)}
                >
                  {mostRecent.title}
                </Link>
                <p className="text-muted-foreground text-xs">
                  Released {mostRecent.releaseDate.toLocaleDateString("en-NZ")}
                </p>
              </>
            ) : (
              <>
                <div className="max-w-full truncate text-xl font-bold">
                  None
                </div>
                <p className="text-muted-foreground text-xs">
                  No film directed yet
                </p>
              </>
            )}
          </div>
        </div>

        <div className="h-[6.5rem] w-full flex-shrink-0 rounded-lg border shadow-sm dark:border-white/30 md:w-52">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Most popular age rating
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div
              className={`max-w-full truncate text-xl font-bold brightness-200
              ${ageRatingToColor(mostAgeRating.name).text}`}
            >
              {mostAgeRating.name}
            </div>
            <p className="text-muted-foreground text-xs">
              {mostAgeRating.count} film(s)
            </p>
          </div>
        </div>
      </div>

      <div
        className={tw(`flex w-full flex-col justify-center
        gap-3 overflow-x-auto md:h-28 md:flex-row 
        md:items-center md:justify-start`)}
      >
        <div
          className={tw(`h-[6.5rem] w-full flex-shrink-0 rounded-lg
          border shadow-sm dark:border-white/30 md:w-[26.75rem]`)}
        >
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Highest rated film
            </h3>
          </div>
          <div className="p-4 pt-0">
            {highestRated ? (
              <>
                <Link
                  to={`/film?id=${highestRated.filmId}`}
                  className={tw(`block max-w-full truncate bg-gradient-to-r
                  from-purple-600 via-indigo-500 to-blue-500
                  bg-clip-text text-xl font-bold text-transparent 
                  dark:from-lime-400 dark:via-green-300 dark:to-emerald-300`)}
                >
                  {highestRated.title}
                </Link>
                <p className="text-muted-foreground text-xs">
                  Rated {highestRated.rating} out of 10
                </p>
              </>
            ) : (
              <>
                <div className="max-w-full truncate text-xl font-bold">
                  None
                </div>
                <p className="text-muted-foreground text-xs">
                  No film directed yet
                </p>
              </>
            )}
          </div>
        </div>

        <div className="h-[6.5rem] w-full flex-shrink-0 rounded-lg border shadow-sm dark:border-white/30 md:w-52">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Total films directed
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="max-w-full truncate text-xl font-bold">
              {data?.count}
            </div>
            <p className="text-muted-foreground text-xs">
              {data?.count === 1 ? "film" : "films"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOverview;
