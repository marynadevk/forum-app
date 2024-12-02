import axios from 'axios';
import { envConfig } from 'config';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${envConfig.cloudinaryName}/image/upload`;

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', envConfig.cloudinaryPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Upload failed');
  }
};
