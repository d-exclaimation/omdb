import { useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/url";
import { useAuth } from "../../auth/useAuth";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useToggle } from "../../common/hooks/useToggle";
import { tw } from "../../common/utils/tailwind";
import { type FilmDetail } from "../../types/film";
import DeleteFilmDialog from "./DeleteFilmDialog";
import EditFilmDialog from "./EditFilmDialog";
import Settings from "./Settings";

type FilmDirectorProps = {
  film: FilmDetail;
  director: {
    id: number;
    firstName: string;
    lastName: string;
  };
  releaseDate: Date;
  hasReview: boolean;
};

const FilmDirector: FC<FilmDirectorProps> = ({
  film,
  director,
  releaseDate,
  hasReview,
}) => {
  const { user } = useAuth();
  const { user: stamp } = useCacheControl();
  const [editing, { close: closeEdit, open: openEdit }] = useToggle();
  const [deleting, { close: closeDelete, open: openDelete }] = useToggle();

  const isYou = useMemo(() => user?.id === director.id, [user, director.id]);
  return (
    <div className="flex h-max w-full max-w-3xl flex-col rounded-lg bg-white p-6 py-4 dark:bg-zinc-900 md:p-8 md:py-6">
      <EditFilmDialog film={film} onClose={closeEdit} editing={editing} />
      <DeleteFilmDialog
        id={film.filmId}
        title={film.title}
        onClose={closeDelete}
        deleting={deleting}
      />
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">
          Directed by{isYou ? " (You)" : ""}
        </h3>
        <Settings
          className={`${isYou ? "" : "hidden"}`}
          disabled={hasReview}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </div>
      <div className="my-2 flex w-full flex-row items-center justify-start">
        <Img
          className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
          src={`${api}/users/${director.id}/image?${stamp}`}
          fallback={`${director.firstName}${director.lastName}`}
          alt="avatar"
        />
        <div className="mx-2 flex w-full flex-col text-start dark:text-white">
          {isYou ? (
            <Link
              to="/profile"
              className={tw(`flex max-w-[80%] flex-row 
              justify-start gap-1 font-medium text-zinc-900
              hover:underline active:underline dark:text-zinc-100`)}
            >
              <span className="max-w-full truncate">
                {director.firstName} {director.lastName}
              </span>
            </Link>
          ) : (
            <div className="flex max-w-[80%] flex-row justify-start gap-1 font-medium">
              <span className="max-w-full truncate">
                {director.firstName} {director.lastName}
              </span>
            </div>
          )}

          <span className="text-sm font-light">
            on {releaseDate.toLocaleDateString("en-NZ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilmDirector;
