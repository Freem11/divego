import {
  uploadphoto,
  removePhoto,
} from '../../cloudflareBucketCalls/cloudflareAWSCalls';

const handleImageUpload = async (photoInfo) => {
  let imageFile;
  if (photoInfo.target && photoInfo.target.files[0]) {
    imageFile = photoInfo.target.files[0];
  } else if (photoInfo.name) {
    imageFile = photoInfo;
  }

  let extension = imageFile.name.split('.').pop();
  const fileName = Date.now() + '.' + extension;

  let uploaded = await uploadImage(imageFile, fileName);

  return fileName;
};

const uploadImage = async (file, name) => {
  const data = new FormData();
  data.append('image', file);
  await uploadphoto(file, name);
};

const clearPreviousImage = async (oldFile) => {
  removePhoto({
    filePath: import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH,
    fileName: `${oldFile}`,
  });
};

export { handleImageUpload, clearPreviousImage };
