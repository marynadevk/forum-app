import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdCancelScheduleSend } from 'react-icons/md';
import { z } from 'zod';
import { newPostFormSchema } from '@schemas/newPostFormSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { UploadImgBtn } from '@components/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { DUMMY_POSTS, USERS } from '../dummy-data';

type Props = {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewPostTextarea = ({ setAddPost }: Props) => {
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const form = useForm<z.infer<typeof newPostFormSchema>>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newPostFormSchema>) => {
    console.log('New post submitted values:', values);
    const author = USERS.filter(user => user.id === '101')[0];
    DUMMY_POSTS.push({
      id: (DUMMY_POSTS.length + 1).toString(),
      title: values.title,
      body: values.content,
      image: values.image,
      user: author,
      userId: '101',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    });
    form.reset();
    setAddPost(false);
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const currentContent = form.getValues('content');
    form.setValue('content', currentContent + emojiObject.emoji);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts, tips, or questions about flowers and plants here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5 relative pl-6">
          <Button size="sm" type="button" onClick={() => setAddPost(false)}>
            Cancel <MdCancelScheduleSend />
          </Button>
          <Button size="sm" type="submit" className="">
            Ok
            <AiOutlineSend />
          </Button>
          <FormItem>
            <FormControl>
              <Controller
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <UploadImgBtn setImage={onChange} />
                )}
              />
            </FormControl>
          </FormItem>
          <Button
            size="icon"
            type="button"
            onClick={() => setIsOpenEmojis(!isOpenEmojis)}
          >
            <BsEmojiSmile />
          </Button>
          <Picker
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              position: 'absolute',
              zIndex: 9999,
              top: '0',
              right: '55%',
            }}
            open={isOpenEmojis}
            onEmojiClick={onEmojiClick}
          />
        </div>
      </form>
    </Form>
  );
};

export default NewPostTextarea;
