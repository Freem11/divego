import { useState, useEffect } from 'react';

export function useImageLoader(imageUrl?: string | null) {
  const [isLoading, setLoading] = useState(!!imageUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
    img.onerror = () => {
      setHasError(true);
      setLoading(false);
    };
  }, [imageUrl]);

  const validImage = imageUrl && !hasError ? imageUrl : undefined;

  return { isLoading, hasError, validImage };
}
