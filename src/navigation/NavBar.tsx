import { Tab } from "@headlessui/react";
import { type FC } from "react";
import { useLocation } from "react-router-dom";
import NavTab from "./NavTab";

const PATHS = {
  "/": 0,
  "/profile": 1,
  "/films": 2,
  "/myfilms": 3,
  "/reviews": 4,
};

const NavBar: FC = () => {
  const { pathname } = useLocation();
  return (
    <Tab.Group selectedIndex={PATHS[pathname as keyof typeof PATHS]}>
      <Tab.List
        as="nav"
        className="z-50 fixed bottom-4 mx-auto 
        flex flex-row items-center justify-center
        w-max p-1 rounded-full backdrop-blur-sm 
      bg-white gap-1 shadow-lg overflow-hidden"
      >
        <NavTab
          href="/"
          icons={{
            deselected: "/icons/home.svg",
            selected: "/icons/home-selected.svg",
          }}
        />
        <NavTab
          href="/profile"
          icons={{
            deselected: "/icons/profile.svg",
            selected: "/icons/profile-selected.svg",
          }}
        />
        <div className="h-4 w-[1px] mx-1 bg-black/10"></div>
        <NavTab
          href="/films"
          icons={{
            deselected: "/icons/popcorn.svg",
            selected: "/icons/popcorn-selected.svg",
          }}
        />
        <NavTab
          href="/myfilms"
          icons={{
            deselected: "/icons/film.svg",
            selected: "/icons/film-selected.svg",
          }}
        />
        <NavTab
          href="/reviews"
          icons={{
            deselected: "/icons/review.svg",
            selected: "/icons/review-selected.svg",
          }}
        />
      </Tab.List>
    </Tab.Group>
  );
};

export default NavBar;
