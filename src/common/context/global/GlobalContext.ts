import { createContext } from "react";
import { CacheControl } from "../cache/CacheControl";
import { GenreContext, initialGenreContext } from "../genre/GenreContext";

export type GlobalContext = {
  genres: GenreContext;
  cache: CacheControl<["user", "film"]>;
};

export const GlobalContext = createContext<GlobalContext>({
  genres: initialGenreContext,
  get cache(): CacheControl<["user", "film"]> {
    throw new Error("invalidate is not implemented");
  },
});
