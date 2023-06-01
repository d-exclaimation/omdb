import { type FC } from "react";
import useMutation from "swr/mutation";
import { api } from "../../api/url";
import { logout } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useNotification } from "../../common/context/notification/useNotification";
import Settings from "./Settings";

type AccountProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  filmsDirected: number;
  filmsReviewed: number;
  onEdit: () => void;
};

const Account: FC<AccountProps> = ({
  id,
  firstName,
  lastName,
  email,
  filmsDirected,
  filmsReviewed,
  onEdit,
}) => {
  const { user: stamp } = useCacheControl();
  const { invalidate } = useAuth();
  const { notify } = useNotification();
  const { trigger } = useMutation(logout.keys, logout.fn, {
    onSuccess: () => {
      invalidate();
      notify({
        kind: "info",
        title: "You have been logged out",
      });
    },
  });
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col">
      <section className="flex w-full items-start justify-between">
        <Img
          className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
          src={`${api}/users/${id}/image?${stamp}`}
          fallback={`${firstName}${lastName}`}
          alt="avatar"
        />
        <Settings onEdit={onEdit} onLogout={trigger} />
      </section>
      <section className="my-2 flex w-full flex-col items-start justify-center">
        <h2 className="max-w-full truncate text-lg font-semibold dark:text-white md:text-xl">
          {firstName} {lastName}
        </h2>
        <h4 className="max-w-full truncate text-base font-medium text-zinc-400 dark:text-zinc-500">
          @{email.split("@")[0]}
        </h4>
      </section>
      <section className="my-2 flex w-full flex-col items-start justify-center gap-3">
        <div className="flex items-center text-zinc-500">
          <img className="mr-1 h-5 w-5" src="/icons/case.svg" alt="email" />
          <a
            className="text-sky-500 decoration-sky-500 hover:underline active:underline"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
        <div className="flex w-full flex-col flex-wrap gap-1 md:flex-row md:items-center md:gap-5">
          <div className="flex items-center text-zinc-500">
            <img className="mr-1 h-5 w-5" src="/icons/film.svg" alt="films" />
            <span>
              <span className="font-semibold text-black dark:text-white">
                {filmsDirected}
              </span>{" "}
              films directed
            </span>
          </div>

          <div className="flex items-center text-zinc-500">
            <img className="mr-1 h-5 w-5" src="/icons/review.svg" alt="films" />
            <span>
              <span className="font-semibold text-black dark:text-white">
                {filmsReviewed}
              </span>{" "}
              films reviewed
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
