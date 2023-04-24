import { useCallback, useRef, useState, type FC } from "react";

type PageControlsProps = {
  current: number;
  last: number;
};

const PageControls: FC<PageControlsProps> = ({ current, last }) => {
  const timeoutRef = useRef<number>();
  const [animating, setAnimating] = useState(false);
  const [curr, setCurr] = useState(current);

  const change = useCallback(
    (...args: Parameters<typeof setCurr>) => {
      setCurr(...args);
      setAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
      }, 0);
    },
    [setAnimating, setCurr]
  );

  return (
    <div className="flex w-max font-light flex-row items-center justify-center gap-3">
      <button
        className="flex items-center justify-center rounded-full 
       hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:translate-x-12 disabled:active:bg-transparent"
        disabled={curr === 1}
        onClick={() => {
          change(1);
        }}
      >
        <img className="w-5 h-5" src="/icons/start.svg" />
      </button>

      <button
        className="flex items-center justify-center rounded-full
       hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:translate-x-12 disabled:active:bg-transparent"
        disabled={curr === 1}
        onClick={() => {
          change((prev) => Math.max(prev - 1, 1));
        }}
      >
        <img className="w-5 h-5" src="/icons/arrow-left.svg" />
      </button>

      <div className="flex flex-row justify-end gap-1 items-end w-16 mx-4">
        <span
          className="-translate-y-1 text-2xl font-semibold hover:underline
          data-[animating='true']:opacity-0 data-[animating='false']:duration-400
          data-[animating='true']:translate-y-1 transition-all duration-0"
          data-animating={animating}
        >
          {curr}
        </span>
        <span className="h-6 ml-1 mr-[0.125rem] w-[1px] bg-black rotate-[30deg]"></span>
        <span className="text-sm hover:underline"> {last}</span>
      </div>

      <button
        className="flex items-center justify-center rounded-full
        hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:-translate-x-12 disabled:active:bg-transparent"
        disabled={curr === last}
        onClick={() => {
          change((prev) => Math.min(prev + 1, last));
        }}
      >
        <img className="w-5 h-5" src="/icons/arrow-right.svg" />
      </button>

      <button
        className="flex items-center justify-center rounded-full
      hover:bg-slate-100 active:bg-slate-100 p-2 transition-all
        disabled:opacity-0 disabled:hover:bg-transparent
        disabled:-translate-x-12 disabled:active:bg-transparent"
        disabled={curr === last}
        onClick={() => {
          change(last);
        }}
      >
        <img className="w-5 h-5" src="/icons/end.svg" />
      </button>
    </div>
  );
};

export default PageControls;