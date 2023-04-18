import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { Navigate } from "react-router-dom";
import { queryKeys } from "../../api/keys";
import { topFilms } from "../../api/queries/film";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import KnownFor from "./KnownFor";
import Profile from "./Profile";

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data } = useQuery({
    queryFn: topFilms,
    queryKey: queryKeys.user.topFilms,
    retry: 1,
    enabled: isAuthenticating,
  });

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 justify-start">
      <Profile user={user} filmsDirected={data?.count ?? 0} />
      <KnownFor films={data?.films ?? []} />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
