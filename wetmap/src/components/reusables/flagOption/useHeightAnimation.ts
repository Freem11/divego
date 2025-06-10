import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_ANIMATION_DURATION_MS = 300;
const EASE_OUT_QUAD = (t: number) => 1 - Math.pow(1 - t, 2);

export default function useHeightAnimation(
  duration: number = DEFAULT_ANIMATION_DURATION_MS,
  easingFunction: (t: number) => number = EASE_OUT_QUAD,
) {
  const [height, setHeight] = useState(0);
  const animationRef = useRef<number | null>(null);

  const cancelAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const animateHeight = useCallback((
    startHeight: number,
    endHeight: number,
  ) => {
    cancelAnimation();

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = easingFunction(progress);
      const currentHeight = startHeight + (endHeight - startHeight) * easeProgress;

      setHeight(currentHeight);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [duration, easingFunction, cancelAnimation]);

  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return { height, animateHeight, cancelAnimation };
}
