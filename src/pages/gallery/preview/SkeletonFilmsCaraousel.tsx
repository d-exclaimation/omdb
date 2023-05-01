import { type FC } from "react";

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
          <div
            key={i}
            className="flex flex-col w-64 flex-shrink-0 h-full overflow-hidden bg-white rounded group"
          >
            <div className="object-cover w-64 h-48 bg-zinc-200 animate-pulse rounded overflow-hidden" />
            <div className="flex flex-col w-full gap-1 py-2">
              <h3 className="max-w-[90%] font-semibold truncate text-sm bg-zinc-200 rounded text-transparent animate-pulse">
                Something
              </h3>
              <div className="flex flex-row justify-between gap-3 text-zinc-500 text-xs">
                <span className="max-w-[32rem] bg-zinc-200 rounded text-transparent animate-pulse">
                  John Doe
                </span>
              </div>
              <div className="flex flex-row justify-between text-zinc-400 h-max gap-3 pr-1 text-xs">
                <span className="px-1 rounded bg-zinc-100 text-transparent animate-pulse">
                  Unknown
                </span>
                <span className="px-1 rounded bg-zinc-100">TBC</span>
              </div>
              <div className="flex flex-row justify-between text-zinc-400 gap-3 pr-1 text-xs">
                <span>{new Date().toLocaleDateString("en-NZ")}</span>
                <span className="flex items-center">
                  <img className="w-3 h-3 mr-[.125rem]" src="/icons/star.svg" />
                  {(0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SkeletonFilmsCaraousel;
