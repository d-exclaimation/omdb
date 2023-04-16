import { Transition } from "@headlessui/react";
import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div
      className="max-w-3xl px-5 h-max flex-col items-center justify-center 
      pb-20 backdrop-blur-sm min-h-screen w-full flex p-4"
    >
      <Transition
        as="div"
        className="flex flex-col items-center p-4"
        appear
        show
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl flex flex-row gap-2 md:gap-3 font-semibold">
          <Transition.Child
            key="home-page-title-1"
            as="span"
            enter="transition-all duration-500 delay-0"
            enterFrom="opacity-0 -translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-500 delay-0"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-20"
          >
            IMDb
          </Transition.Child>
          <Transition.Child
            as="span"
            key="home-page-title-2"
            enter="transition-all duration-500 delay-300"
            enterFrom="opacity-0 translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-500 delay-300"
            leaveFrom="opacity-100 -translate-y-0"
            leaveTo="opacity-0 -translate-y-20"
          >
            but
          </Transition.Child>
          <Transition.Child
            as="span"
            key="home-page-title-3"
            enter="transition-all duration-500 delay-500"
            enterFrom="opacity-0 -translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-500 delay-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-20"
          >
            better
          </Transition.Child>
        </h1>
      </Transition>
    </div>
  );
};

export default HomePage;
