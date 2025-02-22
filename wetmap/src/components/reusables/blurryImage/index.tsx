import React from 'react';
import style from './style.module.scss';
import { useImageLoader } from './useImageLoader';

type Props = {
  src?:       string | null
  alt?:       string
  className?: string
  onClick?:   () => void
};

export default function BlurryImage({ src, alt = 'Image', className = '', onClick }: Props) {
  const { isLoading, validImage } = useImageLoader(src);

  return (
    <img
      src={validImage}
      alt={alt}
      className={`${style.image} ${className} ${isLoading ? style.loading : ''}`}
      loading="lazy"
      onClick={onClick}
    />
  );
}
