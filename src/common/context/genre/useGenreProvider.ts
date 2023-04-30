import { useMemo } from "react";
import useQuery from "swr/immutable";
import { genres } from "../../../api/genres";
import { type Genre } from "./GenreContext";

const genresCache = new Map<number, Genre>();
export function useGenreProvider() {
  const { data } = useQuery(genres.key, genres.fn);
  const proxy = useMemo(() => {
    if (data) {
      for (const genre of data) {
        genresCache.set(genre.genreId, genre);
      }
    }
    return {
      values: data ?? [],
      get: (id: number) => genresCache.get(id),
    };
  }, [data]);

  return proxy;
}
