
export default function getPhotoPublicUrl(path: string) {
  if (path) {
    const fileName = path.split('/').pop();
    if (fileName) {
      return import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${fileName}`;
    }
  }
  return null;
}
