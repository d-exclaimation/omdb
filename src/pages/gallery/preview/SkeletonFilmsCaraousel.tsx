import { type FC } from "react";
import SkeletonFilmPreview from "../SkeletonFilmPreview";

type SkeletonFilmsCaraouselProps = {
  title: string;
};

const SkeletonFilmsCaraousel: FC<SkeletonFilmsCaraouselProps> = ({ title }) => {
  return (
    <div className="relative flex max-h-max w-full max-w-3xl flex-col rounded-lg bg-white p-6 dark:bg-zinc-900 md:p-8">
      <section className="flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white md:text-2xl">
          {title}
        </h2>
      </section>
      <section className="my-2 flex h-max w-full items-center justify-start gap-3 overflow-x-auto p-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonFilmPreview key={i} />
        ))}
      </section>
    </div>
  );
};

export default SkeletonFilmsCaraousel;
