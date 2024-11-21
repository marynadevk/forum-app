import { FaCommentMedical, FaCommentSlash, FaRegComment } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { GoHeart } from 'react-icons/go';
import { Button } from '@ui/button';
import { IComment } from '../interfaces';

type Props = {
  userId: string;
  likes?: string[];
  comments?: IComment[];
  setAddComment?: React.Dispatch<React.SetStateAction<boolean>>;
  addComment?: boolean;
};

const ActionsBar = ({
  likes,
  comments,
  userId,
  setAddComment,
  addComment,
}: Props) => {
  //TODO Fetch AUTHOR data
  const authorId = '101';
  const isMyLike = likes?.includes(authorId);
  const isMyContent = authorId === userId;

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
      {isMyContent && <Button>Edit</Button>}
    </div>
  );
};

export default ActionsBar;
