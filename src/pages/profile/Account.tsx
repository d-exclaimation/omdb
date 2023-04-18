import { type FC } from "react";
import useMutation from "swr/mutation";
import { logout } from "../../api/user";
import { useAuth } from "../../auth/useAuth";
import Settings from "./Settings";

type AccountProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  filmsDirected: number;
  onEdit: () => void;
};

const Account: FC<AccountProps> = ({
  id,
  firstName,
  lastName,
  email,
  image,
  filmsDirected,
  onEdit,
}) => {
  const { invalidate } = useAuth();
  const { trigger } = useMutation("/logout", logout, {
    onSuccess: () => {
      invalidate();
    },
  });
  return (
    <div className="w-full h-full flex-shrink-0 flex flex-col">
      <section className="w-full flex items-start justify-between">
        <img
          className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full"
          src={image}
          onError={(e) => {
            e.currentTarget.src =
              "https://api.dicebear.com/6.x/shapes/svg?seed=Cookie";
          }}
          alt="avatar"
        />
        <Settings onEdit={onEdit} onLogout={trigger} />
      </section>
      <section className="flex flex-col items-start justify-center w-full my-2">
        <h2 className="font-semibold text-lg md:text-xl max-w-full truncate">
          {firstName} {lastName}
        </h2>
        <h4 className="font-medium text-base text-zinc-400 max-w-full truncate">
          @user-{id}
        </h4>
      </section>
      <section className="flex flex-col items-start justify-center w-full gap-3 my-2">
        <div className="flex items-center text-zinc-500">
          <img className="w-5 h-5 mr-2" src="/icons/case.svg" alt="email" />
          <a
            className="hover:underline active:underline decoration-sky-500 text-sky-500"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
        <div className="flex w-full items-center gap-5 flex-wrap">
          <div className="flex items-center text-zinc-500">
            <img
              className="w-5 h-5 mr-2"
              src="/icons/directed.svg"
              alt="films"
            />
            <span>
              <span className="text-black font-semibold">{filmsDirected}</span>{" "}
              films directed by you
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
