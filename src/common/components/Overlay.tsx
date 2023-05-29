import { Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";

type OverlayProps = {
  className?: string;
};

const OverlayRoot: FC<OverlayProps> = ({ className }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/25 dark:bg-zinc-900/50 backdrop-blur-sm
        ${className ?? ""}`}
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
        className={`fixed inset-0 bg-black/25 dark:bg-zinc-900/50 backdrop-blur-sm
      ${className ?? ""}`}
      />
    </Transition.Child>
  );
};

const Overlay = {
  Root: OverlayRoot,
  Child: OverlayChild,
};

export default Overlay;
