import { match } from "@d-exclaimation/common/lib/union";
import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { Link, Navigate } from "react-router-dom";
import useMutation from "swr/mutation";
import { register, setAvatar } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import InputField from "../../common/components/InputField";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useNotifcation } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { useToggle } from "../../common/hooks/useToggle";
import { RegisterUser } from "../../types/user";
import AvatarDialog from "./AvatarDialog";

const SignupPage: FC = () => {
  const [serverError, setServerError] = useState<string>();
  const { isLoggedIn, invalidate, isAuthenticating } = useAuth();
  const { notify } = useNotifcation();
  const [isSubmitting, { open, close }] = useToggle();
  const [showPassword, { toggle }] = useToggle();
  const { trigger, isMutating } = useMutation(register.keys, register.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          invalidate();
          notify({
            kind: "success",
            title: "Successfully signed up",
          });
        },
        BadEmail: () => {
          close();
          setServerError("Email is already in use");
        },
        "*": (e) => {
          close();
          notify({
            kind: "error",
            title: "Unexcepted error occured",
          });
          console.log(e);
        },
      });
    },
  });
  const { trigger: uploadAvatar } = useMutation(setAvatar.keys, setAvatar.fn, {
    onSuccess: () => {
      invalidate();
      notify({
        kind: "info",
        title: "Profile picture updated",
      });
      close();
    },
  });

  const [{ values, errors: e, isValid, isInitial }, updateForm] = useForm({
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

  const submit = useCallback(async () => {
    if (!isValid || isInitial) return;
    open();
    trigger({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  }, [open, isValid, trigger, values]);

  // Make sure that it validates on mount
  useEffect(() => {
    update((prev) => prev);
  }, [update]);

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (isLoggedIn && !isSubmitting) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col overflow-x-hidden items-center gap-4 justify-center pt-2 pb-20">
      <AvatarDialog
        show={isSubmitting && !isMutating && isValid}
        onClose={close}
        onSubmit={uploadAvatar}
      />
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
        <form
          className="w-full max-w-md overflow-hidden flex flex-col items-start p-6 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
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
            error={serverError ?? errors.email}
            onChange={(email) => {
              setServerError(undefined);
              update((prev) => ({ ...prev, email }));
            }}
          />
          <InputField
            label="Password"
            type={showPassword && !isSubmitting ? "text" : "password"}
            placeholder="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={(password) => update((prev) => ({ ...prev, password }))}
          >
            <button
              className="absolute right-1 bottom-2 text-sm px-2 py-1 
             bg-zinc-200 rounded z-10 active:bg-zinc-300 hover:bg-zinc-300
              disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={toggle}
              disabled={isSubmitting}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </InputField>
          <Button
            className="w-full hover:text-zinc-900 active:text-zinc-900 ring-1 ring-zinc-900"
            color={{
              bg: "bg-zinc-900",
              text: "text-zinc-50",
              hover: "hover:bg-zinc-50",
              active: "active:bg-zinc-50",
              border: "focus-visible:ring-zinc-500",
            }}
            onClick={submit}
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
        </form>
      </Transition>
    </div>
  );
};

export default SignupPage;
