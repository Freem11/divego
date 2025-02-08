import React, { useState } from 'react';
import style from './style.module.scss';

type Props = {
  src?:       string | null
  alt?:       string
  className?: string
  onClick?:   () => void
};

export default function BlurryImage({ src, alt = 'Image', className = '', onClick }: Props) {
  const [isLoading, setLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  const validSrc = !src || hasError ? undefined : src;

  return (
    <img
      src={validSrc}
      alt={alt}
      className={`${style.image} ${className} ${isLoading ? style.loading : ''}`}
      onLoad={() => setLoading(false)}
      onError={() => {
        setHasError(true);
        setLoading(false);
      }}
      onClick={onClick}
    />
  );
}
