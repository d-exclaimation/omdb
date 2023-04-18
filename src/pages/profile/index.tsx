import { type FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
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
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 justify-start">
      <Profile user={user ?? USER} filmsDirected={10} reviews={203} />
      <KnownFor />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
