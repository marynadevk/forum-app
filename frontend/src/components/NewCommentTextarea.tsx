import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { z } from 'zod';
import { newCommentFormSchema } from '@schemas/newCommentFormSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { DUMMY_POSTS, USERS } from '../dummy-data';

type Props = {
  postId: string;
  commentId?: string;
};

const NewCommentTextarea = ({ postId, commentId }: Props) => {
  // TODO Fetch AUTHOR data
  const author = USERS.filter(user => user.id === '101')[0];

  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const form = useForm<z.infer<typeof newCommentFormSchema>>({
    resolver: zodResolver(newCommentFormSchema),
    defaultValues: {
      comment: '',
    },
  });
  const onSubmit = (values: z.infer<typeof newCommentFormSchema>) => {
    const post = DUMMY_POSTS.find(post => post.id === postId);
    if (!post) {
      console.error('Post not found');
      return;
    }
    const comments = post.comments;
    const newComment = {
      id: (DUMMY_POSTS.length + 1).toString(),
      body: values.comment,
      user: author,
      postId,
      userId: author.id,
      createdAt: new Date().toISOString(),
      commentLikes: [],
      subComments: [],
    };

    if (!comments) {
      post.comments = [];
    } else {
      comments.push(newComment);
    }

    if (commentId && comments) {
      const parentComment = comments.find(comment => comment.id === commentId);
      if (!parentComment) {
        console.error('Parent comment not found');
        return;
      }
      if (!parentComment.subComments) {
        parentComment.subComments = [];
      }
      parentComment.subComments.push(newComment);
      form.reset();
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const currentContent = form.getValues('comment');
    form.setValue('comment', currentContent + emojiObject.emoji);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-3/4 gap-2 p-3 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Comment here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5 pl-6">
          <Button size="sm" type="submit" className="">
            Ok
            <AiOutlineSend />
          </Button>
          <Button
            size="icon"
            type="button"
            onClick={() => setIsOpenEmojis(!isOpenEmojis)}
          >
            <BsEmojiSmile />
          </Button>
          <Picker
            style={{
              position: 'absolute',
              zIndex: 9999,
              top: '-100%',
              left: '25%',
              width: '300px',
            }}
            open={isOpenEmojis}
            onEmojiClick={onEmojiClick}
          />
        </div>
      </form>
    </Form>
  );
};

export default NewCommentTextarea;
