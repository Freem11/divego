import {
  uploadphoto,
  removePhoto,
} from '../../cloudflareBucketCalls/cloudflareAWSCalls';

    type handleImageUploadProps = {
      photoInfo: any
    };

    type uploadImageProps = {
      file: any
      name: string | null
    };

    type clearPreviousImageProps = {
      oldFile: any
    };

const handleImageUpload = async (props: handleImageUploadProps) => {
  const { photoInfo } = props;
  let imageFile;
  if (photoInfo.target && photoInfo.target.files[0]) {
    imageFile = photoInfo.target.files[0];
  } else if (photoInfo.name) {
    imageFile = photoInfo;
  }

  const extension = imageFile.name.split('.').pop();
  const fileName = Date.now() + '.' + extension;

  const uploaded = await uploadImage({ file: imageFile, name: fileName });

  return fileName;
};

const uploadImage = async (props: uploadImageProps) => {
  const { file, name } = props;
  const data = new FormData();
  data.append('image', file);
  await uploadphoto(file, name);
};

const clearPreviousImage = async (props: clearPreviousImageProps) => {
  const { oldFile } = props;
  removePhoto({
    filePath: import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH,
    fileName: `${oldFile}`,
  });
};

export { handleImageUpload, clearPreviousImage };
