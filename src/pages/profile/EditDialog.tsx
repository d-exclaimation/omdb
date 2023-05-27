import { match } from "@d-exclaimation/common/union";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState, type FC } from "react";
import useMutation from "swr/mutation";
import { api } from "../../api/url";
import { edit } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import InputField from "../../common/components/InputField";
import Overlay from "../../common/components/Overlay";
import { useNotification } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { EditUser } from "../../types/user";
import EditImage from "./EditImage";
type EditDialogProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  editing: boolean;
  close: () => void;
};

const EditDialog: FC<EditDialogProps> = ({ editing, close, ...user }) => {
  const { invalidate } = useAuth();
  const { notify } = useNotification();
  const [preview, setPreview] = useState(`${api}/users/${user.id}/image`);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [file, setFile] = useState<File | undefined | null>(undefined);
  const [{ values, errors, isValid }, update] = useForm({
    schema: EditUser,
    initial: {
      ...user,
    },
  });
  const { trigger, isMutating } = useMutation(edit.keys, edit.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          close();
          invalidate();
          notify({
            kind: "success",
            title: "Profile updated",
          });
        },
        Fordidden: () => {
          setEmailError("Email already in use");
        },
        Unauthorized: () => {
          setPasswordError("Incorrect password");
        },
        "*": (e) => {
          notify({
            kind: "error",
            title: "Unknown error occurred",
          });
          console.log(e);
          setEmailError("An unknown error occurred");
        },
      });
    },
  });

  const onClose = useCallback(() => {
    update((_) => user);
    close();
  }, [update, close, user]);

  const onSubmit = useCallback(() => {
    if (!isValid || isMutating) {
      return;
    }
    trigger({ ...values, file });
  }, [values, isValid, trigger, isMutating, file]);

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
                className="w-full max-w-md z-40 transform overflow-hidden rounded-md bg-white 
                p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Edit profile
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-full"
                      src={preview}
                      fallback={`${user.firstName}${user.lastName}`}
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
                        setPreview(`https://avatar.vercel.sh/${user.email}`);
                        setFile(null);
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center w-full mt-4 gap-1">
                    <InputField
                      label="First name"
                      error={errors.firstName}
                      value={values.firstName}
                      placeholder="Provide a first name"
                      onChange={(firstName) =>
                        update((prev) => ({ ...prev, firstName }))
                      }
                    />
                    <InputField
                      label="Last name"
                      error={errors.lastName}
                      value={values.lastName}
                      placeholder="Provide a last name"
                      onChange={(lastName) =>
                        update((prev) => ({ ...prev, lastName }))
                      }
                    />
                    <InputField
                      label="Email"
                      value={values.email}
                      error={emailError ?? errors.email}
                      placeholder="Provide an email"
                      onChange={(email) => {
                        setEmailError(undefined);
                        update((prev) => ({ ...prev, email }));
                      }}
                    />

                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className="mt-1 flex w-full justify-between rounded-md bg-zinc-100 dark:bg-zinc-900
                            px-4 py-2 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100
                           hover:bg-zinc-200 focus:outline-none focus-visible:ring dark:hover:bg-zinc-800
                           focus-visible:ring-zinc-500 focus-visible:ring-opacity-75"
                          >
                            {open ? "Hide" : "Update password"}
                          </Disclosure.Button>
                          <Transition
                            show={open}
                            className="w-full overflow-hidden"
                            enter="transition-all ease-out duration-300"
                            enterFrom="opacity-0 h-0"
                            enterTo="opacity-100 h-[9.75rem]"
                            leave="transition-all ease-out duration-300"
                            leaveFrom="opacity-100 h-[9.75rem]"
                            leaveTo="opacity-0 h-0"
                            afterLeave={() => {
                              setPasswordError(undefined);
                              update((prev) => ({
                                ...prev,
                                password: undefined,
                                currentPassword: undefined,
                              }));
                            }}
                          >
                            <Disclosure.Panel className="w-full flex flex-col gap-1">
                              <InputField
                                type="password"
                                label="Password"
                                value={values.password ?? ""}
                                error={errors.password}
                                placeholder="New password"
                                onChange={(password) =>
                                  update((prev) => ({
                                    ...prev,
                                    password: password || undefined,
                                  }))
                                }
                              />
                              <InputField
                                label="Current password"
                                type="password"
                                error={passwordError ?? errors.currentPassword}
                                value={values.currentPassword ?? ""}
                                placeholder="Provide your old passwword"
                                onChange={(currentPassword) => {
                                  setPasswordError(undefined);
                                  update((prev) => ({
                                    ...prev,
                                    currentPassword:
                                      currentPassword || undefined,
                                  }));
                                }}
                              />
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>

                <div className="mt-4 flex justify-between z-60">
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
                    onClick={onClose}
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
                    {isMutating ? "..." : "Save"}
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

export default EditDialog;
