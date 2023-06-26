import { z } from "zod";

export type FilmOverview = z.infer<typeof FilmOverview>;
export const FilmOverview = z.object({
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
export const FilmDetail = FilmOverview.extend({
  description: z.string(),
  runtime: z.number().int().nullish().optional(),
  numReviews: z.number().int(),
});

export type FilmSearch = z.infer<typeof FilmSearch>;
export const FilmSearch = z.object({
  films: z.array(FilmOverview),
  count: z.number().int(),
});

export type FilmId = z.infer<typeof FilmId>;
export const FilmId = z.object({
  filmId: z.number().int(),
});

export type FilmReviews = z.infer<typeof FilmReviews>;
export const FilmReviews = z.array(
  z.object({
    reviewerId: z.number().int(),
    rating: z.number(),
    review: z.string().nullish().optional(),
    reviewerFirstName: z.string(),
    reviewerLastName: z.string(),
    timestamp: z.coerce.date(),
  })
);

export type CreateFilm = z.infer<typeof CreateFilm>;
export const CreateFilm = z.object({
  title: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(64, "Must be at most 64 characters long"),
  description: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(256, "Must be at most 256 characters long"),
  releaseDate: z
    .date()
    .refine((date) => date > new Date(), "Must be in the future")
    .optional(),
  genreId: z.number().int(),
  runtime: z
    .number()
    .int()
    .min(1, "Must be at least 1 minute long")
    .max(300, "Must be at most 300 minutes long")
    .nullable()
    .optional(),
  ageRating: z
    .enum(["G", "PG", "M", "R13", "R16", "R18", "TBC"])
    .default("TBC"),
});

export type EditFilm = z.infer<typeof EditFilm>;
export const EditFilm = z.object({
  title: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(64, "Must be at most 64 characters long"),
  description: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(256, "Must be at most 256 characters long"),
  releaseDate: z
    .date()
    .refine((date) => date > new Date(), "Must be in the future")
    .optional(),
  genreId: z.number().int(),
  runtime: z
    .number()
    .int()
    .min(1, "Must be at least 1 minute long")
    .max(300, "Must be at most 300 minutes long")
    .nullable()
    .optional(),
  ageRating: z
    .enum(["G", "PG", "M", "R13", "R16", "R18", "TBC"])
    .default("TBC"),
});

export type ReviewFilm = z.infer<typeof ReviewFilm>;
export const ReviewFilm = z.object({
  review: z
    .string()
    .max(512, "Must be at most 512 characters long")
    .optional()
    .transform((value) => (!!value ? value : undefined)),
  rating: z
    .number()
    .int()
    .min(1, "Must be at least 1")
    .max(10, "Must be at most 5"),
});
