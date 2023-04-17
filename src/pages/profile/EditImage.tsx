import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, type FC } from "react";

type EditImageProps = {
  onUpload: (src: string, file: File) => void;
  onRemove: () => void;
};

const EditImage: FC<EditImageProps> = ({ onUpload, onRemove }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Menu as="div" className="-translate-x-10 min-w-max">
      <Menu.Button
        className="bg-white ring-1 ring-zinc-400/50 hover:bg-zinc-100
      active:bg-zinc-100 rounded-md px-3 py-1 text-sm"
      >
        Edit
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            if (!e.target.files) {
              return;
            }
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (ev) => {
              if (typeof ev.target?.result !== "string") {
                return;
              }
              onUpload(ev.target.result, file);
            };
          }}
        />
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
              <button
                className="flex w-full items-center rounded-md px-2 py-2 text-sm data-selected:bg-zinc-800 data-selected:text-white"
                data-selected={active}
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                Upload a photo
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
