import { Tab } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { tw } from "../common/utils/tailwind";

type NavTabProps = {
  href: string;
  icons: {
    deselected: string;
    selected: string;
  };
};

const NavTab: FC<NavTabProps> = ({ href, icons }) => {
  return (
    <Tab
      as="div"
      className="group relative flex select-none items-center justify-center rounded-full"
    >
      {({ selected }) => (
        <>
          <span
            className={tw(`absolute -z-10 -translate-y-8 rounded-lg bg-black px-2 py-1 
            text-[0.675rem] capitalize leading-3 text-white opacity-0 
            transition-all group-hover:duration-500 dark:bg-white dark:text-black 
            md:group-hover:z-10 md:group-hover:-translate-y-12 md:group-hover:opacity-100`)}
            data-selected={selected}
          >
            {href.substring(1) || "home"}
          </span>
          <Link
            to={href}
            data-selected={selected}
            className={tw(`group relative flex select-none items-center 
            rounded-full bg-white p-3 outline-none transition-all 
            duration-400 hover:bg-slate-200 data-selected:bg-black
            dark:bg-zinc-900 dark:hover:bg-slate-800 dark:data-selected:bg-white`)}
          >
            <img
              className={tw(`h-5 w-5 overflow-hidden opacity-100 transition-all 
              duration-400 group-data-selected:opacity-0 dark:opacity-0 
              dark:group-data-selected:opacity-100 md:h-6 md:w-6`)}
              src={icons.deselected}
            />

            <img
              className={tw(`absolute h-5 w-5 overflow-hidden opacity-0 transition-all 
              duration-400 group-data-selected:opacity-100 dark:opacity-100 
              dark:group-data-selected:opacity-0 md:h-6 md:w-6`)}
              src={icons.selected}
            />
          </Link>
        </>
      )}
    </Tab>
  );
};

export default NavTab;
