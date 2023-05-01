import { Transition } from "@headlessui/react";
import { type FC } from "react";
import Button from "../../common/components/Button";

type LoginDialogProps = {
  open: boolean;
};

const LoginDialog: FC<LoginDialogProps> = ({ open }) => {
  return (
    <Transition
      as="div"
      key="login-dialog"
      show
      appear
      className="fixed inset-0 w-screen h-screen z-10"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[90vw] max-w-md z-30 transform rounded bg-white 
        p-6 text-left align-middle shadow-2xl transition-all"
      >
        <h3 className="text-lg font-medium leading-6 max-w-full truncate text-gray-900">
          Gallery view
        </h3>
        <div className="mt-4 flex flex-col w-full min-h-max text-sm transition-all">
          You must be logged in to view the gallery.
        </div>

        <div className="mt-4 flex justify-center z-40">
          <Button
            className="w-full"
            color={{
              bg: "bg-zinc-900",
              text: "text-zinc-50",
              hover: "hover:bg-zinc-700",
              active: "active:bg-zinc-700",
              border: "focus-visible:ring-zinc-500",
            }}
            onClick={() => {}}
          >
            Login
          </Button>
        </div>
      </div>
    </Transition>
  );
};

export default LoginDialog;
