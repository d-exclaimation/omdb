import { useState, type FC } from "react";
import useQuery from "swr";
import { searchFilms } from "../../api/film";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import Layout from "../layout";
import FlexibleFilmPreview from "./FlexibleFilmPreview";
import PageControls from "./PageControls";

const ExplorePage: FC = () => {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const { data, isValidating } = useQuery(
    ["films", "explore", q, { page }],
    searchFilms,
    {
      keepPreviousData: true,
    }
  );

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
              value={q}
              onChange={(e) => setQ(e.target.value)}
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
          {data?.films?.length ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2">
              {data?.films.map((film) => (
                <FlexibleFilmPreview key={film.filmId} {...film} />
              ))}
            </div>
          ) : isValidating ? (
            <LoadingIndicator />
          ) : (
            <div className="w-full h-full flex items-center justify-center pt-6 pb-4 text-zinc-500">
              No films found
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl max-h-max bg-white flex items-center flex-col rounded-lg p-2">
          <PageControls
            current={page}
            last={data ? Math.ceil(data.count / 6) : page}
            setPage={setPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
