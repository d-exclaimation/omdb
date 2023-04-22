import { useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { type FilmDetail } from "../../api/film";
import { api } from "../../api/url";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useToggle } from "../../common/hooks/useToggle";
import EditFilmDialog from "./EditFilmDialog";

type FilmDirectorProps = {
  film: FilmDetail;
  director: {
    id: string;
    firstName: string;
    lastName: string;
  };
  releaseDate: Date;
};

const FilmDirector: FC<FilmDirectorProps> = ({
  film,
  director,
  releaseDate,
}) => {
  const { user } = useAuth();
  const { user: stamp } = useCacheControl();
  const [editing, { close, open }] = useToggle();

  const isYou = useMemo(() => user?.id === director.id, [user, director.id]);

  return (
    <div className="w-full max-w-3xl h-max bg-white flex overflow-hidden flex-col rounded-lg p-6 py-4 md:p-8 md:py-6">
      <EditFilmDialog film={film} onClose={close} editing={editing} />
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Directed by{isYou ? " (You)" : ""}
        </h3>
        <Button
          className={`absolute -top-[4.5rem] right-2 ${isYou ? "" : "hidden"}`}
          color={{
            bg: "bg-zinc-200",
            text: "text-zinc-900",
            hover: "hover:bg-zinc-300",
            active: "active:bg-zinc-300",
            border: "focus-visible:ring-zinc-200",
          }}
          onClick={open}
        >
          Edit
        </Button>
      </div>
      <div className="flex my-2 flex-row items-center justify-start">
        <Img
          className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-full"
          src={`${api}/users/${director.id}/image?${stamp}`}
          fallback="Cookie"
          alt="avatar"
        />
        <div className="flex flex-col text-start mx-2">
          {isYou ? (
            <Link
              to="/profile"
              className="flex flex-row justify-start gap-1
            text-zinc-900 hover:underline active:underline"
            >
              <span className="font-medium">{director.firstName}</span>
              <span className="font-medium">{director.lastName}</span>
            </Link>
          ) : (
            <div className="flex flex-row justify-start gap-1">
              <span className="font-medium">{director.firstName}</span>
              <span className="font-medium">{director.lastName}</span>
            </div>
          )}

          <span className="text-sm font-light">
            on {releaseDate.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilmDirector;
