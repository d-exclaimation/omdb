import { useMemo, type FC } from "react";
import useQuery from "swr";
import { filmReviews } from "../../api/film";
import ChartBar from "../../common/components/ChartBar";
import { ratingToColor } from "../../common/utils/color";
import ReviewCaraousel from "./ReviewCaraousel";

type FilmReviewsProps = {
  id: string;
  rating: number;
  reviews: number;
};

const FilmReviews: FC<FilmReviewsProps> = ({ id, rating, reviews }) => {
  const { data, isLoading } = useQuery(["films", "review", id], filmReviews);

  const allReviews = useMemo(() => data ?? [], [data]);
  const recentReviews = useMemo(() => allReviews.slice(0, 7), [allReviews]);

  return (
    <div className="w-full max-w-2xl h-max bg-white flex overflow-hidden flex-col rounded-lg p-6 py-4 md:p-8 md:py-6">
      <div className="w-full flex items-center mb-2">
        <h3 className="text-lg font-semibold">Reviews and Ratings</h3>
      </div>
      <div className="w-full rounded-lg shadow-sm border flex flex-col md:flex-row justify-center md:justify-between md:items-center overflow-x-auto md:h-28 md:gap-3">
        <div className="h-[6.5rem] w-full md:w-48 flex-shrink-0">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-1">
            <h3 className="tracking-tight text-sm font-medium">Rating</h3>
          </div>
          <div className="p-4 pt-0">
            <div className="text-xl max-w-full truncate font-bold">
              {reviews === 0 ? (
                "N/A"
              ) : (
                <>
                  <span className={ratingToColor(rating)}>{rating}</span> / 10
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              from {reviews} review(s)
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex h-[6.5rem] pb-2 md:py-2 mx-4 gap-1 items-end justify-start">
            {reviews > 0 ? (
              recentReviews.map(({ reviewerId, rating }) => (
                <ChartBar
                  key={`chart-${reviewerId}`}
                  percentage={rating / 10}
                />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
            No reviews yet
          </div>
        </div>
      </div>

      <ReviewCaraousel reviews={allReviews} isLoading={isLoading} />
    </div>
  );
};

export default FilmReviews;
