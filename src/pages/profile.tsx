import { type FC } from "react";
import { withLayout } from "./layout";

const ProfilePage: FC = () => {
  return <div>Something</div>;
};

export default withLayout(ProfilePage, {
  route: "Profile",
  heading: "Your profile",
});
