import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteThread,
  getThread,
  likeThread,
  unlikeThread,
  updateThread,
} from 'src/api/threads';
import { handleError } from 'src/helpers/errorHandler';
import useUserStore from 'src/store/authorized-user.store';
import { Card, CardHeader, CardContent, CardFooter } from '@ui/card';
import { Separator } from '@ui/separator';
import EditContent from '@components/EditContent';
import ThreadImage from '@components/ThreadImage';
import {
  Comment,
  ActionsBar,
  TimeAgo,
  NewCommentTextarea,
  UserLink,
} from '@components/index';
import { IComment, IPost, IUser } from '../interfaces';

const ThreadPage = () => {
  const { id } = useParams();
  const [addComment, setAddComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (!id) return;
    getThread(id).then(setPost);
  }, [id]);

  if (!post) return <div>Post not found</div>;
  const { title, content, author, image, createdAt, likes, comments } = post;

  // const handleAddComment = (newComment: IComment) => {
  //   setPost(prev => ({
  //     ...prev!,
  //     comments: [newComment, ...(prev?.comments || [])],
  //   }));
  // };

  const updateComments = (
    newComment: IComment,
    isAdd?: boolean,
  ) => {
    if (isAdd) {
      setPost(prev => ({
        ...prev!,
        comments: [newComment, ...(prev?.comments || [])],
      }));
    } else {
      setPost(prev => ({
        ...prev!,
        comments: prev?.comments?.filter(
          comment => comment.id !== newComment.id
        ),
      }));
    }
  };

  const handleEditContent = () => {
    setEditContent({ title, content });
    setIsEditing(!isEditing);
  };

  const handleDeleteContent = async () => {
    try {
      const response = await deleteThread(id as string);
      setPost(null);
      navigate('/threads');
      toast.success(response.message);
    } catch (error) {
      handleError(error);
    }
  };
  const handleSaveContent = async () => {
    try {
      await updateThread(id as string, editContent);
      setPost(prev => ({
        ...prev!,
        ...editContent,
      }));
      setIsEditing(false);
      setEditContent({ title: '', content: '' });
    } catch (error) {
      handleError(error);
    }
  };
  const handleLikeContent = async () => {
    try {
      if (post.likes && user) {
        const isLiked = post?.likes.includes(user?.id);
        if (isLiked) {
          await unlikeThread(id as string);
          setPost(prev => ({
            ...prev!,
            likes: prev?.likes?.filter(like => like !== user?.id) || [],
          }));
        } else {
          await likeThread(id as string);
          setPost(prev => ({
            ...prev!,
            likes: prev?.likes ? [...prev.likes, user?.id] : [user?.id],
          }));
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="">
      <Card className="w-full">
        <CardHeader>
          <div className="custom-heading">{title}</div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              Posted by <UserLink user={author as IUser} />
            </div>
            <TimeAgo date={createdAt} />
          </div>
          <div className="flex items-end justify-between w-full">
            <div className={`h-full ${image ? 'w-2/3' : 'w-full'}`}>
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
            {image && (
              <div className="ml-4 w-1/3">
                <ThreadImage publicId={image as string} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start ">
          <Separator className="my-4 bg-pink-300" />
          <ActionsBar
            authorId={author.id}
            likes={likes}
            comments={comments}
            addComment={addComment}
            setAddComment={setAddComment}
            onEditContent={handleEditContent}
            onDeleteContent={handleDeleteContent}
            onLikeContent={handleLikeContent}
            isEditing={isEditing}
          />
          {addComment && (
            <NewCommentTextarea
              postId={id as string}
              onAddComment={updateComments}
            />
          )}
        </CardFooter>
        <Separator className="h-1" />
        <div className="flex flex-col">
          <div className="text-start custom-heading">Comments</div>
          {comments &&
            comments.map(comment => (
              <Comment
                key={comment.id + comment.createdAt}
                comment={comment}
                onUpdatedComment={updateComments}
              />
            ))}
        </div>
      </Card>
    </div>
  );
};

export default ThreadPage;
