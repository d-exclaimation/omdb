import { entries } from "@d-exclaimation/common";
import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState, type FC } from "react";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { review } from "../../api/film";
import { included } from "../../api/keys";
import { api } from "../../api/url";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import ListSelect from "../../common/components/ListSelect";
import Overlay from "../../common/components/Overlay";
import Textarea from "../../common/components/Textarea";
import { useNotification } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { int } from "../../common/utils/coerce";
import { ratings } from "../../common/utils/constants";
import { tw } from "../../common/utils/tailwind";
import { ReviewFilm } from "../../types/film";

type ReviewFilmProps = {
  filmId: number;
  title: string;
  reviewing: boolean;
  onClose: () => void;
};

const ReviewFilmDialog: FC<ReviewFilmProps> = ({
  filmId,
  onClose,
  title,
  reviewing,
}) => {
  const [serverError, setServerError] = useState<string>();
  const { notify } = useNotification();
  const [{ values, errors, isValid }, update] = useForm({
    schema: ReviewFilm,
    initial: {
      rating: 5,
    },
  });

  const close = useCallback(() => {
    setServerError(undefined);
    update(() => ({
      rating: 5,
    }));
    onClose();
  }, [onClose, update, setServerError]);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useMutation(
    [...review.keys, `${filmId}`],
    review.fn,
    {
      onSuccess: (res) => {
        match(res, {
          Ok: () => {
            close();
            mutate(included("films"));
            notify({
              kind: "success",
              title: "Film reviewed",
            });
          },
          SelfReview: () => {
            setServerError("Cannot rate a reviewed film or unreleased one");
          },
          "*": (e) => {
            console.log("Error", e);
            notify({
              kind: "error",
              title: "Unexpected error occurred",
            });
          },
        });
      },
    }
  );

  const submit = useCallback(() => {
    if (!isValid || isMutating) return;
    setServerError(undefined);
    trigger({
      ...values,
      filmId,
    });
  }, [isValid, isMutating, trigger, values, filmId, setServerError]);

  return (
    <Transition appear show={reviewing} as={Fragment}>
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
                as="form"
                className={tw(`z-40 w-full max-w-md transform rounded-md bg-white 
                p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900`)}
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <Dialog.Title
                  as="h3"
                  className="max-w-full truncate text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Review for {title}
                </Dialog.Title>
                <div className="mt-4 flex min-h-max w-full flex-col transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="h-32 w-full rounded-lg object-cover md:h-40"
                      src={`${api}/films/${filmId}/image`}
                      fallback={title}
                      alt="avatar"
                    />
                  </div>

                  <div className="relative mt-4 flex w-full flex-col items-start justify-center gap-1">
                    <ListSelect
                      label="Rating"
                      error={serverError ?? errors.rating}
                      options={entries(ratings).map(([value, name]) => ({
                        value: int.parse(value),
                        name: `${name} (${value})`,
                      }))}
                      selected={{
                        value: values.rating,
                        name: `${
                          ratings[values.rating as keyof typeof ratings]
                        } (${values.rating})`,
                      }}
                      setSelected={({ value: rating }) => {
                        update((prev) => ({
                          ...prev,
                          rating,
                        }));
                      }}
                    />
                    <Textarea
                      label="Review note"
                      error={values.review ? errors.review : undefined}
                      value={values.review ?? ""}
                      placeholder="Provide a description"
                      onChange={(review) =>
                        update((prev) => ({ ...prev, review }))
                      }
                    />
                  </div>
                </div>

                <div className="z-60 mt-4 flex justify-between">
                  <Button
                    type="button"
                    className="dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-700"
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
                    className="dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700 dark:active:bg-indigo-700"
                    color={{
                      bg: "bg-sky-100",
                      text: "text-sky-900",
                      hover: "hover:bg-sky-200",
                      active: "active:bg-sky-200",
                      border: "focus-visible:ring-sky-500",
                    }}
                    disabled={!isValid || isMutating}
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

export default ReviewFilmDialog;
