import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdCancelScheduleSend } from 'react-icons/md';
import { createThread } from 'src/api';
import { handleError } from 'src/helpers/errorHandler';
import { IPost } from 'src/interfaces';
import { z } from 'zod';
import { newPostFormSchema } from '@schemas/newPostFormSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { UploadImgBtn } from '@components/index';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
};

const NewPostTextarea = ({ setAddPost, setPosts }: Props) => {
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof newPostFormSchema>>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newPostFormSchema>) => {
    try {
      const newThreadData = { ...values };
      await createThread(newThreadData);

      setPosts(prevData => [newThreadData as IPost, ...prevData]);
      form.reset();
      setAddPost(false);
    } catch (error) {
      handleError(error);
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const currentContent = form.getValues('content');
    form.setValue('content', currentContent + emojiObject.emoji);
    setIsOpenEmojis(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setIsOpenEmojis(false);
    }
  };

  useEffect(() => {
    if (isOpenEmojis) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenEmojis]);

  const { image } = form.getValues();

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
          {image && <div className="text-sm text-pink-700 text-pretty underline">Image uploaded</div>}
        </div>
      </form>
    </Form>
  );
};

export default NewPostTextarea;
