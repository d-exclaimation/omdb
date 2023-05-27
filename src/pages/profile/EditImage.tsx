import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, type FC } from "react";

type EditImageProps = {
  className?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
};

const EditImage: FC<EditImageProps> = ({ onUpload, onRemove, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Menu as="div" className={`min-w-max z-50 ${className ?? ""}`}>
      <Menu.Button
        type="button"
        className="inline-flex items-center bg-white ring-1 ring-zinc-400/50 hover:bg-zinc-100
      active:bg-zinc-100 rounded px-3 py-1 text-sm dark:bg-zinc-800 dark:ring-zinc-600/50 
      dark:hover:bg-zinc-700 dark:active:bg-zinc-700 dark:text-white"
      >
        <img
          className="w-3 h-3 mr-1 dark:content-[url('/icons/edit-selected.svg')]"
          src="/icons/edit.svg"
        />
        Edit
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
        <Menu.Items
          className="absolute p-1 rounded mt-2 w-36 bg-white shadow-lg ring-1 ring-black/5
          focus:outline-none dark:bg-zinc-800 dark:ring-white/5"
        >
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

export default EditImage;
