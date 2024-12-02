import { Cloudinary } from '@cloudinary/url-gen';
import { envConfig } from 'config';
import { AdvancedImage } from '@cloudinary/react';

const ThreadImage = ({ publicId }: { publicId: string }) => {
  const cld = new Cloudinary({ cloud: { cloudName: envConfig.cloudinaryName } });
  const img = cld
    .image(publicId)
    .format('auto')
    .quality('auto');

  return (
    <div>
      <AdvancedImage cldImg={img} />
    </div>
  );
};

export default ThreadImage;
