import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { deleteFilm } from "../../api/film";
import { included } from "../../api/keys";
import Button from "../../common/components/Button";
import Overlay from "../../common/components/Overlay";
import { useNotifcation } from "../../common/context/notification/useNotification";

type DeleteFilmDialogProps = {
  id: number;
  title: string;
  deleting: boolean;
  onClose: () => void;
};

const DeleteFilmDialog: FC<DeleteFilmDialogProps> = ({
  id,
  deleting,
  title,
  onClose,
}) => {
  const { notify } = useNotifcation();
  const { mutate } = useSWRConfig();
  const nav = useNavigate();
  const { trigger } = useMutation(
    [...deleteFilm.keys, `${id}`],
    deleteFilm.fn,
    {
      onSuccess(data) {
        match(data, {
          Ok: () => {
            mutate(included("films"));
            notify({
              kind: "warning",
              title: "Film deleted",
            });
            nav("/gallery");
            onClose();
          },
          "*": () => {},
        });
      },
    }
  );

  return (
    <Transition appear show={deleting} as={Fragment}>
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
                p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 max-w-full truncate text-gray-900"
                >
                  Delete {title}
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max text-sm transition-all">
                  Are you sure you want to delete {title}?
                </div>

                <div className="mt-4 flex justify-between z-60">
                  <Button
                    type="button"
                    color={{
                      bg: "bg-zinc-100",
                      text: "text-zinc-900",
                      hover: "hover:bg-zinc-200",
                      active: "active:bg-zinc-200",
                      border: "focus-visible:ring-zinc-500",
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    color={{
                      bg: "bg-red-100",
                      text: "text-red-900",
                      hover: "hover:bg-red-200",
                      active: "active:bg-red-200",
                      border: "focus-visible:ring-red-500",
                    }}
                    onClick={() => {
                      trigger(id);
                    }}
                  >
                    Delete
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

export default DeleteFilmDialog;
