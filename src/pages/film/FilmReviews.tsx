import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "swr";
import { filmReviews } from "../../api/film";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import ChartBar from "../../common/components/ChartBar";
import { useToggle } from "../../common/hooks/useToggle";
import { ratingToColor } from "../../common/utils/color";
import { tw } from "../../common/utils/tailwind";
import ReviewCaraousel from "./ReviewCaraousel";
import ReviewFilmDialog from "./ReviewFilmDialog";

type FilmReviewsProps = {
  id: number;
  directorId: number;
  title: string;
  rating: number;
  reviews: number;
  releaseDate: Date;
};

const FilmReviews: FC<FilmReviewsProps> = ({
  id,
  title,
  rating,
  reviews,
  directorId,
  releaseDate,
}) => {
  const { user } = useAuth();
  const nav = useNavigate();
  const { data, isLoading } = useQuery(
    filmReviews.keys([`${id}`]),
    filmReviews.fn
  );
  const [reviewing, { open, close }] = useToggle();

  const allReviews = useMemo(() => data ?? [], [data]);
  const recentReviews = useMemo(() => allReviews.slice(0, 7), [allReviews]);

  const canReview = useMemo(
    () =>
      user?.id !== directorId &&
      releaseDate < new Date() &&
      allReviews.every((review) => review.reviewerId !== user?.id),
    [user, directorId, releaseDate, allReviews]
  );

  return (
    <div
      className={tw(`flex h-max w-full max-w-3xl flex-col overflow-hidden 
      rounded-lg bg-white p-6 py-4 dark:bg-zinc-900 md:p-8 md:py-6`)}
    >
      <div className="mb-2 flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">
          Reviews and Ratings
        </h3>
        <Button
          className={!canReview ? "hidden" : ""}
          color={{
            bg: "bg-zinc-200",
            text: "text-zinc-900",
            hover: "hover:bg-zinc-300",
            active: "active:bg-zinc-300",
            border: "focus-visible:ring-zinc-200",
          }}
          onClick={() => {
            if (!user) {
              nav(`/login?redirect=${encodeURIComponent(`/film?id=${id}`)}`);
              return;
            }
            open();
          }}
        >
          Review
        </Button>
      </div>
      <div
        className={tw(`flex w-full flex-col justify-center overflow-x-auto rounded-lg border shadow-sm 
        dark:border-white/30 md:h-28 md:flex-row md:items-center md:justify-between md:gap-3`)}
      >
        <div className="h-[6.5rem] w-full flex-shrink-0 md:w-48">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <h3 className="text-sm font-medium tracking-tight dark:text-white">
              Rating
            </h3>
          </div>
          <div className="p-4 pt-0">
            <div className="max-w-full truncate text-xl font-bold dark:text-white">
              {reviews === 0 ? (
                "N/A"
              ) : (
                <>
                  <span className={ratingToColor(rating)}>{rating}</span> / 10
                </>
              )}
            </div>
            <p className="text-muted-foreground text-xs dark:text-white">
              from {reviews} review(s)
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="mx-4 flex h-[6.5rem] items-end justify-start gap-1 pb-2 md:py-2">
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
          {reviews <= 0 ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium dark:text-white">
              No reviews yet
            </div>
          ) : null}
        </div>
      </div>

      <ReviewCaraousel reviews={allReviews} isLoading={isLoading} />
      <ReviewFilmDialog
        filmId={id}
        title={title}
        onClose={close}
        reviewing={reviewing}
      />
    </div>
  );
};

export default FilmReviews;
