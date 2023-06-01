import { useMemo, type FC } from "react";
import ChartBar from "../../common/components/ChartBar";
import { ratingToColor } from "../../common/utils/color";
import { tw } from "../../common/utils/tailwind";
import { type FilmSearch } from "../../types/film";

type RatingOverviewProps = {
  data?: FilmSearch;
};

const RatingOverview: FC<RatingOverviewProps> = ({ data }) => {
  const recentRatings = useMemo(
    () =>
      data?.films
        ?.filter(({ rating }) => rating > 0)
        ?.map(({ rating, filmId }) => ({ rating, filmId }))
        ?.slice(0, 7) ?? [],
    [data]
  );

  const recentAverageRating = useMemo(
    () =>
      recentRatings.length > 0
        ? recentRatings.reduce((acc, { rating }) => acc + rating, 0) /
          recentRatings.length
        : 0,
    [recentRatings]
  );

  return (
    <div
      className={tw(`flex min-h-max w-full max-w-3xl flex-col 
      items-start gap-2 overflow-x-hidden rounded-lg bg-white 
      p-6 dark:bg-zinc-900 dark:text-white md:p-8`)}
    >
      <div className="mb-2 flex w-full flex-row items-center justify-start">
        <h3 className="text-xl font-semibold">Recent performance</h3>
      </div>
      <div
        className={tw(`flex w-full flex-col justify-center overflow-x-auto 
        rounded-lg border shadow-sm dark:border-white/30 md:h-28 
        md:flex-row md:items-center md:justify-between md:gap-3`)}
      >
        <div className="h-[6.5rem] w-full flex-shrink-0 md:w-48">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight">
              Average rating
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="max-w-full truncate text-xl font-bold">
              {recentRatings.length === 0 ? (
                "N/A"
              ) : (
                <>
                  <span className={ratingToColor(recentAverageRating)}>
                    {recentAverageRating.toFixed(3)}
                  </span>{" "}
                  / 10
                </>
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              for the recent {recentRatings.length} films
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="mx-4 flex h-[6.5rem] flex-row items-end justify-start gap-1 pb-2 md:py-2">
            {recentRatings.length > 0 ? (
              recentRatings.map(({ rating, filmId }) => (
                <ChartBar key={`chart-f-${filmId}`} percentage={rating / 10} />
              ))
            ) : (
              <>
                <ChartBar percentage={8 / 10} inactive />
                <ChartBar percentage={4 / 10} inactive />
                <ChartBar percentage={2 / 10} inactive />
                <ChartBar percentage={9 / 10} inactive />
                <ChartBar percentage={1 / 10} inactive />
                <ChartBar percentage={8 / 10} inactive />
                <ChartBar percentage={4.5 / 10} inactive />
              </>
            )}
          </div>
          {recentRatings.length <= 0 ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
              No reviews yet
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
