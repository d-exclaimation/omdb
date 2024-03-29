import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, type FC } from "react";
import { useNotification } from "../../common/context/notification/useNotification";
import { tw } from "../../common/utils/tailwind";

type EditImageProps = {
  className?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
};

const EditImage: FC<EditImageProps> = ({ onUpload, onRemove, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { notify } = useNotification();
  return (
    <Menu as="div" className={tw("z-50 min-w-max", className)}>
      <Menu.Button
        type="button"
        className={tw(`inline-flex items-center rounded bg-white px-3 py-1
        text-sm ring-1 ring-zinc-400/50 hover:bg-zinc-100 active:bg-zinc-100 
        dark:bg-zinc-800 dark:text-white first-letter:dark:ring-zinc-600/50 
        dark:hover:bg-zinc-700 dark:active:bg-zinc-700`)}
      >
        <img
          className="mr-1 h-3 w-3 dark:content-[url('/icons/edit-selected.svg')]"
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
              notify({
                kind: "warning",
                title: "No file selected",
              });
              return;
            }
            const file = e.target.files[0];

            if (!file.type.startsWith("image/")) {
              notify({
                kind: "warning",
                title: "File must be an image",
              });
              return;
            }

            if (file.size > 2.5 * 1024 * 1024) {
              notify({
                kind: "warning",
                title: "File size must be less than 2.5MB",
              });
              return;
            }

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
          className={tw(`absolute mt-2 w-36 rounded bg-white 
          p-1 shadow-lg ring-1 ring-black/5 focus:outline-none
          dark:bg-zinc-800 dark:ring-white/5`)}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={tw(`flex w-full items-center rounded px-2 py-2 text-sm 
                data-selected:bg-zinc-800 data-selected:text-white dark:text-white
                dark:data-selected:bg-zinc-200 dark:data-selected:text-black`)}
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
                className={tw(`flex w-full items-center rounded 
                px-2 py-2 text-sm text-red-700 dark:text-red-300 
                md:text-black md:data-selected:bg-red-500 
                md:data-selected:text-white dark:md:text-white
                dark:md:data-selected:bg-red-400 dark:md:data-selected:text-black`)}
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
