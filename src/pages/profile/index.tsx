import { type FC } from "react";
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
  return (
    <div className="w-full flex flex-col items-center gap-3 justify-start">
      <Profile user={USER} filmsDirected={10} reviews={203} />
      <KnownFor />
    </div>
  );
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
