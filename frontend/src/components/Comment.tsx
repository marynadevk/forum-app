import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  deleteComment,
  getCommentsTree,
  likeComment,
  unlikeComment,
  updateComment,
} from 'src/api/comments';
import { computeCommentStyles } from 'src/helpers/computeCommentStyles';
import { handleError } from 'src/helpers/errorHandler';
import useUserStore from 'src/store/authorized-user.store';
import { Card, CardContent, CardFooter } from '@ui/card';
import { Separator } from '@ui/separator';
import {
  ActionsBar,
  NewCommentTextarea,
  TimeAgo,
  UserLink,
} from '@components/index';
import { IComment, IUser } from '../interfaces';
import EditContent from './EditContent';

type Props = {
  comment: IComment;
  level?: number;
  onUpdatedComment?: (comment: IComment, isRemove: boolean) => void;
};

const Comment = ({ comment, level = 0, onUpdatedComment }: Props) => {
  const [addComment, setAddComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subComments, setSubComments] = useState<IComment[] | null>(null);
  const [editContent, setEditContent] = useState({ content: '' });
  const [likes, setLikes] = useState<string[]>(comment.likes || []);

  const { user } = useUserStore();

  const { id, author, authorId, content, createdAt, subCommentsCount } =
    comment;

  const loadSubComments = async () => {
    try {
      const subComments = await getCommentsTree(id, '4');
      setSubComments(subComments);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditContent = () => {
    setEditContent({ content });
    setIsEditing(!isEditing);
  };

  const handleDeleteContent = async () => {
    try {
      const result = await deleteComment(id as string);
      if (result && onUpdatedComment) {
        onUpdatedComment(comment, false);
      }
      toast.success(result.message);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSaveContent = async () => {
    try {
      await updateComment(id as string, editContent);
      setIsEditing(false);
      setEditContent({ content: '' });
    } catch (error) {
      handleError(error);
    }
  };

  const handleLikeContent = async () => {
    try {
      if (user?.id === author.id) {
        toast.warning('You cannot like your own content.');
        return;
      }
      if (likes && user) {
        const isLiked = likes.includes(user?.id);
        if (isLiked) {
          await unlikeComment(id as string);
          setLikes(prev => prev.filter(like => like !== user?.id) || []);
        } else {
          await likeComment(id as string);
          setLikes(prev => [...prev, user?.id]);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const cardStyle = computeCommentStyles(level);
  const authorIdToUse = author ? author.id : authorId;

  return (
    <Card className="m-2" style={cardStyle}>
      <CardContent className="flex justify-center gap-2 pt-4">
        <div className="flex justify-between">
          <UserLink user={author as IUser} />
          <TimeAgo date={createdAt} />
        </div>
        <div>
          {isEditing ? (
            <EditContent
              editContent={editContent}
              setEditContent={setEditContent}
              onSave={handleSaveContent}
            />
          ) : (
            content
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Separator className="my-4 bg-pink-300" />
        <ActionsBar
          setAddComment={setAddComment}
          authorId={authorIdToUse}
          likes={likes}
          comments={subComments}
          addComment={addComment}
          viewSubComments={loadSubComments}
          subCommentsCount={subCommentsCount || 0}
          isEditing={isEditing}
          onEditContent={handleEditContent}
          onDeleteContent={handleDeleteContent}
          onLikeContent={handleLikeContent}
        />
        {addComment && (
          <NewCommentTextarea setSubComments={setSubComments} commentId={id} />
        )}
        {!!subComments &&
          subComments.map(subComment => (
            <Comment
              key={subComment.id + subComment.createdAt}
              comment={subComment}
              level={level + 1}
            />
          ))}
      </CardFooter>
    </Card>
  );
};

export default Comment;
