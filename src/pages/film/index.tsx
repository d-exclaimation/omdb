import { type FC } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import useQuery from "swr";
import { film } from "../../api/film";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useToggle } from "../../common/hooks/useToggle";
import Layout from "../layout";
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
        <FilmDetails {...data} />
        <FilmDirector
          film={data}
          director={{
            id: `${data.directorId}`,
            firstName: data.directorFirstName,
            lastName: data.directorLastName,
          }}
          releaseDate={data.releaseDate}
        />
        <FilmReviews
          id={`${data.filmId}`}
          title={data.title}
          directorId={`${data.directorId}`}
          rating={data.rating}
          reviews={data.numReviews}
          releaseDate={data.releaseDate}
        />
      </div>
    </Layout>
  );
};

export default FilmPage;
