import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { Navigate } from "react-router-dom";
import { topFilms } from "../../api/queries/film";
import { useAuth } from "../../auth/useAuth";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { withLayout } from "../layout";
import KnownFor from "./KnownFor";
import Profile from "./Profile";

const USER = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
};

const ProfilePage: FC = () => {
  const { user, isAuthenticating } = useAuth();
  const { data } = useQuery({
    queryFn: topFilms,
    queryKey: ["topFilms"],
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
      <KnownFor />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
