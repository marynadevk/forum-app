import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '@ui/avatar';
import { IUser } from '../interfaces';

type Props = {
  user: IUser;
};

const UserLink = ({ user }: Props) => {
  const { id, avatar, username } = user;

  return (
    <Link
      to={`/profile/${id}`}
      className="hover:underline flex items-center gap-2"
    >
      <span className="font-bold">{username}</span>
      <Avatar>
        <AvatarImage src={avatar} />
      </Avatar>
    </Link>
  );
};

export default UserLink;
