import { Photo } from '../entities/photos';

export default function getPhotoPublicUrl(photo: Photo) {
  if (photo.photoFile) {
    const fileName = photo.photoFile.split('/').pop();
    if (fileName) {
      return `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${fileName}`;
    }
  }
  return null;
}
