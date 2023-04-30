import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, type FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/components/Button";
import Overlay from "../../common/components/Overlay";

type AvatarDialogProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
};

const AvatarDialog: FC<AvatarDialogProps> = ({ show, onClose, onSubmit }) => {
  const [avatar, setAvatar] = useState<{ src: string; file: File }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed z-[100]" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a profile profile
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max">
                  <div className="flex items-center justify-center w-full">
                    <img
                      className="w-72 md:w-96 aspect-square object-cover rounded-lg hover:opacity-80 cursor-pointer active:opacity-80"
                      src={avatar?.src ?? "https://avatar.vercel.sh/cookie"}
                      onError={(e) => {
                        e.currentTarget.src = "https://avatar.vercel.sh/cookie";
                      }}
                    />
                    <div
                      className="absolute flex items-center justify-center max-w-full w-72 md:w-96 aspect-square
                      rounded-lg bg-black/25 hover:bg-black/40 cursor-pointer active:bg-black/40"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        className="w-24 h-24 md:w-28 md:h-28 hover:brightness-110 active:brightness-110"
                        src="/icons/camera-selected.svg"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (!e.target.files) {
                        return;
                      }
                      const file = e.target.files[0];
                      setAvatar({
                        src: URL.createObjectURL(file),
                        file,
                      });
                    }}
                  />
                  <Button
                    className="w-full my-2"
                    color={{
                      bg: "bg-zinc-200",
                      text: "text-zinc-900",
                      hover: "hover:bg-zinc-300",
                      active: "active:bg-zinc-300",
                      border: "focus-visible:ring-zinc-800",
                    }}
                    onClick={() => {
                      if (!avatar) {
                        return;
                      }
                      onSubmit(avatar.file);
                    }}
                    disabled={!avatar}
                  >
                    Upload profile picture
                  </Button>

                  <div className="w-full text-center text-xs py-2 mt-1">
                    <Link
                      className="text-zinc-500 hover:underline active:underline decoration-zinc-500"
                      to="/profile"
                    >
                      Skip this step
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvatarDialog;
