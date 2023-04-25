import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import useQuery, { preload } from "swr";
import { searchFilms } from "../../api/film";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import Layout from "../layout";
import FilmFilters from "./FilmFilters";
import FilmSearchBar from "./FilmSearchBar";
import FlexibleFilmPreview from "./FlexibleFilmPreview";
import PageControls from "./PageControls";
import { type Sorting } from "../../types/constants";
import { useSearchParams } from "react-router-dom";
import { maybeInt } from "../../common/utils/coerce";

const ExplorePage: FC = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [page, setPage] = useState(1);
  const sort = useMemo<Sorting>(() => params.get("sort") as Sorting ?? "RELEASED_ASC", [params]);
  const genreIds = useMemo(() =>
    params
      .getAll("genreIds")
      .map((each) => maybeInt.parse(each))
      .filter((each): each is number => each !== undefined && each !== null)
    , [params]);
  const ageRatings = useMemo(() =>
    params
      .getAll("ageRatings")
    , [params]);

  const { data, isValidating } = useQuery(
    ["films", "explore", q, { page, sort }],
    searchFilms,
    {
      keepPreviousData: true,
    }
  );

  const setParamByKey = useCallback((key: string, value: string) => {
    setParams(prev => {
      if (prev.has(key)) {
        prev.delete(key);
      }
      prev.append(key, value);
      return prev;
    });
  }, [setParams]);

  const setAllParamsByKey = useCallback((key: string, values: string[]) => {
    setParams(prev => {
      if (prev.has(key)) {
        prev.delete(key);
      }
      values.forEach((value) => prev.append(key, value));
      return prev;
    });
  }, [setParams]);

  useEffect(() => {
    preload(
      ["films", "explore", q, { page: page + 1, sort }],
      searchFilms
    )
  }, [q, sort, page]);


  return (
    <Layout route="Explore" heading="Discover films">
      <div className="w-full flex flex-col justify-start items-center gap-3">

        <FilmSearchBar value={q} onUpdate={setQ} />
        <FilmFilters
          sort={sort}
          onSortChange={(sort) => setParamByKey("sort", sort)}
          genreIds={genreIds}
          onAddGenre={(genreId) => setAllParamsByKey("genreIds", [...genreIds, genreId].map(each => each.toString()))}
          onRemoveGenre={(genreId) => setAllParamsByKey("genreIds", genreIds.filter(each => each !== genreId).map(each => each.toString()))}
          ratings={ageRatings}
          onAddAgeRating={(rating) => setAllParamsByKey("ageRatings", [...ageRatings, rating])}
          onRemoveAgeRating={(rating) => setAllParamsByKey("ageRatings", ageRatings.filter(each => each !== rating))}
        />

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
