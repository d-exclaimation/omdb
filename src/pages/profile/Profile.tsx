import { type FC } from "react";
import { useToggle } from "../../common/hooks/useToggle";
import Account from "./Account";
import EditDialog from "./EditDialog";

type ProfileProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  filmsDirected: number;
  filmsReviewed: number;
};

const Profile: FC<ProfileProps> = ({ filmsDirected, filmsReviewed, user }) => {
  const [editing, { open, close }] = useToggle();
  return (
    <div className="flex max-h-80 w-full max-w-3xl flex-row items-start overflow-x-hidden rounded-lg bg-white p-6 dark:bg-zinc-900 md:p-8">
      <Account
        {...user}
        filmsDirected={filmsDirected}
        filmsReviewed={filmsReviewed}
        onEdit={open}
      />
      <EditDialog {...user} editing={editing} close={close} />
    </div>
  );
};

export default Profile;
