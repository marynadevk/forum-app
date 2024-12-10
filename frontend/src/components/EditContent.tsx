import { Button } from './ui/button';

type Props = {
  editContent: { title: string; content: string };
  setEditPost?: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  setEditComment?: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
};

const EditContent = ({
  editContent,
  setEditPost,
  onSave,
  setEditComment,
}: Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (setEditPost) {
      setEditPost(prev => ({ ...prev, [name]: value }));
    } else if (setEditComment) {
      setEditComment(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <input
        type="text"
        value={editContent.title}
        onChange={handleInputChange}
        placeholder="Edit title"
        className="border p-2 rounded w-full bg-white"
      />
      <textarea
        rows={5}
        value={editContent.content}
        onChange={handleInputChange}
        placeholder="Edit content"
        className="border p-2 rounded w-full h-32 resize-none bg-white"
      />
      <div className="flex gap-4">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default EditContent;
