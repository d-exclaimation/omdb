import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { filmGallery } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useToggle } from "../../common/hooks/useToggle";
import { withLayout } from "../layout";
import CreateFilmDialog from "./CreateFilmDialog";
import FilmsCaraousel from "./FilmsCaraousel";
import RecentOverview from "./RecentOverview";

const GalleryPage: FC = () => {
  const [creating, { close, open }] = useToggle();
  const { user, isAuthenticating } = useAuth();
  const { data, isLoading } = useQuery(
    when(!isAuthenticating, ["/gallery"]),
    filmGallery
  );

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  // TODO: Show the page but make it disabled under a blur with a login button
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full flex flex-col justify-start items-center gap-3">
      <FilmsCaraousel
        title="Your films"
        emptyMessage="There's no films you have directed yet"
        films={data?.films ?? []}
        isLoading={isLoading}
        action={{
          label: "New",
          onClick: open,
        }}
      />
      <RecentOverview data={data} />
      <CreateFilmDialog creating={creating} onClose={close} />
    </div>
  );
};

export default withLayout(GalleryPage, {
  heading: "Your film gallery",
  route: "Gallery",
});
