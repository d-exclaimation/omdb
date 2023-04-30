import { type FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useGenres } from "../../common/context/genre/useGenres";

type FilmGenreFilterProps = {
  genreIds: number[];
  onAddGenreId: (genreId: number) => void;
  onRemoveGenreId: (genreId: number) => void;
};

const FilmGenreFilter: FC<FilmGenreFilterProps> = ({
  genreIds,
  onAddGenreId,
  onRemoveGenreId
}) => {

  const genres = useGenres();

  return (
    <Menu
      as="div"
      className="relative inline-block text-left w-max flex-shrink-0"
    >
      <span
        className="absolute origin-top-right -right-2 -top-1 data-[count='0']:hidden
        text-[0.75rem] [line-height:0.875rem] bg-red-500 text-white rounded-full p-1 px-2 ml-2"
        data-count={genreIds.length}
      >
        {genreIds.length}
      </span>
      <Menu.Button
        className="px-4 py-2 rounded-md text-start font-medium text-sm bg-white w-max 
        flex-shrink-0 text-zinc-800 hover:bg-zinc-50 active:bg-zinc-50 flex items-center"
      >
        Genre
        <img className="w-3 h-3 ml-2" src="/icons/chevron-down.svg" />
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
        <Menu.Items className="absolute z-20 right-0 origin-top-right divide-y divide-zinc-100 rounded-md mt-2 w-36 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {
            genreIds.length
              ? <div className="p-1">
                {
                  genreIds.map((genreId) => (
                    <Menu.Item key={genreId}>
                      {({ active }) => (
                        <button
                          className="flex w-full items-center rounded-md px-2 py-2 text-sm 
                          data-selected:bg-red-600 data-selected:text-white text-red-600 md:text-black
                          disabled:cursor-not-allowed disabled:opacity-50"
                          data-selected={active}
                          onClick={() => onRemoveGenreId(genreId)}
                        >
                          <img className="w-4 h-4 mr-2" src="/icons/checked.svg" />
                          {genres.get(genreId)?.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))
                }
              </div>
              : null
          }
          <div className="p-1">
            {
              genres.values
                .filter(({ genreId }) => !genreIds.includes(genreId))
                .map(({ genreId, name }) => (
                  <Menu.Item key={genreId}>
                    {({ active }) => (
                      <button
                        className="flex w-full items-center rounded-md px-2 py-2 text-sm 
                        data-selected:bg-zinc-800 data-selected:text-white
                        disabled:cursor-not-allowed disabled:opacity-50"
                        data-selected={active}
                        onClick={() => onAddGenreId(genreId)}
                      >
                        {name}
                      </button>
                    )}
                  </Menu.Item>
                ))
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilmGenreFilter;