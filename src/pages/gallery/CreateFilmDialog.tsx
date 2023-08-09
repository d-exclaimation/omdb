import { entries } from "@d-exclaimation/common";
import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState, type FC } from "react";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { createFilm } from "../../api/film";
import { included } from "../../api/keys";
import Button from "../../common/components/Button";
import DateInputField from "../../common/components/DateInputField";
import Img from "../../common/components/Image";
import InputField from "../../common/components/InputField";
import ListSelect from "../../common/components/ListSelect";
import Overlay from "../../common/components/Overlay";
import Textarea from "../../common/components/Textarea";
import { useGenres } from "../../common/context/genre/useGenres";
import { useNotification } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { maybeInt } from "../../common/utils/coerce";
import { ageRatings } from "../../common/utils/constants";
import { tw } from "../../common/utils/tailwind";
import { CreateFilm } from "../../types/film";
import EditFilmImage from "../film/EditFilmImage";

type CreateFilmDialogProps = {
  creating: boolean;
  onClose: () => void;
};

const CreateFilmDialog: FC<CreateFilmDialogProps> = ({ creating, onClose }) => {
  const genres = useGenres();
  const [preview, setPreview] = useState("https://avatar.vercel.sh/cookie");
  const { notify } = useNotification();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [{ values, errors, isValid, isInitial }, update] = useForm({
    schema: CreateFilm,
    initial: {
      title: "",
      description: "",
      genreId: 1,
      ageRating: "TBC",
    },
  });

  const close = useCallback(() => {
    onClose();
    setTitleError(null);
    setFile(null);
    setPreview("https://avatar.vercel.sh/cookie");
    update(() => ({
      title: "",
      description: "",
      genreId: 1,
      ageRating: "TBC",
    }));
  }, [onClose, update, setFile, setTitleError, setPreview]);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useMutation(createFilm.keys, createFilm.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          onClose();
          mutate(included("films"));
          close();
          notify({
            kind: "success",
            title: "Film created",
          });
        },
        BadTitle: () => {
          setTitleError("Film with that title already exists");
        },
        "*": (err) => {
          console.log(err);
          notify({
            kind: "error",
            title: "Unexpected error occured",
          });
        },
      });
    },
  });

  const submit = useCallback(() => {
    notify({
      kind: "error",
      title: "OMDb currently is on preview readonly mode",
    });
    // if (!isValid || isInitial || isMutating) {
    //   return;
    // }
    // if (!file) {
    //   setTitleError("Image not provided");
    //   return;
    // }
    // trigger({ ...values, file });
  }, [trigger, values, file, isValid, isInitial, setTitleError]);

  // Make sure that it validates on mount
  useEffect(() => {
    update((prev) => prev);
  }, [update]);

  return (
    <Transition appear show={creating} as={Fragment}>
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
                className={tw(`z-40 w-full max-w-md transform overflow-hidden rounded-md bg-white 
                p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900`)}
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Create film
                </Dialog.Title>
                <div className="mt-4 flex min-h-max w-full flex-col transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="h-20 w-20 rounded-lg object-cover md:h-24 md:w-24"
                      src={preview}
                      fallback={values.title}
                      alt="avatar"
                    />
                    <EditFilmImage
                      className="-translate-x-10"
                      onUpload={(file) => {
                        const allowedTypes = [
                          "image/png",
                          "image/jpeg",
                          "image/gif",
                        ];
                        if (!allowedTypes.includes(file.type)) {
                          return;
                        }
                        setTitleError((prev) =>
                          prev?.includes("Image") ? prev : null
                        );
                        setPreview(URL.createObjectURL(file));
                        setFile(file);
                      }}
                    />
                  </div>

                  <div className="relative mt-4 flex w-full flex-col items-start justify-center gap-1">
                    <InputField
                      label="Title"
                      error={
                        values.title ? titleError ?? errors.title : undefined
                      }
                      value={values.title}
                      placeholder="Provide a title"
                      onChange={(title) => {
                        setTitleError(null);
                        update((prev) => ({ ...prev, title }));
                      }}
                    />
                    <Textarea
                      label="Description"
                      error={
                        values.description ? errors.description : undefined
                      }
                      value={values.description}
                      placeholder="Provide a description"
                      onChange={(description) =>
                        update((prev) => ({ ...prev, description }))
                      }
                    />
                    <DateInputField
                      label="Release date"
                      error={errors.releaseDate}
                      onChange={(releaseDate) =>
                        update((prev) => ({ ...prev, releaseDate }))
                      }
                    />

                    <ListSelect
                      label="Genre"
                      error={errors.genreId}
                      options={genres.values.map((genre) => ({
                        value: genre.genreId,
                        name: genre.name,
                      }))}
                      selected={{
                        value: values.genreId,
                        name: genres.get(values.genreId)?.name ?? "",
                      }}
                      setSelected={({ value: genreId }) =>
                        update((prev) => ({
                          ...prev,
                          genreId,
                        }))
                      }
                    />

                    <ListSelect
                      label="Age rating"
                      error={errors.ageRating}
                      options={entries(ageRatings).map(([value, name]) => ({
                        value,
                        name,
                      }))}
                      selected={{
                        value: values.ageRating,
                        name: ageRatings[values.ageRating],
                      }}
                      setSelected={({ value: ageRating }) =>
                        update((prev) => ({
                          ...prev,
                          ageRating: ageRating,
                        }))
                      }
                    />

                    <InputField
                      label="Runtime (minutes)"
                      inputMode="numeric"
                      error={errors.runtime}
                      value={values.runtime?.toString() ?? ""}
                      placeholder="Optionally provide runtime"
                      onChange={(maybeRuntime) =>
                        update((prev) => ({
                          ...prev,
                          runtime: maybeRuntime
                            ? maybeInt.parse(maybeRuntime)
                            : null,
                        }))
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
                    {isMutating ? "..." : "Create"}
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

export default CreateFilmDialog;
