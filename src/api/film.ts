import { type Union } from "@d-exclaimation/common/union";
import { z } from "zod";
import { datestring } from "../common/utils/date";
import { session, userId } from "../common/utils/storage";
import { api } from "./url";
import { mutation, query } from "./utils";

export type FilmSearch = z.infer<typeof FilmSearch>;
const FilmSearch = z.object({
  films: z.array(
    z.object({
      filmId: z.number().int(),
      title: z.string(),
      genreId: z.number().int(),
      directorId: z.number().int(),
      directorFirstName: z.string(),
      directorLastName: z.string(),
      releaseDate: z.coerce.date(),
      ageRating: z.string(),
      rating: z.number(),
    })
  ),
  count: z.number().int(),
});

const FilmId = z.object({
  filmId: z.number().int(),
});

export const topFilms = query(async () => {
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
  return {
    ...maybeFilms.data,
  };
});

export const filmGallery = query(async () => {
  const id = userId();
  if (!id) {
    return {
      films: [],
      count: 0,
    };
  }
  const res = await fetch(
    `${api}/films?directorId=${id}&sortBy=RELEASED_DESC`,
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
});

export const reviewedFilms = query(async () => {
  const id = userId();
  if (!id) {
    return {
      films: [],
      count: 0,
    };
  }
  const res = await fetch(
    `${api}/films?reviewerId=${id}&sortBy=RELEASED_DESC`,
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
});

type CreateFilmResponse = Union<{
  Ok: {};
  BadTitle: {};
  BadInput: { message: string };
  Unauthorized: {};
  Error: { message: string };
}>;

export const createFilm = mutation(
  async (arg: {
    title: string;
    description: string;
    genreId: number;
    releaseDate?: Date | null;
    ageRating?: string;
    runtime?: number | null;
    file?: File;
  }): Promise<CreateFilmResponse> => {
    const id = userId();
    if (!id) {
      return {
        kind: "Unauthorized",
      };
    }
    try {
      const res = await fetch(`${api}/films`, {
        method: "POST",
        headers: {
          "X-Authorization": session() ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: arg.title,
          description: arg.description,
          genreId: arg.genreId,
          releaseDate: arg.releaseDate ? datestring(arg.releaseDate) : null,
          ageRating: arg.ageRating,
          runtime: arg.runtime,
        }),
      });
      if (res.status !== 200 && res.status !== 201) {
        switch (res.status) {
          case 400:
            return {
              kind: "BadInput",
              message: res.statusText,
            };
          case 401:
            return {
              kind: "Unauthorized",
            };
          case 403:
            return {
              kind: "BadTitle",
            };
          default:
            return {
              kind: "Error",
              message: "Unknown error",
            };
        }
      }
      const raw = await res.json();
      const maybeFilm = await FilmId.safeParseAsync(raw);
      if (!maybeFilm.success) {
        return {
          kind: "Error",
          message: maybeFilm.error.issues[0].message,
        };
      }
      if (arg.file) {
        const res = await fetch(`${api}/films/${maybeFilm.data.filmId}/image`, {
          method: "PUT",
          headers: {
            "X-Authorization": session() ?? "",
            "Content-Type": arg.file.type,
          },
          body: arg.file,
        });
        if (res.status !== 200 && res.status !== 201) {
          return {
            kind: "Error",
            message: res.statusText,
          };
        }
      }
      return {
        kind: "Ok",
      };
    } catch (e) {
      return {
        kind: "Error",
        message: `Unknown error: ${e}`,
      };
    }
  }
);
