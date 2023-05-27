import {
  useCallback,
  useRef,
  useState,
  type FC,
  type SetStateAction,
} from "react";

type PageControlsProps = {
  current: number;
  last: number;
  setPage: (action: SetStateAction<number>) => void;
};

const PageControls: FC<PageControlsProps> = ({ current, setPage, last }) => {
  const timeoutRef = useRef<number>();
  const [animating, setAnimating] = useState(false);

  const change = useCallback(
    (...args: Parameters<typeof setPage>) => {
      setPage(...args);
      setAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
      }, 0);
    },
    [setAnimating, setPage]
  );

  return (
    <div className="flex w-max font-light flex-row items-center justify-center gap-3">
      <button
        type="button"
        className="flex items-center justify-center rounded-full 
       hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:translate-x-12 disabled:active:bg-transparent
        dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
        disabled={current === 1}
        onClick={() => {
          change(1);
        }}
      >
        <img
          className="w-5 h-5 dark:dark:content-[url('/icons/start-selected.svg')]"
          src="/icons/start.svg"
        />
      </button>

      <button
        type="button"
        className="flex items-center justify-center rounded-full
       hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:translate-x-12 disabled:active:bg-transparent
        dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
        disabled={current === 1}
        onClick={() => {
          change((prev) => Math.max(prev - 1, 1));
        }}
      >
        <img
          className="w-5 h-5 dark:content-[url('/icons/arrow-left-selected.svg')]"
          src="/icons/arrow-left.svg"
        />
      </button>

      <div className="flex flex-row justify-end gap-1 items-end min-w-12 w-max mx-2">
        <span
          className="-translate-y-1 text-2xl font-semibold hover:underline
          data-[animating='true']:opacity-0 data-[animating='false']:duration-400
          data-[animating='true']:translate-y-1 transition-all duration-0
          dark:text-white"
          data-animating={animating}
        >
          {current}
        </span>
        <span className="h-6 ml-1 mr-[0.125rem] w-[1px] bg-black dark:bg-white rotate-[30deg]"></span>
        <span className="text-sm dark:text-white hover:underline"> {last}</span>
      </div>

      <button
        type="button"
        className="flex items-center justify-center rounded-full
        hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:-translate-x-12 disabled:active:bg-transparent
        dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
        disabled={current === last}
        onClick={() => {
          change((prev) => Math.min(prev + 1, last));
        }}
      >
        <img
          className="w-5 h-5 dark:content-[url('/icons/arrow-right-selected.svg')]"
          src="/icons/arrow-right.svg"
        />
      </button>

      <button
        type="button"
        className="flex items-center justify-center rounded-full
      hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:-translate-x-12 disabled:active:bg-transparent
        dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
        disabled={current === last}
        onClick={() => {
          change(last);
        }}
      >
        <img
          className="w-5 h-5 dark:content-[url('/icons/end-selected.svg')]"
          src="/icons/end.svg"
        />
      </button>
    </div>
  );
};

export default PageControls;
