import { createContext } from "react";
import { type CacheControl } from "../cache/CacheControl";
import { initialGenreContext, type GenreContext } from "../genre/GenreContext";
import {
  initialNotificationContext,
  type NotificationContext,
} from "../notification/NotificationContext";

export type GlobalContext = {
  genres: GenreContext;
  cache: CacheControl<["user", "film"]>;
  notification: NotificationContext;
};

export const GlobalContext = createContext<GlobalContext>({
  genres: initialGenreContext,
  get cache(): CacheControl<["user", "film"]> {
    throw new Error("invalidate is not implemented");
  },
  notification: initialNotificationContext,
});
