import { type FC } from "react";
import useMutation from "swr/mutation";
import { api } from "../../api/url";
import { logout } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
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
  const { trigger } = useMutation("logout", logout, {
    onSuccess: () => {
      invalidate();
    },
  });
  return (
    <div className="w-full h-full flex-shrink-0 flex flex-col">
      <section className="w-full flex items-start justify-between">
        <Img
          className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full"
          src={`${api}/users/${id}/image?${stamp}`}
          fallback={email}
          alt="avatar"
        />
        <Settings onEdit={onEdit} onLogout={trigger} />
      </section>
      <section className="flex flex-col items-start justify-center w-full my-2">
        <h2 className="font-semibold text-lg md:text-xl max-w-full truncate">
          {firstName} {lastName}
        </h2>
        <h4 className="font-medium text-base text-zinc-400 max-w-full truncate">
          @{email.split("@")[0]}
        </h4>
      </section>
      <section className="flex flex-col items-start justify-center w-full gap-3 my-2">
        <div className="flex items-center text-zinc-500">
          <img className="w-5 h-5 mr-1" src="/icons/case.svg" alt="email" />
          <a
            className="hover:underline active:underline decoration-sky-500 text-sky-500"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
        <div className="flex flex-col md:flex-row w-full md:items-center gap-1 md:gap-5 flex-wrap">
          <div className="flex items-center text-zinc-500">
            <img className="w-5 h-5 mr-1" src="/icons/film.svg" alt="films" />
            <span>
              <span className="text-black font-semibold">{filmsDirected}</span>{" "}
              films directed
            </span>
          </div>

          <div className="flex items-center text-zinc-500">
            <img className="w-5 h-5 mr-1" src="/icons/review.svg" alt="films" />
            <span>
              <span className="text-black font-semibold">{filmsReviewed}</span>{" "}
              films reviewed
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
