import { entries } from "@d-exclaimation/common";
import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, type FC } from "react";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { z } from "zod";
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
import { useForm } from "../../common/hooks/useForm";
import { maybeInt } from "../../common/utils/coerce";
import { ageRatings } from "../../common/utils/constants";
import EditImage from "../profile/EditImage";

const CreateFilm = z.object({
  title: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(64, "Must be at most 64 characters long"),
  description: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(256, "Must be at most 256 characters long"),
  releaseDate: z
    .date()
    .refine((date) => date > new Date(), "Must be in the future")
    .optional(),
  genreId: z.number().int(),
  runtime: z
    .number()
    .int()
    .min(1, "Must be at least 1 minute long")
    .max(300, "Must be at most 300 minutes long")
    .nullable()
    .optional(),
  ageRating: z
    .enum(["G", "PG", "M", "R13", "R16", "R18", "TBC"])
    .default("TBC"),
});

type CreateFilmDialogProps = {
  creating: boolean;
  onClose: () => void;
};

const CreateFilmDialog: FC<CreateFilmDialogProps> = ({ creating, onClose }) => {
  const genres = useGenres();
  const [preview, setPreview] = useState("https://avatar.vercel.sh/cookie");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [{ values, errors, isValid }, update] = useForm({
    schema: CreateFilm,
    initial: {
      title: "",
      description: "",
      genreId: 1,
      ageRating: "TBC",
    },
  });
  const { mutate } = useSWRConfig();
  const { trigger } = useMutation(["films"], createFilm, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          mutate(included("films"));
          update(() => ({
            title: "",
            description: "",
            genreId: 1,
            ageRating: "TBC",
          }));
          onClose();
        },
        BadTitle: () => {
          setTitleError("Film with that title already exists");
        },
        "*": (err) => {
          console.log(err);
        },
      });
    },
  });

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
                className="w-full max-w-md z-40 transform rounded-2xl bg-white 
                p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create film
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="w-36 md:w-44 h-20 md:h-24 object-cover rounded-lg"
                      src={preview}
                      fallback="Cookie"
                      alt="avatar"
                    />
                    <EditImage
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
                        setPreview(URL.createObjectURL(file));
                        setFile(file);
                      }}
                      onRemove={() => {
                        setPreview("https://avatar.vercel.sh/cookie");
                        setFile(null);
                      }}
                    />
                  </div>

                  <div className="flex relative flex-col items-start justify-center w-full mt-4 gap-1">
                    <InputField
                      label="Title"
                      error={
                        values.title ? titleError ?? errors.title : undefined
                      }
                      value={values.title}
                      placeholder="Provide a title"
                      onChange={(title) =>
                        update((prev) => ({ ...prev, title }))
                      }
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
                        file: file ?? undefined,
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

export default CreateFilmDialog;
