import { Transition } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { tw } from "../../../common/utils/tailwind";

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
      className="fixed inset-0 z-10 h-screen w-screen bg-zinc-900/5 backdrop-blur-[2px] dark:bg-zinc-900/50"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className={tw(`fixed left-1/2 top-1/2 z-30 w-[85vw]
        max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6
        text-left align-middle shadow-2xl transition-all dark:bg-zinc-800`)}
      >
        <h3 className="inline-flex max-w-full items-center truncate text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          <img
            className="mr-2 h-6 w-6 dark:content-[url('/icons/gallery-selected.svg')]"
            src="/icons/gallery.svg"
          />
          Film Gallery
        </h3>
        <div className="mt-4 flex min-h-max w-full flex-col gap-2 text-sm transition-all dark:text-white">
          <p>
            Gallery allow you to view all of films you made, your highest rated
            films, and films you reviewed all in a single page
          </p>

          <p className="mt-1">
            <Link
              to={`/signup?redirect=${encodeURIComponent("/gallery")}`}
              className="text-zinc-500 decoration-zinc-500 hover:underline active:underline"
            >
              Join
            </Link>{" "}
            OMDb to see your gallery
          </p>
        </div>

        <div className="z-40 mt-4 flex justify-end">
          <Link
            to={`/login?redirect=${encodeURIComponent("/gallery")}`}
            className={tw(`rounded bg-zinc-900 px-3 py-2 text-xs text-zinc-50
            ring-1 ring-zinc-900 transition-all hover:bg-zinc-50 
            hover:text-zinc-900 active:bg-zinc-50 active:text-zinc-900
            dark:bg-zinc-100 dark:text-zinc-950 dark:ring-zinc-100 
            dark:hover:bg-zinc-950 dark:hover:text-zinc-100
            dark:active:bg-zinc-950 dark:active:text-zinc-100`)}
          >
            Login
          </Link>
        </div>
      </div>
    </Transition>
  );
};

export default PreviewDialog;
