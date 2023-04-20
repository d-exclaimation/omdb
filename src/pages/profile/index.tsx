import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { filmGallery, reviewedFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import Profile from "./Profile";
import RecentOverview from "./RecentOverview";

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data: reviewed } = useQuery(
    when(!isAuthenticating, ["me", "films", "review"]),
    reviewedFilms
  );

  const { data: gallery } = useQuery(
    when(!isAuthenticating, ["me", "films", "films"]),
    filmGallery
  );

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 justify-start">
      <Profile
        user={user}
        filmsDirected={gallery?.count ?? 0}
        filmsReviewed={reviewed?.count ?? 0}
      />
      <RecentOverview data={gallery} />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
