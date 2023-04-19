import { useContext } from "react";
import { GenreContext } from "./GenreContext";

export function useGenres() {
  const { genres, get } = useContext(GenreContext);
  return { genres, get };
}
