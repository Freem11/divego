import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { debounce } from '../_helpers/debounce';


type InfiniteScrollProps = {
  children:          ReactNode
  loadingIndicator?: ReactNode
  loadMore?:         () => void
  hasMore?:          boolean
};

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);


  const handleScroll = () => {
    if (!ref.current) {
      return;
    }
    const content = ref.current.children[0];
    if (!content) {
      return;
    }

    if ((ref.current.scrollTop + ref.current.offsetHeight) > (ref.current.scrollHeight - 50)) {
      setLoading(true);

      if (props.loadMore && typeof props.loadMore === 'function') {
        props.loadMore();
      }
    }
  };

  useEffect(() => {
    ref.current?.addEventListener('scroll', debounce(handleScroll, 100));
    handleScroll();
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div ref={ref}>
      <div>
        {props.children}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
