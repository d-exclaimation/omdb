import { type FC } from "react";
import Layout from "../layout";
import FlexibleFilmPreview from "./FlexibleFilmPreview";
import PageControls from "./PageControls";

const ExplorePage: FC = () => {
  return (
    <Layout route="Explore" heading="Discover films">
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <div className="w-full h-max bg-white flex overflow-hidden flex-col rounded-lg max-w-3xl">
          <div className="w-full flex items-center rounded-lg">
            <button
              className="h-full pr-2 pl-1 rounded-l-lg hover:bg-zinc-200
              focus:outline-none active:bg-zinc-200"
            >
              <img className="w-6 h-6 m-2" src="/icons/search.svg" />
            </button>
            <input
              placeholder="Search for films"
              className="w-full py-3 placeholder:text-slate-400 text-sm focus:outline-none 
              disabled:cursor-not-allowed disabled:opacity-50 bg-transparent px-3"
              autoCapitalize="none"
            />

            <button
              className="h-full pl-1 px-2 hover:bg-zinc-200 rounded-r-lg
              focus:outline-none active:bg-zinc-200"
            >
              <img className="w-6 h-6 m-2" src="/icons/filter.svg" />
            </button>
          </div>
        </div>

        <div className="w-full max-h-max bg-white flex items-center flex-col rounded-lg p-6 md:p-8 max-w-3xl">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <FlexibleFilmPreview
                key={i}
                filmId={41}
                title="The Zucc"
                ageRating="R18"
                directorId={41}
                directorFirstName="vincent"
                directorLastName="_"
                rating={9.99}
                genreId={8}
                releaseDate={new Date("2020-03-24")}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-3xl max-h-max bg-white flex items-center flex-col rounded-lg p-2">
          <PageControls current={2} last={20} />
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
