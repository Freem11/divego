import React, { ReactNode, useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  children:          ReactNode
  loadingIndicator?: ReactNode
  loadMore?:         () => Promise<any>
  hasMore?:          boolean
  loading?:          boolean
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
      if (props.loading) {
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
  }, [props.hasMore, props.loading]);


  return (
    <div className={`${props.className ?? ''} ssrc-infinite-scroll`} ref={wrapperRef}>
      {props.children}
      <div ref={targetRef}></div>
    </div>
  );
}
