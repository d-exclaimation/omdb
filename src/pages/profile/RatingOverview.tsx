import { useMemo, type FC } from "react";
import ChartBar from "../../common/components/ChartBar";
import { ratingToColor } from "../../common/utils/color";
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
    <div className="w-full max-w-3xl min-h-max gap-2 bg-white dark:bg-zinc-900 dark:text-white flex flex-col items-start overflow-x-hidden rounded-lg p-6 md:p-8">
      <div className="flex flex-row items-center justify-start w-full mb-2">
        <h3 className="font-semibold text-xl">Recent performance</h3>
      </div>
      <div className="w-full rounded-lg shadow-sm border dark:border-white/30 flex flex-col md:flex-row justify-center md:justify-between md:items-center overflow-x-auto md:h-28 md:gap-3">
        <div className="h-[6.5rem] w-full md:w-48 flex-shrink-0">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">
              Average rating
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="text-xl max-w-full truncate font-bold">
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
            <p className="text-xs text-muted-foreground">
              for the recent {recentRatings.length} films
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex h-[6.5rem] pb-2 md:py-2 mx-4 gap-1 items-end flex-row justify-start">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
              No reviews yet
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
