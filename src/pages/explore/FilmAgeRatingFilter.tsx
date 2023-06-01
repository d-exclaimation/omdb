import { keys } from "@d-exclaimation/common";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { ageRatings } from "../../common/utils/constants";
import { tw } from "../../common/utils/tailwind";

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
      className="relative inline-block w-max flex-shrink-0 text-left"
    >
      <span
        className={tw(`absolute -right-2 -top-1 ml-2 origin-top-right rounded-full bg-red-500 p-1
        px-2 text-[0.75rem] text-white [line-height:0.875rem] data-[count='0']:hidden dark:text-black`)}
        data-count={ratings.length}
      >
        {ratings.length}
      </span>
      <Menu.Button
        className={tw(`flex w-max flex-shrink-0 items-center rounded bg-white px-4 py-2 
        text-start text-sm font-medium text-zinc-800 hover:bg-zinc-50 active:bg-zinc-50
        dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-800`)}
      >
        {({ open }) => (
          <>
            Age rating
            <img
              className={tw(`ml-2 h-3 w-3 transition-all data-selected:rotate-180
              dark:content-[url('/icons/chevron-down-selected.svg')]`)}
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
          className={tw(`absolute right-0 z-20 mt-2 w-48 min-w-max 
          origin-top-right divide-y divide-zinc-100 rounded bg-white 
          shadow-lg ring-1 ring-black/5 focus:outline-none
          dark:divide-zinc-900 dark:bg-zinc-800 dark:ring-white/5`)}
        >
          {ratings.length ? (
            <div className="p-1">
              {ratings.map((rating) => (
                <Menu.Item key={rating}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={tw(`flex w-full items-center rounded px-2 py-2 text-sm text-red-600 
                      disabled:cursor-not-allowed disabled:opacity-50 data-selected:bg-red-600
                      data-selected:text-white dark:text-red-400 dark:data-selected:bg-red-400 
                      dark:data-selected:text-black md:text-black dark:md:text-white`)}
                      data-selected={active}
                      onClick={() => onRemoveAgeRating(rating)}
                    >
                      <img
                        className="mr-2 h-4 w-4 dark:content-[url('/icons/checked-selected.svg')]"
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
                      className={tw(`flex w-full items-center rounded px-2 py-2 text-sm disabled:cursor-not-allowed 
                      disabled:opacity-50 data-selected:bg-zinc-800 data-selected:text-white
                      dark:text-white dark:data-selected:bg-zinc-200 dark:data-selected:text-black`)}
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
