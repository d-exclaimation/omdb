import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import Button from "../../common/components/Button";
import InputField from "../../common/components/InputField";
import Overlay from "../../common/components/Overlay";
import EditImage from "./EditImage";

type EditProps = {
  editing: boolean;
  close: () => void;
};

const Edit: FC<EditProps> = ({ editing, close }) => {
  return (
    <Transition appear show={editing} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={close}>
        <Overlay.Child />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit profile
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max">
                  <div className="flex w-full items-end justify-start">
                    <img
                      className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-full"
                      src="https://api.dicebear.com/6.x/shapes/svg?seed=Cookie"
                      alt="avatar"
                    />
                    <EditImage />
                  </div>

                  <div className="flex flex-col items-start justify-center w-full mt-4 gap-1">
                    <InputField
                      label="First name"
                      value=""
                      placeholder="Provide a first name"
                      onChange={() => {}}
                    />
                    <InputField
                      label="Last name"
                      value=""
                      placeholder="Provide a last name"
                      onChange={() => {}}
                    />
                    <InputField
                      label="Email"
                      value=""
                      placeholder="Provide an email"
                      onChange={() => {}}
                    />
                    <InputField
                      type="password"
                      label="Password"
                      value=""
                      placeholder="New password"
                      onChange={() => {}}
                    />
                    <InputField
                      label="Old password"
                      value=""
                      placeholder="Provide your old passwword"
                      onChange={() => {}}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <Button
                    color={{
                      bg: "bg-zinc-100",
                      text: "text-zinc-900",
                      hover: "hover:bg-zinc-200",
                      active: "active:bg-zinc-200",
                      border: "focus-visible:ring-zinc-500",
                    }}
                    onClick={close}
                  >
                    Cancel
                  </Button>
                  <Button
                    color={{
                      bg: "bg-sky-100",
                      text: "text-sky-900",
                      hover: "hover:bg-sky-200",
                      active: "active:bg-sky-200",
                      border: "focus-visible:ring-sky-500",
                    }}
                    onClick={close}
                  >
                    Save
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Edit;
