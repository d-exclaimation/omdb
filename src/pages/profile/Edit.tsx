import { match } from "@d-exclaimation/common/union";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState, type FC } from "react";
import useMutation from "swr/mutation";
import { z } from "zod";
import { api } from "../../api/url";
import { edit } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import InputField from "../../common/components/InputField";
import Overlay from "../../common/components/Overlay";
import { useForm } from "../../common/hooks/useForm";
import { sensiblespaces } from "../../common/utils/refinements";
import EditImage from "./EditImage";

type EditUser = z.infer<typeof EditUser>;
const EditUser = z
  .object({
    firstName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long")
      .refine(
        sensiblespaces,
        "Must contain leading, trailing or consecutive spaces"
      ),
    lastName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long")
      .refine(
        sensiblespaces,
        "Must contain leading, trailing or consecutive spaces"
      ),
    email: z
      .string()
      .email("Must include an @ symbol and a top level domain")
      .min(1, "Must be at least 1 character long")
      .max(256, "Must be at most 256 characters long"),
    password: z
      .string()
      .min(6, "Must be at least 6 characters long")
      .max(64, "Must be at most 64 characters long")
      .optional(),
    currentPassword: z
      .string()
      .min(6, "Must be at least 6 characters long")
      .max(64, "Must be at most 64 characters long")
      .optional(),
  })
  .refine(
    ({ password, currentPassword }) =>
      password !== undefined ? currentPassword !== undefined : true,
    {
      message: "Current password is required to change password",
      path: ["currentPassword"],
    }
  )
  .refine(
    ({ password, currentPassword }) =>
      password && currentPassword ? password !== currentPassword : true,
    {
      message: "New password is identical to current",
      path: ["password"],
    }
  );

type EditProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  editing: boolean;
  close: () => void;
};

const Edit: FC<EditProps> = ({ editing, close, ...user }) => {
  const { invalidate } = useAuth();
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
  const { trigger } = useMutation(edit.keys, edit.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          close();
          invalidate();
        },
        Fordidden: () => {
          setEmailError("Email already in use");
        },
        Unauthorized: () => {
          setPasswordError("Incorrect password");
        },
        "*": (e) => {
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
    if (!isValid) {
      return;
    }
    trigger({ ...values, file: file });
  }, [values, isValid, trigger, file]);

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
                className="w-full max-w-md z-40 transform overflow-hidden rounded-2xl bg-white 
                p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit profile
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max transition-all">
                  <div className="flex w-full items-end justify-start">
                    <Img
                      className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-full"
                      src={preview}
                      fallback="Cookie"
                      alt="avatar"
                    />
                    <EditImage
                      className="-translate-x-10 "
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
                            className="mt-1 flex w-full justify-between rounded-lg bg-zinc-100 
                            px-4 py-2 text-left text-sm font-medium text-zinc-900 
                           hover:bg-zinc-200 focus:outline-none focus-visible:ring 
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
                    onClick={onSubmit}
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

export default Edit;
