import { Listbox, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { sortings } from "../../common/utils/constants";
import { type Sorting } from "../../types/constants";

const ALL_SORTINGS = [
  "ALPHABETICAL_ASC",
  "ALPHABETICAL_DESC",
  "RATING_ASC",
  "RATING_DESC",
  "RELEASED_ASC",
  "RELEASED_DESC",
] as Sorting[];

type FilmSortProps = {
  sort: Sorting;
  onSortChange: (sort: Sorting) => void;
};

const FilmSort: FC<FilmSortProps> = ({ sort, onSortChange }) => {
  return (
    <Listbox
      as="div"
      className="relative inline-block text-left w-max flex-shrink-0"
      value={sort}
      onChange={onSortChange}
    >
      <Listbox.Button
        className="px-4 py-2 rounded text-start font-medium text-sm bg-white w-max 
        flex-shrink-0 text-zinc-800 hover:bg-zinc-50 active:bg-zinc-50 flex items-center
        dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
      >
        {sortings[sort]}
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options
          className="absolute p-1 z-10 left-0 origin-top-left rounded mt-2 w-36 bg-white shadow-lg ring-1 ring-black/5 
          focus:outline-none dark:bg-zinc-800 dark:ring-white/5"
        >
          {ALL_SORTINGS.map((sort) => (
            <Listbox.Option
              key={sort}
              className={({ active }) =>
                `flex w-full items-center rounded px-2 py-2 text-sm 
                ${
                  active
                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                    : "dark:text-white"
                }`
              }
              value={sort}
            >
              {sortings[sort]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default FilmSort;
