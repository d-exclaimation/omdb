import { type FC } from "react";
import { Navigate } from "react-router-dom";
import useQuery from "swr";
import { topFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import KnownFor from "./KnownFor";
import Profile from "./Profile";

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data, isLoading } = useQuery(
    when(!isAuthenticating, ["/me", "top-films"]),
    topFilms
  );

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 justify-start">
      <Profile user={user} filmsDirected={data?.count ?? 0} />
      <KnownFor isLoading={isLoading} films={data?.films ?? []} />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
