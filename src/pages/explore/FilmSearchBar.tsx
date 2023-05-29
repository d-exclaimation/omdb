import { type FC } from "react";

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
    <div className="w-full h-max bg-white dark:bg-zinc-900 flex overflow-hidden flex-col rounded-lg max-w-3xl">
      <div className="w-full flex items-center rounded-lg">
        <button
          type="button"
          className="h-full pl-3 pr-1 py-1 rounded-l-lg focus:outline-none"
        >
          <img
            className="w-6 h-6 dark:content-[url('/icons/telescope-selected.svg')]"
            src="/icons/telescope.svg"
          />
        </button>
        <input
          placeholder="Search for films"
          className="w-full py-3 placeholder:text-slate-400 text-sm focus:outline-none 
          disabled:cursor-not-allowed disabled:opacity-50 bg-transparent px-3
          dark:text-white dark:placeholder:text-slate-600"
          autoCapitalize="none"
          value={value}
          onChange={(e) => onUpdate(e.target.value)}
        />
        <button
          type="button"
          className="h-full px-3 py-1 rounded-r-lg focus:outline-none
          hover:bg-zinc-50 active:bg-zinc-50 flex items-center justify-center w-max
          dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
          onClick={() => onToggleMode(mode)}
        >
          <img
            className="w-6 h-6 dark:content-[url('/icons/grid-selected.svg')]
            transition-all translate-x-5 opacity-0 data-selected:opacity-100 data-selected:translate-x-0"
            src="/icons/grid.svg"
            data-selected={mode === "grid"}
          />
          <img
            className="absolute w-6 h-6 dark:content-[url('/icons/list-selected.svg')]
            transition-all -translate-x-5 opacity-0 data-selected:opacity-100 data-selected:translate-x-0"
            src="/icons/list.svg"
            data-selected={mode === "list"}
          />
        </button>
      </div>
    </div>
  );
};

export default FilmSearchBar;
