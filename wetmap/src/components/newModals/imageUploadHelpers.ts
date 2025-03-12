
import {
  uploadphoto,
  removePhoto,
} from '../../cloudflareBucketCalls/cloudflareAWSCalls';


const handleImageUpload = async (files: FileList | null) => {
  if (!files) {
    return null;
  }

  const file = files[0];
  const extension = file.name.split('.').pop();
  const newName = Date.now() + '.' + extension;
  await uploadphoto(file, newName);
  return newName;
};

const clearPreviousImage = async (oldFile: string) => {
  removePhoto({
    filePath: import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH,
    fileName: `${oldFile}`,
  });
};

export { handleImageUpload, clearPreviousImage };
