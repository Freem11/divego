// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Component from './index';

const loadMore = async (page: number) => {
  return await getPhotosInBoundaries(boundaries, {}, new Pagination(page, 'asc', ipp));
};

const meta: Meta<typeof Component> = {
  title:      'Components/Reusables/InfiniteScroll',
  component:  Component,
  tags:       ['autodocs'],
  args:       { loadMore },
  decorators: [
    Story => (
      <div style={{ height: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const SingleSelect: Story = {
  args: {
  },
};
