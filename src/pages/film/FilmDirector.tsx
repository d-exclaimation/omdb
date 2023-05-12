import { useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/url";
import { useAuth } from "../../auth/useAuth";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";
import { useToggle } from "../../common/hooks/useToggle";
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
    <div className="w-full max-w-3xl h-max bg-white flex overflow-hidden flex-col rounded-lg p-6 py-4 md:p-8 md:py-6">
      <EditFilmDialog film={film} onClose={closeEdit} editing={editing} />
      <DeleteFilmDialog
        id={film.filmId}
        title={film.title}
        onClose={closeDelete}
        deleting={deleting}
      />
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Directed by{isYou ? " (You)" : ""}
        </h3>
        <Settings
          className={`${isYou ? "" : "hidden"}`}
          disabled={hasReview}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </div>
      <div className="flex my-2 flex-row w-full items-center justify-start">
        <Img
          className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-full"
          src={`${api}/users/${director.id}/image?${stamp}`}
          fallback={director.firstName}
          alt="avatar"
        />
        <div className="flex flex-col text-start mx-2 w-full">
          {isYou ? (
            <Link
              to="/profile"
              className="flex flex-row justify-start gap-1 font-medium
            text-zinc-900 hover:underline active:underline max-w-[80%]"
            >
              <span className="truncate max-w-full">
                {director.firstName} {director.lastName}
              </span>
            </Link>
          ) : (
            <div className="flex flex-row justify-start gap-1 max-w-[80%] font-medium">
              <span className="truncate max-w-full">
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
