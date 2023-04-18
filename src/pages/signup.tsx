import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo, type FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../auth/useAuth";
import Button from "../common/components/Button";
import InputField from "../common/components/InputField";
import Overlay from "../common/components/Overlay";
import { useForm } from "../common/hooks/useForm";
import { useToggle } from "../common/hooks/useToggle";
import { sensiblespaces } from "../common/utils/refinements";

const RegisterUser = z.object({
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
    .max(64, "Must be at most 64 characters long"),
});

const SignupPage: FC = () => {
  const { isLoggedIn, updateUser } = useAuth();
  const [isSubmitting, { open, close }] = useToggle();
  const [{ values, errors: e, isValid }, updateForm] = useForm({
    schema: RegisterUser,
    initial: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Make sure that min length errors are shown after the user has submitted
  const errors = useMemo(() => {
    return {
      firstName: isSubmitting || values.firstName ? e.firstName : undefined,
      lastName: isSubmitting || values.lastName ? e.lastName : undefined,
      email: isSubmitting || values.email ? e.email : undefined,
      password: isSubmitting || values.password ? e.password : undefined,
    } satisfies typeof e;
  }, [isSubmitting, e, values]);

  // Make sure that if the user updates the form, the submission is cancelled
  const update = useCallback<typeof updateForm>(
    (arg) => {
      close();
      updateForm(arg);
    },
    [updateForm, close]
  );

  // Make sure that it validates on mount
  useEffect(() => {
    update((prev) => prev);
  }, [update]);

  if (isLoggedIn && !isSubmitting) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col overflow-x-hidden items-center gap-4 justify-center pt-2 pb-20">
      <Transition appear show={isSubmitting && isValid} as={Fragment}>
        <Dialog as="div" className="fixed z-[100]" onClose={close}>
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
                    Add a profile profile
                  </Dialog.Title>
                  <div className="mt-4 flex flex-col w-full min-h-max">
                    <img
                      className="w-full aspect-square rounded-lg"
                      src="https://api.dicebear.com/6.x/shapes/svg?seed=Cookie"
                    />
                    <Button
                      className="w-full my-2"
                      color={{
                        bg: "bg-zinc-200",
                        text: "text-zinc-900",
                        hover: "hover:bg-zinc-300",
                        active: "active:bg-zinc-300",
                        border: "focus-visible:ring-zinc-800",
                      }}
                      onClick={() => {}}
                    >
                      Upload profile picture
                    </Button>

                    <div className="w-full text-center text-xs py-2 mt-1">
                      <Link
                        className="text-zinc-500 hover:underline active:underline decoration-zinc-500"
                        to="/profile"
                      >
                        Skip this step
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition
        as="div"
        className="flex-1 w-full min-h-full h-max flex justify-center items-center"
        key="login-page"
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        <div
          className="w-[90%] max-w-md overflow-hidden
            flex flex-col items-start p-6 gap-2"
        >
          <div className="w-full flex flex-col justify-center items-center mb-2">
            <h2 className="font-bold text-3xl">Create Your</h2>
            <h2 className="font-bold text-3xl">OMDb account</h2>
          </div>

          <InputField
            label="First name"
            placeholder="Enter your first name"
            value={values.firstName}
            error={errors.firstName}
            onChange={(firstName) => update((prev) => ({ ...prev, firstName }))}
          />
          <InputField
            label="Last name"
            placeholder="Enter your last name"
            value={values.lastName}
            error={errors.lastName}
            onChange={(lastName) => update((prev) => ({ ...prev, lastName }))}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            error={errors.email}
            onChange={(email) => update((prev) => ({ ...prev, email }))}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={(password) => update((prev) => ({ ...prev, password }))}
          />
          <Button
            className="w-full"
            color={{
              bg: "bg-zinc-200",
              text: "text-zinc-900",
              hover: "hover:bg-zinc-300",
              active: "active:bg-zinc-300",
              border: "focus-visible:ring-zinc-800",
            }}
            onClick={() => {
              open();
              if (isValid) {
                updateUser({
                  id: "1",
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                });
              }
            }}
          >
            Continue with email
          </Button>

          <div className="w-full text-center text-xs py-2 text-zinc-800">
            Already have an account?{" "}
            <Link
              className="text-zinc-500 hover:underline active:underline decoration-zinc-500"
              to="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SignupPage;
