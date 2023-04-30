import { entries } from "@d-exclaimation/common";
import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, type FC } from "react";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { isValid, z } from "zod";
import { review } from "../../api/film";
import { included } from "../../api/keys";
import { api } from "../../api/url";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import ListSelect from "../../common/components/ListSelect";
import Overlay from "../../common/components/Overlay";
import Textarea from "../../common/components/Textarea";
import { useForm } from "../../common/hooks/useForm";
import { int } from "../../common/utils/coerce";
import { ratings } from "../../common/utils/constants";

const ReviewFilm = z.object({
  review: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(512, "Must be at most 512 characters long")
    .optional(),
  rating: z
    .number()
    .int()
    .min(1, "Must be at least 1")
    .max(10, "Must be at most 5"),
});

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
  const [{ values, errors }, update] = useForm({
    schema: ReviewFilm,
    initial: {
      rating: 5,
    },
  });

  const { mutate } = useSWRConfig();
  const { trigger } = useMutation([...review.keys, `${filmId}`], review.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          onClose();
          mutate(included("films"));
          update(() => ({ rating: 5 }));
          setServerError(undefined);
        },
        SelfReview: () => {
          setServerError("Cannot rate a reviewed film or unreleased one");
        },
        "*": (e) => {
          console.log("Error", e);
        },
      });
    },
  });

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
                className="w-full max-w-md z-40 transform rounded-lg bg-white 
                p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 max-w-full truncate text-gray-900"
                >
                  Review for {title}
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                      src={`${api}/films/${filmId}/image`}
                      fallback="Cookie"
                      alt="avatar"
                    />
                  </div>

                  <div className="flex relative flex-col items-start justify-center w-full mt-4 gap-1">
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

                <div className="mt-4 flex justify-between z-60">
                  <Button
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
                      bg: "bg-sky-100",
                      text: "text-sky-900",
                      hover: "hover:bg-sky-200",
                      active: "active:bg-sky-200",
                      border: "focus-visible:ring-sky-500",
                    }}
                    onClick={() => {
                      trigger({
                        ...values,
                        filmId,
                      });
                    }}
                    disabled={!isValid}
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
