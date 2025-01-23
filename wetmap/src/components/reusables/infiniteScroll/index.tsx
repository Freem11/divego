import React, { useState, ReactNode } from 'react';
import './style.scss';
import Container from './components/container';

const defaultProps = {
  hasMore:       false,
  renderLoading: () => {
    return <div>Loading...</div>;
  },
  renderEmpty: () => {
    return <div></div>;
  },
};

type InfiniteScrollProps = Partial<typeof defaultProps> & {
  loadMore:   (page: number) => void
  className?: string
  children?:  ReactNode
  isLoading?: boolean
};

const InfiniteScroll = (_props: InfiniteScrollProps) => {
  const props = { ...defaultProps, ..._props };
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    const newPage = page + 1;
    await props.loadMore(newPage);
    setPage(newPage);
  };

  if (React.Children.count(props.children) === 0) {
    return props.renderEmpty();
  }

  return (
    <Container
      loadMore={loadMore}
      hasMore={props.hasMore}
      isLoading={props.isLoading}
      className={props.className}
    >
      {props.children}

      {props.isLoading && props.renderLoading()}
    </Container>
  );
};

export default InfiniteScroll;
