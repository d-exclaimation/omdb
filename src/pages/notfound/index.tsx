import { Transition } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { tw } from "../../common/utils/tailwind";
import SnakePage from "./snake";

const NotFoundPage: FC = () => {
  return (
    <div className="flex h-max min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 overflow-x-hidden px-5 pb-20 pt-2">
      <Transition
        as="div"
        className="flex h-max min-h-full w-full flex-1 translate-y-10 flex-col items-center justify-center"
        key="login-page"
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        <div className="mb-5 flex flex-row items-center justify-center gap-4">
          <h2 className="text-4xl font-bold dark:text-white">404</h2>
          <span className="my-4 h-8 w-[1px] bg-black/30 dark:bg-white/30" />
          <h3 className="text-lg font-medium dark:text-white">
            Page not found
          </h3>
        </div>
        <SnakePage />
        <div className="mt-4 h-4 text-base">
          <Link to="/">
            <span
              className={tw(`border-b border-zinc-800 text-zinc-800 hover:text-zinc-700 active:text-zinc-700
              dark:border-zinc-200 dark:text-zinc-200 dark:hover:text-zinc-300 dark:active:text-zinc-300`)}
            >
              Go back to home
            </span>
          </Link>
        </div>
      </Transition>
    </div>
  );
};

export default NotFoundPage;
