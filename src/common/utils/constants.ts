import { type Sorting } from "../../types/constants";

export const ageRatings = {
  TBC: "To Be Confirmed",
  G: "General Audience",
  PG: "Parental Guidance Suggested",
  M: "Mature Content",
  R13: "Restricted (13 years and over)",
  R16: "Restricted (16 years and over)",
  R18: "Restricted (18 years and over)",
};

export const ratings = {
  10: "Excellent",
  9: "Great",
  8: "Very Good",
  7: "Good",
  6: "Above Average",
  5: "Average",
  4: "Below Average",
  3: "Poor",
  2: "Very Poor",
  1: "Terrible",
};

export const sortings = {
  "RELEASED_ASC": "Released ↑",
  "RELEASED_DESC": "Released ↓",
  "RATING_ASC": "Rating ↑",
  "RATING_DESC": "Rating ↓",
  "ALPHABETICAL_ASC": "Alphabetical ↑",
  "ALPHABETICAL_DESC": "Alphabetical ↓",
} satisfies Record<Sorting, string>;

