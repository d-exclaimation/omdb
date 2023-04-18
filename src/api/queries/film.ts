import { userId } from "../../common/utils/storage";
import { __API_URL__ } from "../url";

export async function topFilms() {
  const id = userId();
  if (!id) {
    return {
      films: [],
      count: 0,
    };
  }
  const res = await fetch(`${__API_URL__}/films?count=${5}&directorId=${id}`, {
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
  return raw as {
    films: any[];
    count: number;
  };
}
