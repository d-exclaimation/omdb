import { type Genres } from "../../../types/genres";

export type Genre = Genres[number];

export type GenreContext = {
  get: (id: number) => Genre | undefined;
  values: Genre[];
};

export const initialGenreContext = {
  get: () => undefined,
  values: [],
} satisfies GenreContext;
