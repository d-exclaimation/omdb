import { z } from "zod";

export type Genres = z.infer<typeof Genres>;
export const Genres = z.array(
  z.object({
    genreId: z.number().int(),
    name: z.string(),
  })
);
