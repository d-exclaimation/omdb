import { Tab } from "@headlessui/react";
import { useMemo, type FC } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { tw } from "../common/utils/tailwind";
import NavTab from "./NavTab";

const PATHS_INDEX = {
  "": 0,
  explore: 1,
  gallery: 2,
  film: 2,
  profile: 3,
  login: 3,
  signup: 3,
};

const NavBar: FC = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();

  const pathIndex = useMemo((): number | undefined => {
    const mainpath = pathname.split("/").at(1) ?? "";
    return PATHS_INDEX[mainpath as keyof typeof PATHS_INDEX];
  }, [pathname, isLoggedIn]);

  return (
    <Tab.Group selectedIndex={pathIndex}>
      <Tab.List
        as="nav"
        className={tw(`fixed bottom-4 z-30 mx-auto flex 
        w-max flex-row items-center justify-center gap-1 
        overflow-visible rounded-full bg-white p-1 shadow-lg 
        ring-1 ring-zinc-300/50 backdrop-blur-sm
        dark:bg-zinc-900 dark:ring-zinc-700/50`)}
      >
        <NavTab
          href="/"
          icons={{
            deselected: "/icons/omdb.svg",
            selected: "/icons/omdb-selected.svg",
          }}
        />
        <div className="mx-1 h-4 w-[1px] bg-black/10 dark:bg-white/20 md:mx-2"></div>

        <NavTab
          href="/explore"
          icons={{
            deselected: "/icons/telescope.svg",
            selected: "/icons/telescope-selected.svg",
          }}
        />
        <NavTab
          href="/gallery"
          icons={{
            deselected: "/icons/gallery.svg",
            selected: "/icons/gallery-selected.svg",
          }}
        />

        <NavTab
          href={isLoggedIn ? "/profile" : "/login"}
          icons={{
            deselected: isLoggedIn ? "/icons/profile.svg" : "/icons/auth.svg",
            selected: isLoggedIn
              ? "/icons/profile-selected.svg"
              : "/icons/auth-selected.svg",
          }}
        />
      </Tab.List>
    </Tab.Group>
  );
};

export default NavBar;
