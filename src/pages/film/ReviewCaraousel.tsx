import { type FC } from "react";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { type FilmReviews } from "../../types/film";

type ReviewCaraouselProps = {
  reviews: FilmReviews;
  isLoading?: boolean;
};

const ReviewCaraousel: FC<ReviewCaraouselProps> = ({ reviews, isLoading }) => {
  return (
    <div className="mb-2 flex h-max w-full items-center gap-2 overflow-x-auto py-2">
      {isLoading ? <LoadingIndicator /> : null}
      {reviews.map(
        ({
          rating,
          review: reviewContent,
          reviewerFirstName,
          reviewerId,
          reviewerLastName,
          timestamp,
        }) => (
          <div
            className="flex h-full w-64 flex-shrink-0 flex-col gap-1 rounded-lg border p-2 shadow-sm dark:border-white/30"
            key={`review-${reviewerId}`}
          >
            <div className="flex w-full flex-row items-center gap-2">
              <Img
                className="h-8 w-8 rounded-full object-cover"
                src={`${api}/users/${reviewerId}/image`}
                fallback={`${reviewerFirstName}${reviewerLastName}`}
                alt={reviewerFirstName}
              />
              <div className="flex max-w-[70%] flex-col items-start dark:text-white">
                <span className="max-w-full truncate text-sm font-semibold">
                  {reviewerFirstName} {reviewerLastName}
                </span>
                <span className="text-xs font-light">
                  {timestamp.toLocaleString("en-NZ")}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-wrap break-words px-2 py-2 text-sm dark:text-white">
              {reviewContent ? (
                <>{reviewContent}</>
              ) : (
                <span className="italic text-zinc-600 dark:text-zinc-400">
                  No comment
                </span>
              )}
            </div>
            <div className="mt-auto flex w-full flex-wrap items-center justify-end truncate break-words px-2 py-1 text-xs dark:text-white">
              <img
                className="mr-[.125rem] h-3 w-3 content-[url('/icons/star-selected.svg')]"
                src="/icons/star.svg"
              />
              {rating.toFixed(2)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewCaraousel;
