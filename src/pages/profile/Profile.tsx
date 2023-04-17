import { type FC } from "react";
import { useToggle } from "../../common/hooks/useToggle";
import Account from "./Account";
import Edit from "./Edit";

type ProfileProps = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  filmsDirected: number;
  reviews: number;
};

const Profile: FC<ProfileProps> = ({ filmsDirected, reviews, user }) => {
  const [editing, { open, close }] = useToggle();
  return (
    <div className="w-full max-w-2xl max-h-80 bg-white flex flex-row items-start overflow-x-hidden rounded-lg p-8">
      <Account
        {...user}
        filmsDirected={filmsDirected}
        reviews={reviews}
        onEdit={open}
      />
      <Edit {...user} editing={editing} close={close} submit={close} />
    </div>
  );
};

export default Profile;
