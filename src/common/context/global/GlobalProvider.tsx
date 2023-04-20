import { type FC, type ReactNode } from "react";
import { useCacheControlProvider } from "../cache/useCacheControlProvider";
import { useGenreProvider } from "../genre/useGenreProvider";
import { GlobalContext } from "./GlobalContext";

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const genres = useGenreProvider();
  const cache = useCacheControlProvider<["user", "film"]>({
    user: new Date().toISOString(),
    film: new Date().toISOString(),
  });
  return (
    <GlobalContext.Provider
      value={{
        genres,
        cache,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
