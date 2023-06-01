import { type FC } from "react";
import { tw } from "../../common/utils/tailwind";

type FilmSearchBarProps = {
  value: string;
  onUpdate: (value: string) => void;
  mode: "grid" | "list";
  onToggleMode: (prev: "grid" | "list") => void;
};

const FilmSearchBar: FC<FilmSearchBarProps> = ({
  value,
  onUpdate,
  mode,
  onToggleMode,
}) => {
  return (
    <div className="flex h-max w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white dark:bg-zinc-900">
      <div className="flex w-full items-center rounded-lg">
        <button
          type="button"
          className="h-full rounded-l-lg py-1 pl-3 pr-1 focus:outline-none"
        >
          <img
            className="h-6 w-6 dark:content-[url('/icons/telescope-selected.svg')]"
            src="/icons/telescope.svg"
          />
        </button>
        <input
          placeholder="Search for films"
          className={tw(`w-full bg-transparent px-3 py-3 text-sm 
          placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed 
          disabled:opacity-50 dark:text-white dark:placeholder:text-slate-600`)}
          autoCapitalize="none"
          value={value}
          onChange={(e) => onUpdate(e.target.value)}
        />
        <button
          type="button"
          className={tw(`flex h-full w-max items-center justify-center
          rounded-r-lg px-3 py-1 hover:bg-zinc-50 focus:outline-none 
          active:bg-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
          onClick={() => onToggleMode(mode)}
        >
          <img
            className={tw(`h-6 w-6 translate-x-5 opacity-0 transition-all data-selected:translate-x-0 
            data-selected:opacity-100 dark:content-[url('/icons/grid-selected.svg')]`)}
            src="/icons/grid.svg"
            data-selected={mode === "grid"}
          />
          <img
            className={tw(`absolute h-6 w-6 -translate-x-5 opacity-0 transition-all 
            data-selected:translate-x-0 data-selected:opacity-100 dark:content-[url('/icons/list-selected.svg')]`)}
            src="/icons/list.svg"
            data-selected={mode === "list"}
          />
        </button>
      </div>
    </div>
  );
};

export default FilmSearchBar;
