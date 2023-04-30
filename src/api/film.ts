import { type Union } from "@d-exclaimation/common/union";
import { z } from "zod";
import { datestring } from "../common/utils/date";
import { session, userId } from "../common/utils/storage";
import { api } from "./url";
import { mutation, query } from "./utils";

type FilmOverview = z.infer<typeof FilmOverview>;
const FilmOverview = z.object({
  filmId: z.number().int(),
  title: z.string(),
  genreId: z.number().int(),
  directorId: z.number().int(),
  directorFirstName: z.string(),
  directorLastName: z.string(),
  releaseDate: z.coerce.date(),
  ageRating: z
    .enum(["G", "PG", "M", "R13", "R16", "R18", "TBC"])
    .default("TBC"),
  rating: z.number(),
});

export type FilmDetail = z.infer<typeof FilmDetail>;
const FilmDetail = FilmOverview.extend({
  description: z.string(),
  runtime: z.number().int().nullish().optional(),
  numReviews: z.number().int(),
});

export type FilmSearch = z.infer<typeof FilmSearch>;
const FilmSearch = z.object({
  films: z.array(FilmOverview),
  count: z.number().int(),
});

const FilmId = z.object({
  filmId: z.number().int(),
});

export type FilmReviews = z.infer<typeof FilmReviews>;
const FilmReviews = z.array(
  z.object({
    reviewerId: z.number().int(),
    rating: z.number(),
    review: z.string().nullish().optional(),
    reviewerFirstName: z.string(),
    reviewerLastName: z.string(),
    timestamp: z.coerce.date(),
  })
);

type SearchOptions = {
  page: number;
  sort: string;
  genreIds: number[];
  ageRatings: string[];
};

export const searchFilms = query(
  ["films", "explore"],
  async ([q, opts]: [string, SearchOptions]) => {
    const { page, sort, genreIds, ageRatings } = opts;
    const params = new URLSearchParams();
    params.append("count", "6");
    params.append("sortBy", sort);
    if (q) {
      params.append("q", q);
    }
    params.append("startIndex", `${Math.max(0, (page - 1) * 6)}`);
    genreIds.forEach((genreId) => params.append("genreIds", `${genreId}`));
    ageRatings.forEach((ageRating) => params.append("ageRatings", ageRating));

    const res = await fetch(`${api}/films?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
);

export const topFilms = query(["me", "films", "top-5"], async () => {
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

export const filmGallery = query(["me", "films", "gallery"], async () => {
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

export const reviewedFilms = query(["me", "films", "review"], async () => {
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

type MutateFilmResponse = Union<{
  Ok: {};
  BadTitle: {};
  BadInput: { message: string };
  Unauthorized: {};
  Error: { message: string };
}>;

export const createFilm = mutation(
  ["films", "create"],
  async (arg: {
    title: string;
    description: string;
    genreId: number;
    releaseDate?: Date | null;
    ageRating?: string;
    runtime?: number | null;
    file?: File;
  }): Promise<MutateFilmResponse> => {
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

export const editFilm = mutation(
  ["films", "edit"],
  async (arg: {
    filmId: number;
    title: string;
    description: string;
    genreId: number;
    releaseDate?: Date | null;
    ageRating?: string;
    runtime?: number | null;
  }): Promise<MutateFilmResponse> => {
    const id = userId();
    if (!id) {
      return {
        kind: "Unauthorized",
      };
    }
    try {
      const res = await fetch(`${api}/films/${arg.filmId}`, {
        method: "PATCH",
        headers: {
          "X-Authorization": session() ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: arg.title,
          description: arg.description,
          genreId: arg.genreId,
          releaseDate: arg.releaseDate
            ? datestring(arg.releaseDate)
            : undefined,
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

export const deleteFilm = mutation(
  ["films", "delete"],
  async (filmId: number): Promise<MutateFilmResponse> => {
    const id = userId();
    if (!id) {
      return {
        kind: "Unauthorized",
      };
    }
    try {
      const res = await fetch(`${api}/films/${filmId}`, {
        method: "DELETE",
        headers: {
          "X-Authorization": session() ?? "",
        },
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
          default:
            return {
              kind: "Error",
              message: "Unknown error",
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

export const film = query(
  ["films"],
  async ([id]: [string]): Promise<FilmDetail | undefined> => {
    try {
      const res = await fetch(`${api}/films/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        return undefined;
      }
      const raw = await res.json();
      const maybeFilm = await FilmDetail.safeParseAsync(raw);
      if (!maybeFilm.success) {
        return undefined;
      }
      return maybeFilm.data;
    } catch (_) {
      return undefined;
    }
  }
);

export const similarFilms = query(
  ["films", "similar"],
  async ([genreId, directorId, filmId]: string[]): Promise<FilmSearch> => {
    const genreRes = await fetch(
      `${api}/films?count=${6}&genreIds=${genreId}&sortBy=RATING_DESC`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const directorRes = await fetch(
      `${api}/films?count=${6}&directorId=${directorId}&sortBy=RATING_DESC`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (directorRes.status !== 200 && genreRes.status !== 200) {
      return {
        films: [],
        count: 0,
      };
    }

    const maybeGenreFilms = await FilmSearch.safeParseAsync(
      genreRes.status === 200 ? await genreRes.json() : { count: 0, films: [] }
    );

    const maybeDirectorFilms = await FilmSearch.safeParseAsync(
      directorRes.status === 200
        ? await directorRes.json()
        : { count: 0, films: [] }
    );

    if (maybeGenreFilms.success && maybeDirectorFilms.success) {
      return {
        count: 0,
        films: [...maybeGenreFilms.data.films, ...maybeDirectorFilms.data.films]
          .reduce(
            ([acc, ids], curr) => {
              if (`${curr.filmId}` !== filmId && !ids.has(curr.filmId)) {
                ids.add(curr.filmId);
                acc.push(curr);
              }
              return [acc, ids] as const;
            },
            [[] as FilmOverview[], new Set<number>()] as const
          )[0]
          .slice(0, 5),
      };
    }
    if (maybeDirectorFilms.success) {
      return {
        count: 0,
        films: maybeDirectorFilms.data.films
          .filter((f) => `${f.filmId}` !== filmId)
          .slice(0, 5),
      };
    }

    if (maybeGenreFilms.success) {
      return {
        count: 0,
        films: maybeGenreFilms.data.films
          .filter((f) => `${f.filmId}` !== filmId)
          .slice(0, 5),
      };
    }
    return {
      films: [],
      count: 0,
    };
  }
);

export const filmReviews = query(
  ["films", "review"],
  async ([id]: [string]) => {
    try {
      const res = await fetch(`${api}/films/${id}/reviews`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        return [];
      }
      const raw = await res.json();
      const maybeReviews = await FilmReviews.safeParseAsync(raw);
      if (!maybeReviews.success) {
        console.log(maybeReviews.error);
        return [];
      }
      return maybeReviews.data;
    } catch (_) {
      return [];
    }
  }
);

type ReviewResponse = Union<{
  Ok: {};
  BadInput: { message: string };
  Unauthorized: {};
  SelfReview: {};
  Error: { message: string };
}>;

export const review = mutation(
  ["films", "review"],
  async (arg: {
    filmId: number;
    rating: number;
    review?: string;
  }): Promise<ReviewResponse> => {
    try {
      const res = await fetch(`${api}/films/${arg.filmId}/reviews`, {
        method: "POST",
        headers: {
          "X-Authorization": session() ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: arg.rating,
          review: arg.review,
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
              kind: "SelfReview",
            };
          default:
            return {
              kind: "Error",
              message: "Unknown error",
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
