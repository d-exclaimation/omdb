import { type FC } from "react";

type FilmSearchBarProps = {
  value: string;
  onUpdate: (value: string) => void;
};

const FilmSearchBar: FC<FilmSearchBarProps> = ({ value, onUpdate }) => {
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
      </div>
    </div>
  );
};

export default FilmSearchBar;
