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
    <div className="w-full flex items-center overflow-x-auto mb-2 h-max gap-2 py-2">
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
            className="flex flex-shrink-0 w-64 h-full flex-col p-2 border shadow-sm gap-1 rounded-lg"
            key={`review-${reviewerId}`}
          >
            <div className="flex w-full flex-row gap-2 items-center">
              <Img
                className="rounded-full w-8 h-8 object-cover"
                src={`${api}/users/${reviewerId}/image`}
                fallback={`${reviewerFirstName}${reviewerLastName}`}
                alt={reviewerFirstName}
              />
              <div className="flex flex-col items-start max-w-[70%]">
                <span className="font-semibold max-w-full truncate text-sm">
                  {reviewerFirstName} {reviewerLastName}
                </span>
                <span className="font-light text-xs">
                  {timestamp.toLocaleDateString("en-NZ")}
                </span>
              </div>
            </div>
            <div className="flex px-2 py-2 text-sm flex-wrap break-words w-full">
              {reviewContent ? (
                <span>{reviewContent}</span>
              ) : (
                <span className="text-zinc-600 italic">No comment</span>
              )}
            </div>
            <div className="flex mt-auto px-2 py-1 justify-end items-center text-xs flex-wrap break-words truncate w-full">
              <img className="w-3 h-3 mr-[.125rem]" src="/icons/star.svg" />
              {rating.toFixed(2)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewCaraousel;
