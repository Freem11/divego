// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import PicUploaderView from './view';

const meta = {
  title:      'Components/Modals/PicUploader',
  component:  PicUploaderView,
  tags:       ['autodocs'],

  args:       {  },
};

export default meta;

export const Primary = {
  decorators: [
    Story => (
      <div style={{ width: '600px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};
export const Secondary = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};
