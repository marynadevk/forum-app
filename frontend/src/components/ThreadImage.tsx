import { Cloudinary } from '@cloudinary/url-gen';
import { envConfig } from 'config';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

type ThreadImageProps = {
  publicId: string;
};

const ThreadImage = ({ publicId }: ThreadImageProps) => {
  if (!publicId) {
    return null;
  }

  const imagePublicId = publicId.includes('res.cloudinary.com')
    ? publicId.split('image/upload/')[1]
    : publicId;

  const cld = new Cloudinary({ cloud: { cloudName: envConfig.cloudinaryName } });

  const img = cld
    .image(imagePublicId)
    .format('auto') 
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(300).height(300));

  return (
    <div>
      <AdvancedImage cldImg={img} alt={`Thread image ${imagePublicId}`} />
    </div>
  );
};

export default ThreadImage;
