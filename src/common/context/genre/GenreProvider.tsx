import { useMemo, type FC } from "react";
import useQuery from "swr/immutable";
import { genres } from "../../../api/genres";
import { Genre, GenreContext } from "./GenreContext";

const genresCache = new Map<number, Genre>();

type GenreProviderProps = {
  children: React.ReactNode;
};

const GenreProvider: FC<GenreProviderProps> = ({ children }) => {
  const { data, isValidating } = useQuery("/genres", genres);
  const proxy = useMemo(() => {
    if (data) {
      for (const genre of data) {
        genresCache.set(genre.genreId, genre);
      }
    }
    return {
      genres: data ?? [],
      get: (id: number) => genresCache.get(id),
    };
  }, [data?.length]);

  return (
    <GenreContext.Provider value={proxy}>{children}</GenreContext.Provider>
  );
};

export default GenreProvider;
