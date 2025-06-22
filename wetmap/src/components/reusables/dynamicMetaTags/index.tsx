import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

type DynamicMetaTagsProps = {
  defaultTitle?:       string
  defaultDescription?: string
  defaultImage?:       string
};

const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  defaultTitle = 'Scuba SEAsons - Dive into Amazing Underwater Adventures',
  defaultDescription = 'Discover the best diving spots and marine life encounters worldwide. Share your underwater adventures with the diving community.',
  defaultImage = 'https://scuba-seasons.web.app/src/images/Matt_Manta_White.png',
}) => {
  const [searchParams] = useSearchParams();

  const title = searchParams.get('title') || defaultTitle;
  const description = searchParams.get('description') || defaultDescription;
  const image = searchParams.get('image') || defaultImage;
  const url = searchParams.get('url') || window.location.href;
  const type = searchParams.get('type') || 'website';

  const currentUrl = new URL(window.location.href);
  const cleanUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={cleanUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Scuba SEAsons" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default DynamicMetaTags;
