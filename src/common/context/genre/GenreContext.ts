import { type Genres } from "../../../api/genres";

export type Genre = Genres[number];

export type GenreContext = {
  get: (id: number) => Genre | undefined;
};

export const initialGenreContext = {
  get: () => undefined,
} satisfies GenreContext;
