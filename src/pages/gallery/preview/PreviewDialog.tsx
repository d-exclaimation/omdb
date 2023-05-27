import { Transition } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";

type PreviewDialogProps = {
  open: boolean;
};

const PreviewDialog: FC<PreviewDialogProps> = ({ open }) => {
  return (
    <Transition
      as="div"
      key="login-dialog"
      show
      appear
      className="fixed inset-0 w-screen h-screen z-10 bg-zinc-900/5 dark:bg-zinc-100/5 backdrop-blur-[2px]"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[85vw] max-w-md z-30 transform rounded bg-white dark:bg-zinc-800
        p-6 text-left align-middle shadow-2xl transition-all"
      >
        <h3 className="inline-flex items-center text-lg font-medium leading-6 max-w-full truncate text-gray-900 dark:text-gray-100">
          <img
            className="w-6 h-6 mr-2 dark:content-[url('/icons/gallery-selected.svg')]"
            src="/icons/gallery.svg"
          />
          Film Gallery
        </h3>
        <div className="mt-4 flex flex-col w-full min-h-max text-sm transition-all gap-2 dark:text-white">
          <p>
            Gallery allow you to view all of films you made, your highest rated
            films, and films you reviewed all in a single page
          </p>

          <p className="mt-1">
            <Link
              to={`/signup?redirect=${encodeURIComponent("/gallery")}`}
              className="text-zinc-500 hover:underline active:underline decoration-zinc-500"
            >
              Join
            </Link>{" "}
            OMDb to see your gallery
          </p>
        </div>

        <div className="mt-4 flex justify-end z-40">
          <Link
            to={`/login?redirect=${encodeURIComponent("/gallery")}`}
            className="text-xs text-zinc-50 bg-zinc-900 rounded px-3 py-2
            hover:bg-zinc-50 active:bg-zinc-50 transition-all
            hover:text-zinc-900 active:text-zinc-900 ring-1 ring-zinc-900
            dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-950 dark:active:bg-zinc-950 dark:ring-zinc-100
            dark:hover:text-zinc-100 dark:active:text-zinc-100"
          >
            Login
          </Link>
        </div>
      </div>
    </Transition>
  );
};

export default PreviewDialog;
