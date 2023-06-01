import { type FC } from "react";

const SkeletonFlexibleFilmPreview: FC = () => {
  return (
    <div className="group flex h-full w-full flex-shrink-0 flex-col overflow-hidden rounded bg-white dark:bg-zinc-900">
      <div className="aspect-video w-full animate-pulse overflow-hidden rounded bg-zinc-200 object-cover dark:bg-zinc-800"></div>
      <div className="flex w-full flex-col gap-1 py-2">
        <h3 className="max-w-[90%] animate-pulse truncate rounded bg-zinc-200 text-sm font-semibold text-transparent dark:bg-zinc-800">
          Something
        </h3>
        <div className="flex w-full flex-row items-center justify-start">
          <div className="mr-1 h-4 w-4 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-row justify-start gap-3 text-xs text-zinc-500">
            <span className="max-w-[28rem] animate-pulse truncate rounded bg-zinc-200 text-transparent dark:bg-zinc-800">
              Something Something
            </span>
          </div>
        </div>
        <div className="flex h-max flex-row justify-between gap-3 pr-1 text-xs text-zinc-400">
          <span className="animate-pulse rounded bg-zinc-100 px-1 text-transparent dark:bg-zinc-900">
            Unknown
          </span>
          <span className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">TBC</span>
        </div>
        <div className="flex flex-row justify-between gap-3 pr-1 text-xs text-zinc-400">
          <span className="animate-pulse rounded bg-zinc-200 text-transparent dark:bg-zinc-800">
            {new Date().toLocaleString("en-NZ")}
          </span>
          <span className="flex items-center">
            <img className="mr-[.125rem] h-3 w-3" src="/icons/star.svg" />
            <span className="animate-pulse rounded bg-zinc-200 text-transparent dark:bg-zinc-800">
              {(0).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFlexibleFilmPreview;
