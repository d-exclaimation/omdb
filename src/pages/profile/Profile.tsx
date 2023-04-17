import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import Button from "../../common/components/Button";
import Overlay from "../../common/components/Overlay";
import { useToggle } from "../../common/hooks/useToggle";
import Account from "./Account";

type ProfileProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  filmsDirected: number;
  reviews: number;
};

const Profile: FC<ProfileProps> = (props) => {
  const [editing, { open, close }] = useToggle();
  return (
    <div className="w-full max-w-2xl max-h-80 bg-white flex flex-row items-start overflow-x-hidden rounded-lg p-8">
      <Account {...props} onEdit={open} />
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
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      TODO: Edit profile should be here
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      color={{
                        bg: "bg-blue-100",
                        text: "text-blue-900",
                        hover: "hover:bg-blue-200",
                        active: "active:bg-blue-200",
                        border: "focus-visible:ring-blue-500",
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
    </div>
  );
};

export default Profile;
