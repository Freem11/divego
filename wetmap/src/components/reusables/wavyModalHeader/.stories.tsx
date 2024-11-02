// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import { fn } from '@storybook/test';

import WavyModalHeader from './index';

const meta = {
  title:      'Components/Reusables/WavyModalHeader',
  component:  WavyModalHeader,
  tags:       ['autodocs'],
  args:       { onClose: fn(), image: 'https://picsum.photos/200/300' },
};

export default meta;


export const Option1 = {
  decorators: [
    Story => (
      <div style={{ width: '300px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Option2 = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
