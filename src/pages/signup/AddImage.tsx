import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, type FC } from "react";

type AddImageProps = {
  className?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
};

const AddImage: FC<AddImageProps> = ({ className, onRemove, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Menu as="div" className={`min-w-max z-50 ${className ?? ""}`}>
      <Menu.Button
        type="button"
        className="inline-flex items-center bg-white ring-1 ring-zinc-400/50 hover:bg-zinc-100
      active:bg-zinc-100 rounded-full p-2 text-sm dark:bg-zinc-900 dark:ring-zinc-600/50
      dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
      >
        <svg
          className="w-4 h-4 fill-black dark:fill-white"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            if (!e.target.files || !e.target.files.length) {
              return;
            }
            const file = e.target.files[0];
            onUpload(file);
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
        <Menu.Items className="absolute p-1 -translate-x-1/2 rounded mt-2 w-36 bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black/5 dark:ring-white/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex w-full items-center rounded px-2 py-2 text-sm data-selected:bg-zinc-800 data-selected:text-white
                dark:data-selected:bg-zinc-200 dark:data-selected:text-black dark:text-white"
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
                type="button"
                className="flex w-full items-center rounded px-2 py-2
                text-red-700 dark:text-red-300 md:text-black dark:md:text-white text-sm 
                md:data-selected:bg-red-500 md:data-selected:text-white
                dark:md:data-selected:bg-red-400 dark:md:data-selected:text-black"
                data-selected={active}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                  onRemove();
                }}
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

export default AddImage;
