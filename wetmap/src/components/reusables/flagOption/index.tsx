import { useEffect, useRef, useState } from 'react';
import React from 'react';
import FlagOptionView from './view';

type FlagOptionProps = {
  title:             string
  index:             number
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
  children:          React.ReactNode | React.ReactNode[]
};

export default function FlagOption(props: FlagOptionProps) {
  const [isActive, setIsActive] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (props.selectedReason !== props.index && height > 0) {
      releaseMoreInfoAnimations();
    }
  }, [props.selectedReason, props.index, height]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const animateHeight = (
    startHeight: number,
    endHeight: number,
    duration: number = 300,
  ) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 2);

      const currentHeight
        = startHeight + (endHeight - startHeight) * easeProgress;
      setHeight(currentHeight);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startMoreInfoAnimation = (id: number) => {
    props.setSelectedReason(id);

    if (height === 0) {
      setIsActive(true);
      animateHeight(0, contentRef.current?.scrollHeight || 0);
    } else {
      releaseMoreInfoAnimations();
    }
  };

  const releaseMoreInfoAnimations = () => {
    setIsActive(false);
    animateHeight(height, 0);
  };

  return (
    <FlagOptionView
      title={props.title}
      index={props.index}
      isActive={isActive}
      startMoreInfoAnimation={startMoreInfoAnimation}
      height={height}
      contentRef={contentRef}
    >
      {props.children}
    </FlagOptionView>
  );
}
