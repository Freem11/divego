// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DiveSiteImageView from './view';

const pic = {
  id:           1,
  label:        'Test',
  UserName:     'Tester',
  photoFile:    'https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/1731590460950.jpg',
  commentcount: 0,
};

const meta: Meta<typeof DiveSiteImageView> = {
  title:      'Components/Modals/DiveSiteImage',
  component:  DiveSiteImageView,
  tags:       ['autodocs'],
  args:       { pic, countOfLikes: 0, picLiked: false },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DiveSiteImageView>;


export const Image: Story = {
};

export const ImageInNarrowContainer: Story = {
  decorators: [
    Story => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ImageWithSomeLikes: Story = {
  args: {
    countOfLikes: 10,
  },
};

export const ImageWithManyLikes: Story = {
  args: {
    countOfLikes: 123456,
  },
};

export const ImageAddedByNoName: Story = {
  args: {
    pic: {
      ...pic,
      UserName: '',
    },
  },
};

export const ImageAddedByLongName: Story = {
  args: {
    pic: {
      ...pic,
      UserName: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    },
  },
};
export const ImageAddedByLongNameAndManyLikes: Story = {
  args: {
    countOfLikes: 123456,
    pic:          {
      ...pic,
      UserName: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    },
  },
};

export const ImageTall: Story = {
  args: {
    pic:          {
      ...pic,
      photoFile: 'https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/1729620512318.jpg',
    },
  },
};
