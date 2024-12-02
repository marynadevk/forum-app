import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@ui/card';
import { Separator } from '@ui/separator';
import {
  Comment,
  ActionsBar,
  TimeAgo,
  NewCommentTextarea,
  UserLink,
} from '@components/index';
import { DUMMY_POSTS } from '../dummy-data';
import { IUser } from '../interfaces';
import ThreadImage from '@components/ThreadImage';

const ThreadPage = () => {
  //TODO Fetch thread data
  const { id } = useParams();
  const [addComment, setAddComment] = useState(false);
  const post = DUMMY_POSTS.find(post => post.id === id);
  if (!post) return <div>Post not found</div>;
  const { title, body, userId, image, createdAt, user, likes, comments } = post;

  return (
    <div className="">
      <Card className="w-full">
        <CardHeader>
          <div className="custom-heading">{title}</div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <UserLink user={user as IUser} />
            <TimeAgo date={createdAt} />
          </div>
          <div className="flex items-end">
            <p>{body}</p>
            <ThreadImage publicId={image as string} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start ">
          <Separator className="my-4 bg-pink-300" />
          <ActionsBar
            userId={userId}
            likes={likes}
            comments={comments}
            addComment={addComment}
            setAddComment={setAddComment}
          />
          {addComment && <NewCommentTextarea postId={id as string} />}
        </CardFooter>
        <Separator className="h-1" />
        <div className="flex flex-col">
          <div className="text-start custom-heading">Comments</div>
          {comments &&
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
      </Card>
    </div>
  );
};

export default ThreadPage;
