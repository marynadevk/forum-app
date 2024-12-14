import { FaCommentMedical, FaCommentSlash, FaRegComment } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { GoHeart } from 'react-icons/go';
import { toast } from 'react-toastify';
import useUserStore from 'src/store/authorized-user.store';
import { Button } from '@ui/button';
import { IComment } from '../interfaces';
import ConfirmationWindow from './ConfirmationWindow';

type Props = {
  authorId: string;
  likes?: string[];
  comments?: IComment[] | null;
  subCommentsCount?: number;
  setAddComment?: React.Dispatch<React.SetStateAction<boolean>>;
  viewSubComments?: () => void;
  addComment?: boolean;
  onEditContent?: () => void;
  onDeleteContent?: () => void;
  onLikeContent?: () => void;
  isEditing?: boolean;
};

const ActionsBar = ({
  likes,
  comments,
  authorId,
  setAddComment,
  addComment,
  onEditContent,
  viewSubComments,
  onDeleteContent,
  isEditing,
  subCommentsCount,
  onLikeContent,
}: Props) => {
  const { user } = useUserStore();
  const isMyLike = likes?.includes(user?.id as string);
  const isMyContent = user?.id === authorId;

  const handleAddComment = () => {
    if (!user) {
      toast.warning('You need to be logged in to comment');
    }

    if (user && setAddComment) {
      setAddComment(prev => !prev);
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-5">
        <button
          className={`flex gap-2 items-center w-12 text-sm ${isMyContent ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={onLikeContent}
        >
          {likes?.length}{' '}
          {isMyLike ? (
            <FcLikePlaceholder size="20px" />
          ) : (
            <GoHeart size="20px" />
          )}
        </button>
        <button
          className="flex gap-2 items-center w-max text-sm"
          onClick={viewSubComments}
        >
          {(comments || (subCommentsCount as number) > 0) && (
            <>
              {comments?.length || subCommentsCount}{' '}
              <FaRegComment size="20px" />
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
