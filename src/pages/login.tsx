import { match } from "@d-exclaimation/common/union";
import { Transition } from "@headlessui/react";
import { useCallback, useState, type FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useMutation from "swr/mutation";
import { login } from "../api/user";
import { useAuth } from "../auth/useAuth";
import Button from "../common/components/Button";
import InputField from "../common/components/InputField";
import LoadingIndicator from "../common/components/LoadingIndicator";
import { useNotification } from "../common/context/notification/useNotification";
import { useForm } from "../common/hooks/useForm";
import { useSearchParam } from "../common/hooks/useSearchParam";
import { tw } from "../common/utils/tailwind";
import { LoginUser } from "../types/user";

const LoginPage: FC = () => {
  const { isLoggedIn, invalidate, isAuthenticating } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const redirect = useSearchParam("redirect");
  const [serverError, setServerError] = useState<string>();
  const [{ values, isValid, isInitial, errors }, update] = useForm({
    schema: LoginUser,
    initial: {
      email: "",
      password: "",
    },
  });
  const { trigger } = useMutation(login.keys, login.fn, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          invalidate();
          notify({
            kind: "success",
            title: "Successfully logged in",
          });
          navigate(redirect ?? "/profile");
        },
        BadEmail: () => {
          setServerError("Invalid email or password");
        },
        "*": (e) => {
          console.log(e);
          notify({
            kind: "error",
            title: "Unexcepted error occured",
          });
        },
      });
    },
  });

  const submit = useCallback(async () => {
    if (!isValid || isInitial) return;
    trigger(values);
  }, [trigger, values]);

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="flex h-max min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 overflow-x-hidden px-5 pb-20 pt-2">
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
          <div className="mb-2 flex w-full items-center justify-center">
            <h2 className="text-2xl font-bold dark:text-white md:text-3xl">
              Log in to OMDb
            </h2>
          </div>

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
            type="password"
            placeholder="Enter your password"
            value={values.password}
            error={values.password ? errors.password : undefined}
            onChange={(password) => update((prev) => ({ ...prev, password }))}
          />
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
            disabled={!isValid || isInitial}
          >
            Continue with email
          </Button>

          <div className="w-full py-2 text-center text-xs text-zinc-800 dark:text-zinc-200">
            Don't have an account?{" "}
            <Link
              className={tw(`text-zinc-500 decoration-zinc-500 hover:underline 
              active:underline dark:text-zinc-400 dark:decoration-zinc-400`)}
              to={
                redirect
                  ? `/signup?redirect=${encodeURIComponent(redirect)}`
                  : "/signup"
              }
            >
              Sign up
            </Link>
          </div>
        </form>
      </Transition>
    </div>
  );
};

export default LoginPage;
