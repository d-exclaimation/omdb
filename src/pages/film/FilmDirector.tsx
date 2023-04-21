import { useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/url";
import { useAuth } from "../../auth/useAuth";
import Img from "../../common/components/Image";
import { useCacheControl } from "../../common/context/cache/useCacheControl";

type FilmDirectorProps = {
  id: string;
  firstName: string;
  lastName: string;
  releaseDate: Date;
};

const FilmDirector: FC<FilmDirectorProps> = ({
  id,
  firstName,
  lastName,
  releaseDate,
}) => {
  const { user } = useAuth();
  const { user: stamp } = useCacheControl();

  const isYou = useMemo(() => user?.id === id, [user, id]);

  return (
    <div className="w-full max-w-2xl h-max bg-white flex overflow-hidden flex-col rounded-lg p-6 py-4 md:p-8 md:py-6">
      <div className="w-full flex items-center">
        <h3 className="text-lg font-semibold">
          Directed by{isYou ? " (You)" : ""}
        </h3>
      </div>
      <div className="flex my-2 flex-row items-center justify-start">
        <Img
          className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-full"
          src={`${api}/users/${id}/image?${stamp}`}
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
              <span className="font-medium">{firstName}</span>
              <span className="font-medium">{lastName}</span>
            </Link>
          ) : (
            <div className="flex flex-row justify-start gap-1">
              <span className="font-medium">{firstName}</span>
              <span className="font-medium">{lastName}</span>
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
