import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@ui/card';
import { Separator } from '@ui/separator';
import {
  ActionsBar,
  NewCommentTextarea,
  TimeAgo,
  UserLink,
} from '@components/index';
import { IComment } from '../interfaces';

type Props = {
  comment: IComment;
};

const Comment = ({ comment }: Props) => {
  const [addComment, setAddComment] = useState(false);
  const {
    id,
    postId,
    userId,
    user,
    body,
    createdAt,
    commentLikes,
    subComments,
  } = comment;

  return (
    <Card className="w-4/5 m-2">
      <CardContent className="flex justify-center gap-2 pt-4">
        <div className="flex justify-between ">
          <UserLink user={user} />
          <TimeAgo date={createdAt} />
        </div>
        <span>{body}</span>
      </CardContent>
      <CardFooter className="flex flex-col items-start ">
        <Separator className="my-4 bg-pink-300" />
        <ActionsBar
          setAddComment={setAddComment}
          userId={userId}
          likes={commentLikes}
          comments={subComments}
          addComment={addComment}
        />
        {addComment && <NewCommentTextarea postId={postId} commentId={id} />}
        {!!subComments &&
          subComments!.map(subComment => (
            <Comment key={subComment.id} comment={subComment} />
          ))}
      </CardFooter>
    </Card>
  );
};

export default Comment;
