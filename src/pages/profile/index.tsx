import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { reviewedCount, topFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import KnownFor from "./KnownFor";
import Profile from "./Profile";

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data: top5, isLoading } = useQuery(
    when(!isAuthenticating, ["/me", "films", "top-5"]),
    topFilms
  );

  const { data: reviewed } = useQuery(
    when(!isAuthenticating, ["/me", "review", "count"]),
    reviewedCount
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
        filmsDirected={top5?.count ?? 0}
        filmsReviewed={reviewed?.count ?? 0}
      />
      <KnownFor isLoading={isLoading} films={top5?.films ?? []} />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
