import { z } from "zod";
import { userId } from "../common/utils/storage";
import { api } from "./url";

export type FilmSearch = z.infer<typeof FilmSearch>;
const FilmSearch = z.object({
  films: z.array(
    z.object({
      filmId: z.number().int(),
      title: z.string(),
      rating: z.number(),
    })
  ),
  count: z.number().int(),
});

export async function topFilms() {
  const id = userId();
  if (!id) {
    return {
      films: [],
      count: 0,
    };
  }
  const res = await fetch(
    `${api}/films?count=${5}&directorId=${id}&sortBy=RATING_DESC`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    return {
      films: [],
      count: 0,
    };
  }
  const raw = await res.json();
  const maybeFilms = await FilmSearch.safeParseAsync(raw);
  if (!maybeFilms.success) {
    return {
      films: [],
      count: 0,
    };
  }
  return maybeFilms.data;
}
