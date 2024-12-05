import { Button } from './ui/button';

type Props = {
  editContent: { title: string; content: string };
  setEditContent: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  onSave: () => void;
};

const EditContent = ({ editContent, setEditContent, onSave }: Props) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(prev => ({ ...prev, content: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <input
        type="text"
        value={editContent.title}
        onChange={handleTitleChange}
        placeholder="Edit title"
        className="border p-2 rounded w-full bg-white"
      />
      <textarea
        rows={5}
        value={editContent.content}
        onChange={handleContentChange}
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
