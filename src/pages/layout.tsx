import { Transition } from "@headlessui/react";
import { type FC } from "react";

type LayoutProps = {
  route: string;
  heading: string;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ route, heading, children }) => {
  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col items-center gap-4 justify-center pt-2 pb-20">
      <Transition
        as="div"
        className="w-full flex flex-col"
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
        <h3 className="font-medium text-black/60 dark:text-white/60 py-3">
          {route}
        </h3>
        <h1 className="text-3xl font-medium max-w-[80%] truncate text-black dark:text-white py-5">
          {heading}
        </h1>
      </Transition>
      <Transition
        as="div"
        className="flex-1 w-full min-h-full h-max flex"
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
