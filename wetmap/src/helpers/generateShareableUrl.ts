type ShareableUrlParams = {
  title:       string
  description: string
  image:       string
  type?:       'website' | 'article' | 'video' | 'photo'
  url?:        string
};

export function generateShareableUrl(params: ShareableUrlParams): string {
  const baseUrl = 'https://scuba-seasons.web.app/';

  const searchParams = new URLSearchParams({
    title:       params.title,
    description: params.description,
    image:       params.image,
    type:        params.type || 'website',
  });

  if (params.url) {
    searchParams.set('url', params.url);
  }

  return `${baseUrl}?${searchParams.toString()}`;
}

export function generatePhotoShareUrl(pic: any, label: string): string {
  const photoName = pic.photoFile.split('/').pop();
  const imageUrl = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;

  return generateShareableUrl({
    title:       `Amazing ${label} Photo - Scuba SEAsons`,
    description: `Check out this amazing photo of ${label} captured during a dive! Discover more incredible underwater encounters on Scuba SEAsons.`,
    image:       imageUrl,
    type:        'photo',
  });
}
