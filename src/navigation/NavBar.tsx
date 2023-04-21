import { Tab } from "@headlessui/react";
import { useMemo, type FC } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
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
        className="z-30 fixed bottom-4 mx-auto 
        flex flex-row items-center justify-center
        w-max p-1 rounded-full backdrop-blur-sm 
      bg-white gap-1 shadow-lg overflow-hidden
        ring-1 ring-zinc-300/50"
      >
        <NavTab
          href="/"
          icons={{
            deselected: "/icons/home.svg",
            selected: "/icons/home-selected.svg",
          }}
        />
        <div className="h-4 w-[1px] mx-1 md:mx-2 bg-black/10"></div>

        <NavTab
          href="/explore"
          icons={{
            deselected: "/icons/compass.svg",
            selected: "/icons/compass-selected.svg",
          }}
        />
        <NavTab
          href="/gallery"
          icons={{
            deselected: "/icons/popcorn.svg",
            selected: "/icons/popcorn-selected.svg",
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
