import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { tw } from "../../common/utils/tailwind";

type SettingsProps = {
  className?: string;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const Settings: FC<SettingsProps> = ({
  className,
  onDelete,
  onEdit,
  disabled,
}) => {
  return (
    <Menu
      as="div"
      className={`relative z-40 inline-block text-left
      ${className ?? ""}`}
    >
      <Menu.Button
        className={tw(`inline-flex items-center justify-center rounded border border-transparent 
        bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 
        focus-visible:ring-offset-2 active:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50
        dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-700`)}
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
        <Menu.Items
          className={tw(`absolute right-0 z-40 mt-2 w-36 origin-top-right rounded bg-white p-1
          shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-zinc-800 dark:ring-white/5`)}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={tw(`flex w-full items-center rounded px-2 py-2 
                text-sm disabled:cursor-not-allowed disabled:opacity-50
                data-selected:bg-zinc-800 data-selected:text-white
                dark:text-white dark:data-selected:bg-zinc-200 
                dark:data-selected:text-black`)}
                data-selected={!disabled && active}
                onClick={onEdit}
                disabled={disabled}
              >
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={tw(`flex w-full items-center rounded px-2 py-2 text-sm text-red-700 
                dark:text-red-300 md:text-black md:data-selected:bg-red-500 
                md:data-selected:text-white dark:md:text-white
                dark:md:data-selected:bg-red-400 dark:md:data-selected:text-black`)}
                data-selected={active}
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Settings;
