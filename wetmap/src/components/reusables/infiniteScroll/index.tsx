import React, { useState, ReactNode } from 'react';
import './style.scss';
import Container from './components/container';

const defaultProps = {
  ipp:           20 as number,
  page:          0 as number,
  renderLoading: () => {
    return <div>Loading...</div>;
  },
  renderEmpty:   () => {
    return <div>Infinite scroll is empty</div>;
  },
};

type InfiniteScrollProps = Partial<typeof defaultProps> & {
  loadMore:   (page: number) => Promise<any>
  renderItem: (item: any, index: number) => ReactNode
  className?: string
};

const InfiniteScroll = (_props: InfiniteScrollProps) => {
  const props = { ...defaultProps, ..._props };
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(props.page);

  const loadMore = async () => {
    setLoading(true);
    const newPage = page + 1;

    const items = await props.loadMore(newPage);

    setPage(newPage);
    setLoading(false);
    setHasMore(() => {
      if (!items) {
        return false;
      }
      if (items.length < props.ipp) {
        // no need to load more because there are no more items
        return false;
      }
      if (items.length > props.ipp) {
        // seems like there is no pagination - doesnt make sense to load more
        return false;
      }
      return true;
    });
    setItems((prev) => {
      if (!items) {
        return prev;
      } else if (prev === null) {
        return items;
      } else if (items) {
        return [...prev, ...items];
      } else {
        return prev;
      }
    });
  };


  return (
    <Container
      loadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      className={props.className}
    >
      {(page > 0) && items?.map((item, index) => {
        return props.renderItem(item, index);
      })}

      {!items?.length && !loading && props.renderEmpty()}

      {loading && props.renderLoading()}
    </Container>
  );
};

export default InfiniteScroll;
