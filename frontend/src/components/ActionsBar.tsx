import { FaCommentMedical, FaCommentSlash, FaRegComment } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { GoHeart } from 'react-icons/go';
import useUserStore from 'src/store/authorized-user.store';
import { Button } from '@ui/button';
import { IComment } from '../interfaces';
import ConfirmationWindow from './ConfirmationWindow';

type Props = {
  authorId: string;
  likes?: string[];
  comments?: IComment[];
  setAddComment?: React.Dispatch<React.SetStateAction<boolean>>;
  addComment?: boolean;
  onEditContent?: () => void;
  onDeleteContent?: () => void;
  isEditing?: boolean;
};

const ActionsBar = ({
  likes,
  comments,
  authorId,
  setAddComment,
  addComment,
  onEditContent,
  onDeleteContent,
  isEditing,
}: Props) => {
  const { user } = useUserStore();
  const isMyLike = likes?.includes(user?.id as string);
  const isMyContent = user?.id === authorId;

  const handleAddComment = () => {
    if (setAddComment) {
      setAddComment(prev => !prev);
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-5">
        <button className="flex gap-2 items-center w-12 text-sm">
          {likes?.length}{' '}
          {isMyLike ? (
            <FcLikePlaceholder size="20px" />
          ) : (
            <GoHeart size="20px" />
          )}
        </button>
        <button className="flex gap-2 items-center w-max text-sm">
          {comments && (
            <>
              {comments?.length} <FaRegComment size="20px" />
            </>
          )}
        </button>
        <button className="text-sm" onClick={handleAddComment}>
          {addComment ? (
            <FaCommentSlash size="20px" />
          ) : (
            <FaCommentMedical size="20px" />
          )}
        </button>
      </div>
      {isMyContent && (
        <div className="flex gap-2">
          <Button onClick={onEditContent}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <ConfirmationWindow
            onConfirm={onDeleteContent}
            message="Are you sure you want to delete this content?"
          />
        </div>
      )}
    </div>
  );
};

export default ActionsBar;
