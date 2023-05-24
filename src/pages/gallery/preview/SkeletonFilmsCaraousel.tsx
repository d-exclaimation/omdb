import { type FC } from "react";
import SkeletonFilmPreview from "../SkeletonFilmPreview";

type SkeletonFilmsCaraouselProps = {
  title: string;
};

const SkeletonFilmsCaraousel: FC<SkeletonFilmsCaraouselProps> = ({ title }) => {
  return (
    <div className="w-full relative max-w-3xl max-h-max bg-white flex flex-col rounded-lg p-6 md:p-8">
      <section className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl md:text-2xl">{title}</h2>
      </section>
      <section className="w-full flex items-center h-max justify-start gap-3 my-2 p-1 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonFilmPreview key={i} />
        ))}
      </section>
    </div>
  );
};

export default SkeletonFilmsCaraousel;
