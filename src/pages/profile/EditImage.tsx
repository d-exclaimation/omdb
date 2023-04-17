import { Menu, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";

const EditImage: FC = () => {
  return (
    <Menu as="div" className="-translate-x-10 min-w-max">
      <Menu.Button className="bg-white ring-2 ring-zinc-400/50 rounded-md px-3 py-1 text-sm">
        Edit
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
        <Menu.Items className="absolute p-1 rounded-md mt-2 w-36 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button className="w-full flex">
                <label
                  className="flex w-full items-center rounded-md px-2 py-2 text-sm data-selected:bg-zinc-800 data-selected:text-white"
                  data-selected={active}
                  htmlFor="file-upload"
                >
                  Upload a photo
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className="flex w-full items-center rounded-md px-2 py-2 text-sm data-selected:bg-red-500 data-selected:text-white"
                data-selected={active}
              >
                Remove
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EditImage;
