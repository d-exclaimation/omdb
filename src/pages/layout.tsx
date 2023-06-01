import { Transition } from "@headlessui/react";
import { type FC } from "react";

type LayoutProps = {
  route: string;
  heading: string;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ route, heading, children }) => {
  return (
    <div className="flex h-max min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 px-5 pb-20 pt-2">
      <Transition
        as="div"
        className="flex w-full flex-col"
        key={`${route}-header`}
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 -translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-10"
      >
        <h3 className="py-3 font-medium text-black/60 dark:text-white/60">
          {route}
        </h3>
        <h1 className="max-w-[80%] truncate py-5 text-3xl font-medium text-black dark:text-white">
          {heading}
        </h1>
      </Transition>
      <Transition
        as="div"
        className="flex h-max min-h-full w-full flex-1"
        key={`${route}-content`}
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        {children}
      </Transition>
    </div>
  );
};

export default Layout;
