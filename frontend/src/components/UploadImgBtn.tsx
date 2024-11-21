import React, { useEffect, useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@ui/dialog';
import { Input } from '@ui/input';

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImgBtn = ({ setImage }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = `<span class="flex items-center gap-2"><span class="spinner"></span>Uploading...</span>`;
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('File uploaded:', file);
      setFile(null);
      setPreview(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      button.disabled = false;
      button.innerHTML = 'Upload';
    }
  };

  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" onClick={() => setIsDialogOpen(true)}>
          <RiImageAddLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-md object-cover"
              />
              <p className="text-sm">Preview</p>
            </div>
          )}
          <Button onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImgBtn;
