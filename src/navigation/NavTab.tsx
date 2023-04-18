import { Tab } from "@headlessui/react";
import { Fragment, type FC } from "react";
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
    <Tab as={Fragment}>
      {({ selected }) => (
        <Link
          to={href}
          data-selected={selected}
          className="group p-3 flex rounded-full items-center bg-white transition-all duration-400 
          hover:bg-slate-200 data-selected:bg-black select-none outline-none"
        >
          <img
            className="w-5 h-5 md:w-6 md:h-6 overflow-hidden opacity-100 group-data-selected:opacity-0 transition-all duration-400"
            src={icons.deselected}
          />

          <img
            className="w-5 h-5 md:w-6 md:h-6 absolute overflow-hidden opacity-0 group-data-selected:opacity-100 transition-all duration-400"
            src={icons.selected}
          />
        </Link>
      )}
    </Tab>
  );
};

export default NavTab;
