import React, { ReactNode, useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  children:          ReactNode
  loadingIndicator?: ReactNode
  loadMore?:         () => Promise<any>
  hasMore?:          boolean
  isLoading?:        boolean
  className?:        string
};


export default function Container(props: InfiniteScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const callback = function (entries: IntersectionObserverEntry[]) {
      const entry = entries[0];
      if (props.hasMore === false) {
        return;
      }
      if (props.isLoading) {
        return;
      }
      if (!entry.isIntersecting) {
        return;
      }

      if (props.loadMore && typeof props.loadMore === 'function') {
        props.loadMore();
      }
    };

    const observer = new IntersectionObserver(callback, {
      root:       wrapperRef.current,
      rootMargin: '0px',
      threshold:  1.0,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [props.hasMore, props.isLoading]);


  return (
    <div className={`ssrc-infinite-scroll ${props.className ?? ''} scrollable ${props.isLoading ? 'ssrc-infinite-scroll--loading' : ''}`} ref={wrapperRef}>
      {props.children}
      <div ref={targetRef}></div>
    </div>
  );
}
