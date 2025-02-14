import React, { useState, ReactNode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.scss';

export const TOOLTIP_DIRECTION = {
  TOP:    'top',
  BOTTOM: 'bottom',
  LEFT:   'left',
  RIGHT:  'right',
} as const;

export type TooltipDirection = typeof TOOLTIP_DIRECTION[keyof typeof TOOLTIP_DIRECTION];

const DELAY = 300;
const GAP = 8;

const calculatePosition = (wrapperR: DOMRect, tooltipR: DOMRect, direction: TooltipDirection) => {
  let top = 0, left = 0;
  switch (direction) {
    case TOOLTIP_DIRECTION.TOP:
      top = wrapperR.top - tooltipR.height - GAP;
      left = wrapperR.left + wrapperR.width / 2 - tooltipR.width / 2;
      break;
    case TOOLTIP_DIRECTION.BOTTOM:
      top = wrapperR.bottom + GAP;
      left = wrapperR.left + wrapperR.width / 2 - tooltipR.width / 2;
      break;
    case TOOLTIP_DIRECTION.LEFT:
      top = wrapperR.top + wrapperR.height / 2 - tooltipR.height / 2;
      left = wrapperR.left - tooltipR.width - GAP;
      break;
    case TOOLTIP_DIRECTION.RIGHT:
      top = wrapperR.top + wrapperR.height / 2 - tooltipR.height / 2;
      left = wrapperR.right + GAP;
      break;
  }
  return { top, left };
};


type TooltipProps = {
  children:   ReactNode
  content:    ReactNode
  direction?: TooltipDirection
  delay?:     number
};


export default function Tooltip({
  children,
  content,
  direction = TOOLTIP_DIRECTION.TOP,
  delay = DELAY,
}: TooltipProps) {
  const [isActive, setIsActive] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<{ top: string, left: string } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsActive(true);
    }, delay);
  };

  const hideTip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsActive(false);
    setTooltipStyle(null);
  };

  useEffect(() => {
    if (isActive && wrapperRef.current && tooltipRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const { top, left } = calculatePosition(wrapperRect, tooltipRect, direction);
      setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    }
  }, [isActive, direction]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
    >
      {children}
      {isActive
      && ReactDOM.createPortal(
        <div ref={tooltipRef} className={`${styles.tip} ${styles[direction]}`} style={tooltipStyle || { visibility: 'hidden' }}>
          {content}
        </div>,
        document.body,
      )}
    </div>
  );
}
