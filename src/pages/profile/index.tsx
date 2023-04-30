import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { filmGallery, reviewedFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import Layout from "../layout";
import Profile from "./Profile";
import RatingOverview from "./RatingOverview";
import RecentOverview from "./RecentOverview";

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data: reviewed } = useQuery(
    when(!isAuthenticating, reviewedFilms.key),
    reviewedFilms.fn
  );

  const { data: gallery } = useQuery(
    when(!isAuthenticating, filmGallery.key),
    filmGallery.fn
  );

  if (isAuthenticating) {
    return (
      <Layout heading="Your profile" route="Profile">
        <LoadingIndicator />
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout heading="Your profile" route="Profile">
      <div className="w-full flex flex-col items-center gap-3 justify-start">
        <Profile
          user={user}
          filmsDirected={gallery?.count ?? 0}
          filmsReviewed={reviewed?.count ?? 0}
        />
        <RecentOverview data={gallery} />
        <RatingOverview data={gallery} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
