import { Genres } from "../types/genres";
import { api } from "./url";
import { query } from "./utils";

export const genres = query(["genres"], async () => {
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
