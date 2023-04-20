import { useMemo, type FC } from "react";
import { type filmGallery } from "../../api/film";
import { useGenres } from "../../common/context/genre/useGenres";
import { ageRatingToColor } from "../../common/utils/ageRating";

type RecentOverviewProps = {
  data?: Awaited<ReturnType<typeof filmGallery>>;
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
    const sorted = data?.films?.sort((a, b) => b.rating - a.rating) ?? [];
    return sorted.at(0);
  }, [data]);

  const mostRecent = useMemo(() => data?.films?.at(0), [data]);
  return (
    <div className="w-full max-w-2xl min-h-max gap-2 bg-white flex flex-col items-start overflow-x-hidden rounded-lg p-6 md:p-8">
      <div className="flex flex-row items-center justify-start w-full mb-2">
        <h3 className="font-semibold text-xl">Dashboard</h3>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-start md:items-center overflow-x-auto md:h-28 gap-3">
        <div className="rounded-lg border h-[6.5rem] w-full md:w-48 flex-shrink-0 bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Most popular genre
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="text-xl max-w-full truncate font-bold">
              {mostGenre.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {mostGenre.count} film(s)
            </p>
          </div>
        </div>

        <div className="rounded-lg border h-[6.5rem] w-full md:w-48  flex-shrink-0 bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Most recent release
            </h3>
          </div>
          <div className="p-4 pt-0">
            {mostRecent ? (
              <>
                <div className="text-xl max-w-full truncate font-bold bg-gradient-to-l from-yellow-500 via-yellow-500 to-lime-500 text-transparent bg-clip-text">
                  {mostRecent.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  Released {mostRecent.releaseDate.toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <div className="text-xl max-w-full truncate font-bold">
                  None
                </div>
                <p className="text-xs text-muted-foreground">
                  No film directed yet
                </p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border h-[6.5rem]w-full md:w-48 flex-shrink-0 bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Most popular age rating
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div
              className={`text-xl max-w-full truncate font-bold ${
                ageRatingToColor(mostAgeRating.name).text
              }`}
            >
              {mostAgeRating.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {mostAgeRating.count} film(s)
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center md:justify-start md:items-center overflow-x-auto md:h-28 gap-3">
        <div className="rounded-lg border h-[6.5rem] w-full md:w-[24.75rem] flex-shrink-0 bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Highest rated film
            </h3>
          </div>
          <div className="p-4 pt-0">
            {highestRated ? (
              <>
                <div className="text-xl max-w-full truncate font-bold bg-gradient-to-l from-red-600 via-red-600 to-blue-600 text-transparent bg-clip-text">
                  {highestRated.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  Rated {highestRated.rating} out of 10
                </p>
              </>
            ) : (
              <>
                <div className="text-xl max-w-full truncate font-bold">
                  None
                </div>
                <p className="text-xs text-muted-foreground">
                  No film directed yet
                </p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border h-[6.5rem] w-full md:w-48  flex-shrink-0 bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Total films directed
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="text-xl max-w-full truncate font-bold">
              {data?.count}
            </div>
            <p className="text-xs text-muted-foreground">
              {data?.count === 1 ? "film" : "films"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOverview;
