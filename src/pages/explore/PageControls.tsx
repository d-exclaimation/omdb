import {
  useCallback,
  useRef,
  useState,
  type FC,
  type SetStateAction,
} from "react";
import { tw } from "../../common/utils/tailwind";

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
    <div className="flex w-max flex-row items-center justify-center gap-3 font-light">
      <button
        type="button"
        className={tw(`flex items-center justify-center rounded-full 
        p-2 transition-all hover:bg-slate-100 active:bg-slate-100
        disabled:translate-x-12 disabled:opacity-0 disabled:hover:bg-transparent 
        disabled:active:bg-transparent dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
        disabled={current === 1}
        onClick={() => {
          change(1);
        }}
      >
        <img
          className="h-5 w-5 dark:dark:content-[url('/icons/start-selected.svg')]"
          src="/icons/start.svg"
        />
      </button>

      <button
        type="button"
        className={tw(`flex items-center justify-center rounded-full 
        p-2 transition-all hover:bg-slate-100 active:bg-slate-100
        disabled:translate-x-12 disabled:opacity-0 disabled:hover:bg-transparent 
        disabled:active:bg-transparent dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
        disabled={current === 1}
        onClick={() => {
          change((prev) => Math.max(prev - 1, 1));
        }}
      >
        <img
          className="h-5 w-5 dark:content-[url('/icons/arrow-left-selected.svg')]"
          src="/icons/arrow-left.svg"
        />
      </button>

      <div className="min-w-12 mx-2 flex w-max flex-row items-end justify-end gap-1">
        <span
          className={tw(`-translate-y-1 text-2xl font-semibold transition-all
          duration-0 hover:underline data-[animating='true']:translate-y-1 
          data-[animating='true']:opacity-0 data-[animating='false']:duration-400
          dark:text-white`)}
          data-animating={animating}
        >
          {current}
        </span>
        <span className="ml-1 mr-[0.125rem] h-6 w-[1px] rotate-[30deg] bg-black dark:bg-white"></span>
        <span className="text-sm hover:underline dark:text-white"> {last}</span>
      </div>

      <button
        type="button"
        className={tw(`flex items-center justify-center rounded-full
        p-2 transition-all hover:bg-slate-100 active:bg-slate-100
        disabled:-translate-x-12 disabled:opacity-0 disabled:hover:bg-transparent 
        disabled:active:bg-transparent dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
        disabled={current === last}
        onClick={() => {
          change((prev) => Math.min(prev + 1, last));
        }}
      >
        <img
          className="h-5 w-5 dark:content-[url('/icons/arrow-right-selected.svg')]"
          src="/icons/arrow-right.svg"
        />
      </button>

      <button
        type="button"
        className={tw(`flex items-center justify-center rounded-full
        p-2 transition-all hover:bg-slate-100 active:bg-slate-100
        disabled:-translate-x-12 disabled:opacity-0 disabled:hover:bg-transparent 
        disabled:active:bg-transparent dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
        disabled={current === last}
        onClick={() => {
          change(last);
        }}
      >
        <img
          className="h-5 w-5 dark:content-[url('/icons/end-selected.svg')]"
          src="/icons/end.svg"
        />
      </button>
    </div>
  );
};

export default PageControls;
