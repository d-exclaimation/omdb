import { type FC } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import useQuery from "swr";
import { film } from "../../api/film";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useToggle } from "../../common/hooks/useToggle";
import Layout from "../layout";
import FilmEdit from "./EditFilmDialog";
import FilmDetails from "./FilmDetails";
import FilmDirector from "./FilmDirector";
import FilmReviews from "./FilmReviews";

const FilmPage: FC = () => {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const [editing, { close, open }] = useToggle();
  const id = params.get("id");
  const { data, isLoading } = useQuery(id ? ["films", id] : null, film);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!id || !data) {
    return <Navigate to="/explore" />;
  }

  return (
    <Layout route="Film" heading={data.title ?? "Film"}>
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <Button
          className={`absolute -top-[4.5rem] right-2 ${
            user?.id === `${data.directorId}` ? "" : "hidden"
          }`}
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
        <FilmEdit film={data} onClose={close} editing={editing} />
        <FilmDetails {...data} />
        <FilmDirector
          id={`${data.directorId}`}
          firstName={data.directorFirstName}
          lastName={data.directorLastName}
          releaseDate={data.releaseDate}
        />
        <FilmReviews
          id={`${data.filmId}`}
          title={data.title}
          directorId={`${data.directorId}`}
          rating={data.rating}
          reviews={data.numReviews}
        />
      </div>
    </Layout>
  );
};

export default FilmPage;
