import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type SetStateAction,
} from "react";
import { useSearchParams } from "react-router-dom";
import useQuery, { preload } from "swr";
import { searchFilms } from "../../api/film";
import { maybeInt } from "../../common/utils/coerce";
import { type Sorting } from "../../types/constants";
import Layout from "../layout";
import FilmFilters from "./FilmFilters";
import FilmSearchBar from "./FilmSearchBar";
import FlexibleFilmPreview from "./FlexibleFilmPreview";
import ListFilmPreview from "./ListFilmPreview";
import PageControls from "./PageControls";
import SkeletonFlexibleFilmPreview from "./SkeletonFlexibleFilmPreview";

const ExplorePage: FC = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const mode = useMemo(
    () => (params.get("mode") ?? "grid") as "grid" | "list",
    [params]
  );
  const page = useMemo(() => maybeInt.parse(params.get("page")) ?? 1, [params]);
  const sort = useMemo<Sorting>(
    () => (params.get("sort") as Sorting) ?? "RELEASED_DESC",
    [params]
  );
  const genreIds = useMemo(
    () =>
      params
        .getAll("genreIds")
        .map((each) => maybeInt.parse(each))
        .filter((each): each is number => each !== undefined && each !== null),
    [params]
  );
  const ageRatings = useMemo(() => params.getAll("ageRatings"), [params]);

  const { data, isValidating } = useQuery(
    searchFilms.keys([q, { page, sort, genreIds, ageRatings }]),
    searchFilms.fn,
    {
      keepPreviousData: true,
    }
  );

  const finalPage = useMemo(
    () => Math.max(1, Math.ceil((data?.count ?? page) / 6)),
    [data, page]
  );

  const hasFilters = useMemo(
    () => genreIds.length > 0 || ageRatings.length > 0 || !!q,
    [genreIds, ageRatings, q]
  );

  const setPage = useCallback(
    (newPage: SetStateAction<number>) => {
      setParams((curr) => {
        curr.delete("page");
        curr.append(
          "page",
          `${typeof newPage === "function" ? newPage(page) : newPage}`
        );
        return curr;
      });
    },
    [page, setParams]
  );

  const setSearch = useCallback(
    (q: string) => {
      setQ(q);
      setParams((curr) => {
        if (curr.has("q")) {
          curr.delete("q");
        }
        curr.delete("page");
        curr.append("q", q);
        return curr;
      });
    },
    [setQ, setParams]
  );

  const setMode = useCallback(
    (value: "grid" | "list") => {
      setParams((curr) => {
        if (curr.has("mode")) {
          curr.delete("mode");
        }
        curr.append("mode", value);
        return curr;
      });
    },
    [setParams]
  );

  const setParamByKey = useCallback(
    (key: string, value: string) => {
      setParams((curr) => {
        if (curr.has(key)) {
          curr.delete(key);
        }
        curr.delete("page");
        curr.append(key, value);
        return curr;
      });
    },
    [setParams]
  );

  const setAllParamsByKey = useCallback(
    (key: string, values: string[]) => {
      setParams((curr) => {
        if (curr.has(key)) {
          curr.delete(key);
        }
        curr.delete("page");
        values.forEach((value) => curr.append(key, value));
        return curr;
      });
    },
    [setParams]
  );

  useEffect(() => {
    preload(
      searchFilms.keys([q, { page: page + 1, sort, genreIds, ageRatings }]),
      searchFilms.fn
    );
  }, [q, sort, page, genreIds, ageRatings]);

  return (
    <Layout route="Explore" heading="Discover films">
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <FilmSearchBar
          value={q}
          onUpdate={setSearch}
          mode={mode}
          onToggleMode={(prev) => setMode(prev === "grid" ? "list" : "grid")}
        />
        <FilmFilters
          sort={sort}
          onSortChange={(sort) => setParamByKey("sort", sort)}
          genreIds={genreIds}
          onAddGenre={(genreId) =>
            setAllParamsByKey(
              "genreIds",
              [...genreIds, genreId].map((each) => each.toString())
            )
          }
          onRemoveGenre={(genreId) =>
            setAllParamsByKey(
              "genreIds",
              genreIds
                .filter((each) => each !== genreId)
                .map((each) => each.toString())
            )
          }
          ratings={ageRatings}
          onAddAgeRating={(rating) =>
            setAllParamsByKey("ageRatings", [...ageRatings, rating])
          }
          onRemoveAgeRating={(rating) =>
            setAllParamsByKey(
              "ageRatings",
              ageRatings.filter((each) => each !== rating)
            )
          }
        />

        <div className="w-full max-h-max bg-white dark:bg-zinc-900 flex items-center flex-col rounded-lg p-6 md:p-8 max-w-3xl">
          {data?.films?.length ? (
            mode === "list" ? (
              <div className="w-full flex flex-col items-center gap-2">
                {data?.films.map((film) => (
                  <ListFilmPreview key={film.filmId} {...film} />
                ))}
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2">
                {data?.films.map((film) => (
                  <FlexibleFilmPreview key={film.filmId} {...film} />
                ))}
              </div>
            )
          ) : isValidating ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonFlexibleFilmPreview key={i} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center pt-6 pb-4">
              <h3 className="font-bold text-base">No films here</h3>
              <span className="text-sm mt-2 text-zinc-500">
                {hasFilters
                  ? "Your search did not match any films"
                  : "No films have been added yet"}
              </span>
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl max-h-max bg-white dark:bg-zinc-900 flex items-center flex-col rounded-lg p-2">
          <PageControls
            current={page}
            last={data ? finalPage : page}
            setPage={setPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
