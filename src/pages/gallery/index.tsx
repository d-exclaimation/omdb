import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { filmGallery } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import FilmsCaraousel from "./FilmsGallery";

const GalleryPage: FC = () => {
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
        title="Films you have directed"
        emptyMessage="There's no films you have directed yet"
        films={data?.films ?? []}
        cachestamp={data?.cachestamp}
        isLoading={isLoading}
      />
      <div className="w-full max-w-2xl max-h-80 bg-white flex flex-row items-start overflow-x-hidden rounded-lg p-6 md:p-8"></div>
    </div>
  );
};

export default withLayout(GalleryPage, {
  heading: "Your films and reviews",
  route: "Gallery",
});
