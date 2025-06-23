import { useCallback, useEffect, useRef } from 'react';
import React from 'react';
import FlagOptionView from './view';
import useHeightAnimation from './useHeightAnimation';

type FlagOptionProps = {
  title:             string
  index:             number
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
  children:          React.ReactNode | React.ReactNode[]
};

const COLLAPSED_HEIGHT = 0;

export default function FlagOption(props: FlagOptionProps) {
  const { selectedReason, setSelectedReason, index, title, children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const { height, animateHeight } = useHeightAnimation();

  const isSelected = selectedReason === index;
  const isExpanded = height > COLLAPSED_HEIGHT;

  const toggleExpansion = useCallback((shouldExpand: boolean) => {
    if (shouldExpand) {
      const targetHeight = contentRef.current?.scrollHeight || 0;
      animateHeight(height, targetHeight);
    } else {
      animateHeight(height, COLLAPSED_HEIGHT);
    }
  }, [height, animateHeight]);

  const handleOptionSelect = useCallback((id: number) => {
    setSelectedReason(id);
    toggleExpansion(!isExpanded);
  }, [setSelectedReason, toggleExpansion, isExpanded]);

  useEffect(() => {
    if (!isSelected && isExpanded) {
      toggleExpansion(false);
    }
  }, [isSelected, isExpanded, toggleExpansion]);

  return (
    <FlagOptionView
      title={title}
      index={index}
      isExpanded={isExpanded}
      handleOptionSelect={handleOptionSelect}
      height={height}
      contentRef={contentRef}
    >
      {children}
    </FlagOptionView>
  );
}
