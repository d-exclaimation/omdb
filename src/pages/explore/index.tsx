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
      <div className="flex w-full flex-col items-center justify-start gap-3">
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

        <div className="flex max-h-max w-full max-w-3xl flex-col items-center rounded-lg bg-white p-6 dark:bg-zinc-900 md:p-8">
          {data?.films?.length ? (
            mode === "list" ? (
              <div className="flex w-full flex-col items-center gap-2">
                {data?.films.map((film) => (
                  <ListFilmPreview key={film.filmId} {...film} />
                ))}
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 place-items-center gap-2 sm:grid-cols-2">
                {data?.films.map((film) => (
                  <FlexibleFilmPreview key={film.filmId} {...film} />
                ))}
              </div>
            )
          ) : isValidating ? (
            <div className="grid w-full grid-cols-1 place-items-center gap-2 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonFlexibleFilmPreview key={i} />
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center pb-4 pt-6">
              <h3 className="text-base font-bold">No films here</h3>
              <span className="mt-2 text-sm text-zinc-500">
                {hasFilters
                  ? "Your search did not match any films"
                  : "No films have been added yet"}
              </span>
            </div>
          )}
        </div>

        <div className="flex max-h-max w-full max-w-3xl flex-col items-center rounded-lg bg-white p-2 dark:bg-zinc-900">
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
