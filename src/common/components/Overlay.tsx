import { Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { tw } from "../utils/tailwind";

type OverlayProps = {
  className?: string;
};

const OverlayRoot: FC<OverlayProps> = ({ className }) => {
  return (
    <div
      className={tw(
        `fixed inset-0 bg-black/25 backdrop-blur-sm dark:bg-zinc-900/50`,
        className
      )}
    />
  );
};

const OverlayChild: FC<OverlayProps> = ({ className }) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={tw(
          `fixed inset-0 bg-black/25 backdrop-blur-sm dark:bg-zinc-900/50`,
          className
        )}
      />
    </Transition.Child>
  );
};

const Overlay = {
  Root: OverlayRoot,
  Child: OverlayChild,
};

export default Overlay;
