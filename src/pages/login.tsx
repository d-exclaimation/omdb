import { match } from "@d-exclaimation/common/union";
import { Transition } from "@headlessui/react";
import { useState, type FC } from "react";
import { Link, Navigate } from "react-router-dom";
import useMutation from "swr/mutation";
import { z } from "zod";
import { login } from "../api/user";
import { useAuth } from "../auth/useAuth";
import Button from "../common/components/Button";
import InputField from "../common/components/InputField";
import LoadingIndicator from "../common/components/LoadingIndicator";
import { useForm } from "../common/hooks/useForm";

const LoginUser = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string(),
});

const LoginPage: FC = () => {
  const { isLoggedIn, invalidate, isAuthenticating } = useAuth();
  const [serverError, setServerError] = useState<string>();
  const [{ values, errors }, update] = useForm({
    schema: LoginUser,
    initial: {
      email: "",
      password: "",
    },
  });
  const { trigger } = useMutation("/login", login, {
    onSuccess: (res) => {
      match(res, {
        Ok: () => {
          invalidate();
        },
        BadEmail: () => {
          setServerError("Invalid email or password");
        },
        "*": (e) => {
          console.log(e);
        },
      });
    },
  });

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col overflow-x-hidden items-center gap-4 justify-center pt-2 pb-20">
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
          <div className="w-full flex justify-center items-center mb-2">
            <h2 className="font-bold text-3xl">Log in to OMDb</h2>
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
              trigger(values);
            }}
          >
            Continue with email
          </Button>

          <div className="w-full text-center text-xs py-2 text-zinc-800">
            Don't have an account?{" "}
            <Link
              className="text-zinc-500 hover:underline active:underline decoration-zinc-500"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default LoginPage;
