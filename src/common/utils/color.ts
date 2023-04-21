import { type Palette } from "@d-exclaimation/common/tailwind";

type Colors = {
  bg: Palette["bg"];
  text: Palette["text"];
};
export function ageRatingToColor(ageRating: string): Colors {
  switch (ageRating.trim().toUpperCase()) {
    case "G":
      return {
        bg: "bg-green-200",
        text: "text-green-900",
      };
    case "PG":
      return {
        bg: "bg-yellow-200",
        text: "text-yellow-900",
      };
    case "M":
      return {
        bg: "bg-fuchsia-200",
        text: "text-fuchsia-900",
      };
    case "R13":
      return {
        bg: "bg-amber-200",
        text: "text-amber-900",
      };
    case "R16":
      return {
        bg: "bg-orange-200",
        text: "text-orange-900",
      };
    case "R18":
      return {
        bg: "bg-red-200",
        text: "text-red-900",
      };
    default:
      return {
        bg: "bg-zinc-200",
        text: "text-zinc-900",
      };
  }
}

export function ratingToColor(rating: number): Colors["text"] {
  if (rating >= 8) {
    return "text-green-600";
  }
  if (rating >= 6) {
    return "text-yellow-600";
  }
  if (rating >= 4) {
    return "text-amber-600";
  }
  if (rating >= 2) {
    return "text-orange-600";
  }
  return "text-red-600";
}
