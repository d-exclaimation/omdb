import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";

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
      className={`relative inline-block text-left
      ${className ?? ""}`}
    >
      <Menu.Button
        className="inline-flex justify-center items-center rounded border border-transparent 
      bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-900
      hover:bg-zinc-200 active:bg-zinc-200 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 disabled:opacity-50
      focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
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
        <Menu.Items className="absolute p-1 right-0 origin-top-right rounded mt-2 w-36 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex w-full items-center rounded px-2 py-2 text-sm 
                data-selected:bg-zinc-800 data-selected:text-white
                disabled:cursor-not-allowed disabled:opacity-50"
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
                className="flex w-full items-center rounded px-2 py-2
              text-red-700 md:text-black text-sm 
              md:data-selected:bg-red-500 md:data-selected:text-white"
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
