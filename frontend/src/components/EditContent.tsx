import { Button } from './ui/button';

type Props = {
  editContent: { title?: string; content: string };
  setEditContent: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  onSave: () => void;
};

const EditContent = ({
  editContent,
  setEditContent,
  onSave,
}: Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditContent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {editContent.title &&
      <input
        type="text"
        name="title"
        value={editContent.title}
        onChange={handleInputChange}
        placeholder="Edit title"
        className="border p-2 rounded w-full bg-white"
      />}
      <textarea
        rows={5}
        name="content"
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
