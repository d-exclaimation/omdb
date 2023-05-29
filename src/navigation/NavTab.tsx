import { Tab } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";

type NavTabProps = {
  href: string;
  icons: {
    deselected: string;
    selected: string;
  };
};

const NavTab: FC<NavTabProps> = ({ href, icons }) => {
  return (
    <Tab as="div" className="relative flex items-center group justify-center">
      {({ selected }) => (
        <>
          <span
            className="absolute -z-10 -translate-y-8 opacity-0 px-2 py-1 rounded-lg text-xs bg-black text-white
            group-hover:z-10 group-hover:-translate-y-12 group-hover:opacity-100 transition-all capitalize
            data-selected:hidden dark:bg-white dark:text-black group-hover:duration-500"
            data-selected={selected}
          >
            {href.substring(1) || "home"}
          </span>
          <Link
            to={href}
            data-selected={selected}
            className="group p-3 flex rounded-full items-center bg-white transition-all duration-400 
          hover:bg-slate-200 data-selected:bg-black select-none outline-none relative
          dark:bg-zinc-900 dark:hover:bg-slate-800 dark:data-selected:bg-white"
          >
            <img
              className="w-5 h-5 md:w-6 md:h-6 overflow-hidden opacity-100 dark:opacity-0 group-data-selected:opacity-0 dark:group-data-selected:opacity-100 transition-all duration-400"
              src={icons.deselected}
            />

            <img
              className="w-5 h-5 md:w-6 md:h-6 absolute overflow-hidden dark:opacity-100 opacity-0 group-data-selected:opacity-100 dark:group-data-selected:opacity-0 transition-all duration-400"
              src={icons.selected}
            />
          </Link>
        </>
      )}
    </Tab>
  );
};

export default NavTab;
