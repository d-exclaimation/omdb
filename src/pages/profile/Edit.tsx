import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, type FC } from "react";
import { z } from "zod";
import Button from "../../common/components/Button";
import InputField from "../../common/components/InputField";
import Overlay from "../../common/components/Overlay";
import { useForm } from "../../common/hooks/useForm";
import EditImage from "./EditImage";

type EditUser = z.infer<typeof EditUser>;
const EditUser = z
  .object({
    firstName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long"),
    lastName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long"),
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
  );

type EditProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  editing: boolean;
  close: () => void;
  submit: (values: EditUser) => void;
};

const Edit: FC<EditProps> = ({ editing, close, submit, ...user }) => {
  const [{ values, errors, isValid }, update] = useForm({
    schema: EditUser,
    initial: {
      ...user,
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
    submit(values);
  }, [values, submit, isValid]);

  return (
    <Transition appear show={editing} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit profile
                </Dialog.Title>
                <div className="mt-4 flex flex-col w-full min-h-max">
                  <div className="flex w-full items-end justify-start">
                    <img
                      className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-full"
                      src="https://api.dicebear.com/6.x/shapes/svg?seed=Cookie"
                      alt="avatar"
                    />
                    <EditImage onUpload={console.log} onRemove={console.log} />
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
                      error={errors.email}
                      placeholder="Provide an email"
                      onChange={(email) =>
                        update((prev) => ({ ...prev, email }))
                      }
                    />
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
                      error={errors.currentPassword}
                      value={values.currentPassword ?? ""}
                      placeholder="Provide your old passwword"
                      onChange={(currentPassword) =>
                        update((prev) => ({
                          ...prev,
                          currentPassword: currentPassword || undefined,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
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
