import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { createComment } from 'src/api';
import { handleError } from 'src/helpers/errorHandler';
import { IComment } from 'src/interfaces';
import { z } from 'zod';
import { newCommentFormSchema } from '@schemas/newCommentFormSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  postId?: string;
  commentId?: string;
  setSubComments?: React.Dispatch<React.SetStateAction<IComment[] | null>>;
  onAddComment?: (newComment: IComment, isAdd: boolean) => void;
};

const NewCommentTextarea = ({
  postId,
  commentId,
  setSubComments,
  onAddComment,
}: Props) => {
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof newCommentFormSchema>>({
    resolver: zodResolver(newCommentFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newCommentFormSchema>) => {
    try {
      if (postId && onAddComment) {
        const newComment = await createComment({
          content: values.comment,
          postId,
        });
        onAddComment(newComment, true);
        form.reset();
      } else if (commentId) {
        const comment = await createComment({
          content: values.comment,
          commentId,
        });
        if (setSubComments) {
          setSubComments(prev => [...(prev || []), comment]);
        }
        form.reset();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const currentContent = form.getValues('comment');
    form.setValue('comment', currentContent + emojiObject.emoji);
    setIsOpenEmojis(false);
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
          {isOpenEmojis && (
            <div
              ref={emojiPickerRef}
              className="absolute z-50 bg-white shadow-md rounded-md p-1"
              style={{
                top: '-170px',
                left: '150px',
              }}
            >
              <Picker
                className="overflow-y-auto"
                skinTonesDisabled
                style={
                  {
                    '--epr-emoji-size': '20px',
                  } as React.CSSProperties
                }
                width={600}
                height={150}
                onEmojiClick={onEmojiClick}
                searchDisabled
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default NewCommentTextarea;
