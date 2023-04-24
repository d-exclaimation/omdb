import { type FC } from "react";


const FilmFilters: FC = () => {
  return (
    <div className="w-full h-max flex items-center flex-row rounded-lg max-w-3xl gap-3">
      <div className="px-4 py-2 rounded-full font-medium text-sm bg-white w-max">
        Sort
      </div>
      <div className="px-4 py-2 rounded-full font-medium text-sm bg-white w-max">
        Genres
      </div>
      <div className="px-4 py-2 rounded-full font-medium text-sm bg-white w-max inline-flex flex-row">
        Age ratings
      </div>

      <div
        className="w-[1px] h-6 bg-black/50"
      >
      </div>

      <div className="w-full flex flex-row overflow-x-auto gap-2">
        <div className="px-4 py-2 rounded-full text-sm bg-white w-max">
          Action <span className="ml-2">✕</span>
        </div>
        <div className="px-4 py-2 rounded-full text-sm bg-white w-max">
          Comedy <span className="ml-2">✕</span>
        </div>
        <div className="px-4 py-2 rounded-full text-sm bg-white w-max">
          TBC <span className="ml-2">✕</span>
        </div>
      </div>
    </div>
  );
};


export default FilmFilters;
