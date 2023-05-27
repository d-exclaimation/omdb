import { keys } from "@d-exclaimation/common";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { ageRatings } from "../../common/utils/constants";

type FilmAgeRatingFilterProps = {
  ratings: string[];
  onAddAgeRating: (ageRating: string) => void;
  onRemoveAgeRating: (ageRating: string) => void;
};

const FilmAgeRatingFilter: FC<FilmAgeRatingFilterProps> = ({
  ratings,
  onAddAgeRating,
  onRemoveAgeRating,
}) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left w-max flex-shrink-0"
    >
      <span
        className="absolute origin-top-right -right-2 -top-1 data-[count='0']:hidden p-1 px-2 ml-2
        text-[0.75rem] [line-height:0.875rem] bg-red-500 text-white dark:text-black rounded-full"
        data-count={ratings.length}
      >
        {ratings.length}
      </span>
      <Menu.Button
        className="px-4 py-2 rounded text-start font-medium text-sm bg-white w-max 
        flex-shrink-0 text-zinc-800 hover:bg-zinc-50 active:bg-zinc-50 flex items-center
        dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
      >
        {({ open }) => (
          <>
            Age rating
            <img
              className="w-3 h-3 ml-2 data-selected:rotate-180 transition-all
              dark:content-[url('/icons/chevron-down-selected.svg')]"
              src="/icons/chevron-down.svg"
              data-selected={open}
            />
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 origin-top-right divide-y divide-zinc-100 
          rounded mt-2 bg-white w-48 min-w-max focus:outline-none 
          shadow-lg ring-1 ring-black/5 z-20
          dark:bg-zinc-800 dark:divide-zinc-900 dark:ring-white/5"
        >
          {ratings.length ? (
            <div className="p-1">
              {ratings.map((rating) => (
                <Menu.Item key={rating}>
                  {({ active }) => (
                    <button
                      type="button"
                      className="flex w-full items-center rounded px-2 py-2 text-sm 
                      data-selected:bg-red-600 data-selected:text-white text-red-600 md:text-black
                      disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:md:text-white
                      dark:data-selected:bg-red-400 dark:data-selected:text-black"
                      data-selected={active}
                      onClick={() => onRemoveAgeRating(rating)}
                    >
                      <img
                        className="w-4 h-4 mr-2 dark:content-[url('/icons/checked-selected.svg')]"
                        src="/icons/checked.svg"
                      />
                      {ageRatings[rating as keyof typeof ageRatings]}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          ) : null}
          <div className="p-1">
            {keys(ageRatings)
              .filter((rating) => !ratings.includes(rating))
              .map((rating) => (
                <Menu.Item key={rating}>
                  {({ active }) => (
                    <button
                      type="button"
                      className="flex w-full items-center rounded px-2 py-2 text-sm 
                      data-selected:bg-zinc-800 data-selected:text-white
                      disabled:cursor-not-allowed disabled:opacity-50
                      dark:data-selected:bg-zinc-200 dark:text-white dark:data-selected:text-black"
                      data-selected={active}
                      onClick={() => onAddAgeRating(rating)}
                    >
                      {ageRatings[rating]}
                    </button>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilmAgeRatingFilter;
