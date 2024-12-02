import React, { useState, useEffect } from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@ui/dialog';
import { Input } from '@ui/input';
import { handleError } from 'src/helpers/errorHandler';
import { uploadImageToCloudinary } from 'src/api/cloudinaryApi'; 

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImgBtn = ({ setImage }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);

    try {
      if (file) {
        const imageUrl = await uploadImageToCloudinary(file);
        console.log('File uploaded:', file, imageUrl);
        setImage(imageUrl);
        setFile(null);
        setPreview(null);
        setIsDialogOpen(false);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsUploading(false);
      button.disabled = false;
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
      <DialogContent aria-description=''>
      <DialogTitle>Upload an Image</DialogTitle>
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
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="spinner"></span>Uploading...
              </span>
            ) : (
              'Upload'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImgBtn;
