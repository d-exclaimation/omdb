import { type FC } from "react";

const SkeletonFlexibleFilmPreview: FC = () => {
  return (
    <div className="flex flex-col w-full flex-shrink-0 h-full overflow-hidden bg-white dark:bg-zinc-900 rounded group">
      <div className="object-cover w-full aspect-video rounded overflow-hidden bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
      <div className="flex flex-col w-full gap-1 py-2">
        <h3 className="max-w-[90%] font-semibold truncate text-sm bg-zinc-200 dark:bg-zinc-800 rounded text-transparent animate-pulse">
          Something
        </h3>
        <div className="flex flex-row w-full items-center justify-start">
          <div className="w-4 h-4 rounded-full mr-1 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="flex flex-row justify-start gap-3 text-zinc-500 text-xs">
            <span className="max-w-[28rem] truncate text-transparent bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded">
              Something Something
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 h-max gap-3 pr-1 text-xs">
          <span className="px-1 rounded bg-zinc-100 dark:bg-zinc-900 text-transparent animate-pulse">
            Unknown
          </span>
          <span className="px-1 rounded bg-zinc-100 dark:bg-zinc-900">TBC</span>
        </div>
        <div className="flex flex-row justify-between text-zinc-400 gap-3 pr-1 text-xs">
          <span className="rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse text-transparent">
            {new Date().toLocaleString("en-NZ")}
          </span>
          <span className="flex items-center">
            <img className="w-3 h-3 mr-[.125rem]" src="/icons/star.svg" />
            <span className="rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse text-transparent">
              {(0).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFlexibleFilmPreview;
