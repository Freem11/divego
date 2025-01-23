
export default function getPhotoPublicUrl(path: string) {
  if (path) {
    const fileName = path.split('/').pop();
    if (fileName) {
      return `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${fileName}`;
    }
  }
  return null;
}
