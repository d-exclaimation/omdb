import { z } from "zod";
import { api } from "./url";
import { q } from "./utils";

export type Genres = z.infer<typeof Genres>;
export const Genres = z.array(
  z.object({
    genreId: z.number().int(),
    name: z.string(),
  })
);
export const genres = q(["genres"], async (): Promise<Genres> => {
  const res = await fetch(`${api}/films/genres`);
  if (res.status !== 200 && res.status !== 201) {
    return [];
  }
  const raw = await res.json();
  const maybeGenres = await Genres.safeParseAsync(raw);
  if (!maybeGenres.success) {
    return [];
  }
  return maybeGenres.data;
});
