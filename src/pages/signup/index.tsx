import { match } from "@d-exclaimation/common/lib/union";
import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useMutation from "swr/mutation";
import { register } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import InputField from "../../common/components/InputField";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useNotification } from "../../common/context/notification/useNotification";
import { useForm } from "../../common/hooks/useForm";
import { useSearchParam } from "../../common/hooks/useSearchParam";
import { useToggle } from "../../common/hooks/useToggle";
import { tw } from "../../common/utils/tailwind";
import { RegisterUser } from "../../types/user";
import AddImage from "./AddImage";

const SignupPage: FC = () => {
  const [serverError, setServerError] = useState<string>();
  const { isLoggedIn, invalidate, isAuthenticating } = useAuth();
  const redirect = useSearchParam("redirect");
  const nav = useNavigate();
  const { notify } = useNotification();
  const [showPassword, { toggle }] = useToggle();
  const [preview, setPreview] = useState<string>(
    "https://avatar.vercel.sh/cookie"
  );
  const [file, setFile] = useState<File | undefined>();
  const [{ values, errors: e, isValid, isInitial }, update] = useForm({
    schema: RegisterUser,
    initial: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { trigger, isMutating } = useMutation(register.keys, register.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          invalidate();
          notify({
            kind: "success",
            title: "Successfully signed up",
          });
          nav(redirect ?? "/profile");
        },
        BadEmail: () => {
          setServerError("Email is already in use");
        },
        "*": (e) => {
          notify({
            kind: "error",
            title: "Unexcepted error occured",
          });
          console.log(e);
        },
      });
    },
  });

  // Make sure that min length errors are shown after the user has submitted
  const errors = useMemo(() => {
    return {
      firstName: values.firstName ? e.firstName : undefined,
      lastName: values.lastName ? e.lastName : undefined,
      email: values.email ? e.email : undefined,
      password: values.password ? e.password : undefined,
    } satisfies typeof e;
  }, [e, values]);

  const submit = useCallback(async () => {
    if (!isValid || isInitial || isMutating) return;
    trigger({ ...values, file });
  }, [isInitial, isValid, isMutating, trigger, values, file]);

  // Make sure that it validates on mount
  useEffect(() => {
    update((prev) => prev);
  }, [update]);

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div
      className={tw(`flex h-max min-h-screen w-full 
      max-w-3xl flex-col items-center justify-center 
      gap-4 overflow-x-hidden px-5 pb-20 pt-2`)}
    >
      <Transition
        as="div"
        className="flex h-max min-h-full w-full flex-1 items-center justify-center"
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
          className="flex w-full max-w-md flex-col items-start gap-2 overflow-hidden p-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="mb-2 flex w-full flex-col items-center justify-center">
            <h2 className="text-xl font-bold dark:text-white md:text-2xl">
              Create Your OMDb Account
            </h2>
          </div>

          <div className="mb-2 flex w-full flex-col items-center justify-center">
            <Img
              src={preview}
              alt="Avatar"
              className="h-20 w-20 rounded-full"
              fallback="cookie"
            />
            <AddImage
              className="absolute translate-y-8"
              onUpload={(file) => {
                const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
                if (!allowedTypes.includes(file.type)) {
                  return;
                }
                setPreview(URL.createObjectURL(file));
                setFile(file);
              }}
              onRemove={() => {
                setPreview("https://avatar.vercel.sh/cookie");
                setFile(undefined);
              }}
            />
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
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={(password) => update((prev) => ({ ...prev, password }))}
          >
            <button
              type="button"
              className={tw(`disabled:opacity-50dark:bg-zinc-800 absolute bottom-2
              right-1 z-10 rounded bg-zinc-200 px-2 py-1 text-sm
              hover:bg-zinc-300 active:bg-zinc-300 disabled:cursor-not-allowed 
              dark:text-white dark:hover:bg-zinc-700 dark:active:bg-zinc-700`)}
              onClick={toggle}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </InputField>
          <Button
            className={tw(`w-full ring-1 ring-zinc-900 hover:text-zinc-900 
            active:text-zinc-900 dark:bg-zinc-100 dark:text-zinc-950
            dark:ring-zinc-100 dark:hover:bg-zinc-950 dark:hover:text-zinc-100
            dark:focus-visible:ring-zinc-400 dark:active:bg-zinc-950 dark:active:text-zinc-100`)}
            color={{
              bg: "bg-zinc-900",
              text: "text-zinc-50",
              hover: "hover:bg-zinc-50",
              active: "active:bg-zinc-50",
              border: "focus-visible:ring-zinc-500",
            }}
            disabled={!isValid || isInitial || isMutating}
          >
            Continue with email
          </Button>

          <div className="w-full py-2 text-center text-xs text-zinc-800 dark:text-zinc-200">
            Already have an account?{" "}
            <Link
              className={tw(`text-zinc-500 decoration-zinc-500 hover:underline
              active:underline dark:text-zinc-400 dark:decoration-zinc-400`)}
              to={
                redirect
                  ? `/login?redirect=${encodeURIComponent(redirect)}`
                  : "/login"
              }
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
