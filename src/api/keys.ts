export const queryKeys = {
  user: {
    prefix: "me",
    me: ["me"],
    topFilms: ["me", { kind: "top-films" }],
  },
} as const;
