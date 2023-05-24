import { entries } from "@d-exclaimation/common";
import { match } from "@d-exclaimation/common/union";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState, type FC } from "react";
import { useSWRConfig } from "swr";
import useMutation from "swr/mutation";
import { editFilm } from "../../api/film";
import { included } from "../../api/keys";
import { api } from "../../api/url";
import Button from "../../common/components/Button";
import DateInputField from "../../common/components/DateInputField";
import Img from "../../common/components/Image";
import InputField from "../../common/components/InputField";
import ListSelect from "../../common/components/ListSelect";
import Overlay from "../../common/components/Overlay";
import Textarea from "../../common/components/Textarea";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useGenres } from "../../common/context/genre/useGenres";
import { useNotification } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { maybeInt } from "../../common/utils/coerce";
import { ageRatings } from "../../common/utils/constants";
import { EditFilm } from "../../types/film";
import EditFilmImage from "./EditFilmImage";
type FilmEditProps = {
  film: EditFilm & {
    filmId: number;
  };
  editing: boolean;
  onClose: () => void;
};

const FilmEdit: FC<FilmEditProps> = ({
  film: { filmId, ...initial },
  editing,
  onClose,
}) => {
  const genres = useGenres();
  const { invalidate } = useCacheControl();
  const { notify } = useNotification();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [preview, setPreview] = useState(`${api}/films/${filmId}/image`);
  const [file, setFile] = useState<File | null>(null);
  const [{ values, errors, isValid }, update] = useForm({
    schema: EditFilm,
    initial: {
      ...initial,
      releaseDate: undefined,
    },
  });

  const close = useCallback(() => {
    setTitleError(null);
    update(() => ({
      ...initial,
      releaseDate: undefined,
    }));
    onClose();
  }, [onClose, update, initial, setTitleError]);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useMutation(
    [...editFilm.keys, `${filmId}`],
    editFilm.fn,
    {
      onSuccess: (res) => {
        match(res, {
          Ok: () => {
            mutate(included("films"));
            invalidate("film");
            notify({
              kind: "success",
              title: "Film updated",
            });
            close();
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
    }
  );

  const submit = useCallback(() => {
    if (!isValid || isMutating) return;
    trigger({
      filmId,
      file: file ?? undefined,
      ...values,
    });
  }, [isValid, isMutating, values, filmId, trigger, file]);

  return (
    <Transition appear show={editing} as={Fragment}>
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
                className="w-full max-w-md z-40 transform rounded-md bg-white 
                p-6 text-left align-middle shadow-xl transition-all"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 max-w-full truncate text-gray-900"
                >
                  Edit {values.title}
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-lg"
                      src={preview}
                      fallback={values.title}
                      alt="avatar"
                    />
                    <EditFilmImage
                      className="-translate-x-10"
                      label="Edit"
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
                      initialValue={initial.releaseDate}
                      error={errors.releaseDate}
                      onChange={(releaseDate) =>
                        update((prev) => ({ ...prev, releaseDate }))
                      }
                      disabled={
                        initial.releaseDate && initial.releaseDate < new Date()
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

export default FilmEdit;
