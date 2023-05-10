import * as Toast from "@radix-ui/react-toast";
import { useEffect, type FC, type ReactNode } from "react";
import Notification from "../../components/Notification";
import { useCacheControlProvider } from "../cache/useCacheControlProvider";
import { useGenreProvider } from "../genre/useGenreProvider";
import { useNotificationProvider } from "../notification/useNotificationProvider";
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
  const { remove, notifications, notify } = useNotificationProvider();

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <GlobalContext.Provider
      value={{
        genres,
        cache,
        notification: {
          notifications,
          notify,
        },
      }}
    >
      <Toast.Provider swipeDirection="left">
        {children}
        {notifications.map(({ ...rest }) => (
          <Notification
            onRemove={remove}
            key={rest.date.toISOString()}
            {...rest}
          />
        ))}
        <Toast.Viewport className="[--viewport-padding:_25px] fixed top-0 md:top-unset md:bottom-0 left-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[100] outline-none" />
      </Toast.Provider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
