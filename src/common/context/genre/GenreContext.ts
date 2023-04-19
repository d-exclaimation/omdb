import { createContext } from "react";
import { type Genres } from "../../../api/genres";

export type Genre = Genres[number];

export type GenreContextValue = {
  genres: Genre[];
  get: (id: number) => Genre | undefined;
};

export const GenreContext = createContext<GenreContextValue>({
  genres: [],
  get() {
    return undefined;
  },
});
