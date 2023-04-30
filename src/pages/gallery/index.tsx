import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { filmGallery, reviewedFilms, topFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useToggle } from "../../common/hooks/useToggle";
import Layout from "../layout";
import CreateFilmDialog from "./CreateFilmDialog";
import FilmsCaraousel from "./FilmsCaraousel";

const GalleryPage: FC = () => {
  const [creating, { close, open }] = useToggle();
  const { user, isAuthenticating } = useAuth();
  const { data: gallery, isLoading: isGalleryLoading } = useQuery(
    when(!isAuthenticating, filmGallery.key),
    filmGallery.fn
  );
  const { data: reviewed, isLoading: isReviewedLoading } = useQuery(
    when(!isAuthenticating, reviewedFilms.key),
    reviewedFilms.fn
  );

  const { data: top5, isLoading: isTop5Loading } = useQuery(
    when(!isAuthenticating, topFilms.key),
    topFilms.fn
  );

  if (isAuthenticating) {
    return (
      <Layout heading="Your film gallery" route="Gallery">
        <LoadingIndicator />{" "}
      </Layout>
    );
  }

  // TODO: Show the page but make it disabled under a blur with a login button
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout heading="Your film gallery" route="Gallery">
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <Button
          className="absolute -top-[4.5rem] right-2"
          color={{
            bg: "bg-zinc-200",
            text: "text-zinc-900",
            hover: "hover:bg-zinc-300",
            active: "active:bg-zinc-300",
            border: "focus-visible:ring-zinc-200",
          }}
          onClick={open}
        >
          New film
        </Button>
        <FilmsCaraousel
          title="Known for"
          emptyMessage="There's no films you have directed yet"
          films={top5?.films ?? []}
          isLoading={isTop5Loading}
        />
        <FilmsCaraousel
          title="Directed"
          emptyMessage="There's no films you have directed yet"
          films={gallery?.films ?? []}
          isLoading={isGalleryLoading}
        />
        <FilmsCaraousel
          title="Reviewed"
          emptyMessage="There's no films you have reviewed yet"
          films={reviewed?.films ?? []}
          isLoading={isReviewedLoading}
        />
        <CreateFilmDialog creating={creating} onClose={close} />
      </div>
    </Layout>
  );
};

export default GalleryPage;
