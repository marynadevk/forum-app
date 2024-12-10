import { useState } from 'react';
import { deleteComment, getSubComments, updateComment } from 'src/api/comments';
import { computeCommentStyles } from 'src/helpers/computeCommentStyles';
import { handleError } from 'src/helpers/errorHandler';
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
};

const Comment = ({ comment, level = 0 }: Props) => {
  const [addComment, setAddComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subComments, setSubComments] = useState<IComment[] | null>(null);
  const [editContent, setEditContent] = useState('');

  const {
    id,
    author,
    authorId,
    content,
    createdAt,
    commentLikes,
    subCommentsCount,
  } = comment;

  const loadSubComments = async () => {
    try {
      const subComments = await getSubComments(id, '4');
      setSubComments(subComments);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditContent = () => {
    setEditContent(content);
    setIsEditing(!isEditing);
  };

  const handleDeleteContent = async () => {
    try {
      await deleteComment(id as string);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSaveContent = async () => {
    try {
      await updateComment(id as string, editContent);
      setIsEditing(false);
      setEditContent('');
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
          likes={commentLikes}
          comments={subComments}
          addComment={addComment}
          viewSubComments={loadSubComments}
          subCommentsCount={subCommentsCount || 0}
          isEditing={isEditing}
          onEditContent={handleEditContent}
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
