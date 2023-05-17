import { type FC } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import useQuery from "swr";
import { film } from "../../api/film";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import Layout from "../layout";
import FilmDetails from "./FilmDetails";
import FilmDirector from "./FilmDirector";
import FilmReviews from "./FilmReviews";
import SimilarFilms from "./SimilarFilms";

const FilmPage: FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { data, isLoading } = useQuery(id ? film.keys([id]) : null, film.fn);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!id || !data) {
    return <Navigate to="/explore" />;
  }

  return (
    <Layout key={data.filmId} route="Film" heading={data.title ?? "Film"}>
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <FilmDetails {...data} />
        <FilmDirector
          film={data}
          director={{
            id: data.directorId,
            firstName: data.directorFirstName,
            lastName: data.directorLastName,
          }}
          releaseDate={data.releaseDate}
          hasReview={data.numReviews > 0}
        />
        <FilmReviews
          id={data.filmId}
          title={data.title}
          directorId={data.directorId}
          rating={data.rating}
          reviews={data.numReviews}
          releaseDate={data.releaseDate}
        />
        <SimilarFilms
          filmId={data.filmId}
          directorId={data.directorId}
          genreId={data.genreId}
        />
      </div>
    </Layout>
  );
};

export default FilmPage;
