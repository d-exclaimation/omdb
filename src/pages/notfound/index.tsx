import { Transition } from "@headlessui/react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import SnakePage from "./snake";

const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col overflow-x-hidden items-center gap-4 justify-center pt-2 pb-20">
      <Transition
        as="div"
        className="flex-1 w-full min-h-full h-max flex flex-col translate-y-10 justify-center items-center"
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
        <div className="flex flex-row items-center gap-4 mb-5 justify-center">
          <h2 className="font-bold text-4xl dark:text-white">404</h2>
          <span className="w-[1px] h-8 my-4 bg-black/30 dark:bg-white/30" />
          <h3 className="font-medium text-lg dark:text-white">
            Page not found
          </h3>
        </div>
        <SnakePage />
        <div className="text-base h-4 mt-4">
          <Link to="/">
            <span
              className="text-zinc-800 dark:text-zinc-200 border-b border-zinc-800 dark:border-zinc-200
              hover:text-zinc-700 active:text-zinc-700 dark:hover:text-zinc-300 dark:active:text-zinc-300"
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
