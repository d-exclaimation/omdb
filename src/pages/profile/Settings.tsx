import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { Link } from "react-router-dom";

type SettingsProps = {
  onEdit: () => void;
  onLogout: () => void;
};

const Settings: FC<SettingsProps> = ({ onEdit, onLogout }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex justify-center rounded border border-transparent 
        bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-900
        hover:bg-zinc-200 active:bg-zinc-200 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 disabled:opacity-50
        focus-visible:ring-zinc-500 focus-visible:ring-offset-2
        dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:active:bg-zinc-700
        "
      >
        Settings
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-1 right-0 origin-top-right divide-y divide-zinc-200 dark:divide-zinc-700 rounded mt-2 w-40 bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5 focus:outline-none">
          <div className="mb-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/gallery?create=true"
                  className="flex w-full items-center rounded px-2
                  text-blue-700 dark:text-blue-300 md:text-black dark:md:text-white text-sm py-2
                  md:data-selected:bg-blue-500 md:data-selected:text-white
                  dark:md:data-selected:bg-blue-400 dark:md:data-selected:text-black"
                  data-selected={active}
                >
                  Create film
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/gallery"
                  className="flex w-full items-center rounded px-2
                  text-purple-700 dark:text-purple-300 md:text-black dark:md:text-white text-sm py-2
                  md:data-selected:bg-purple-500 md:data-selected:text-white
                  dark:md:data-selected:bg-purple-400 dark:md:data-selected:text-black"
                  data-selected={active}
                >
                  Gallery
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="mt-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="flex w-full items-center rounded px-2 py-2 text-sm dark:text-white data-selected:bg-zinc-800 
                  dark:data-selected:bg-zinc-200 data-selected:text-white dark:data-selected:text-black"
                  data-selected={active}
                  onClick={onEdit}
                >
                  Edit profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="flex w-full items-center rounded px-2 py-2
                text-red-700 dark:text-red-300 md:text-black dark:md:text-white text-sm 
                md:data-selected:bg-red-500 md:data-selected:text-white
                dark:md:data-selected:bg-red-400 dark:md:data-selected:text-black"
                  data-selected={active}
                  onClick={onLogout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Settings;
