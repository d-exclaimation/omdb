import { useContext } from "react";
import { GlobalContext } from "../global/GlobalContext";

export function useGenres() {
  const { genres } = useContext(GlobalContext);
  return genres;
}
