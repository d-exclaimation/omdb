import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { api } from "../../api/url";
import Img from "../../common/components/Image";
import Overlay from "../../common/components/Overlay";
import { useCacheControl } from "../../common/context/cache/useCacheControl";

type FilmPosterDialogProps = {
  filmId: number;
  fallback: string;
  previewing: boolean;
  onClose: () => void;
};

const FilmPosterDialog: FC<FilmPosterDialogProps> = ({
  filmId,
  onClose,
  previewing,
  fallback,
}) => {
  const { film: stamp } = useCacheControl();
  return (
    <Transition appear show={previewing} as={Fragment}>
      <Dialog as="div" className="fixed z-40" onClose={onClose}>
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
              <Dialog.Panel
                className="w-full max-w-md z-40 transform rounded-md bg-white 
                p-2 text-left align-middle shadow-xl transition-all"
              >
                <Img
                  className="aspect-square w-full object-cover rounded-md"
                  src={`${api}/films/${filmId}/image?${stamp}`}
                  fallback={fallback}
                  alt="avatar"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilmPosterDialog;
