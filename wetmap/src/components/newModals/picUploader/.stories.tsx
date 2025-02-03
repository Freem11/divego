// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import Component from './view';
import { Meta, StoryObj } from '@storybook/react';
import blackManta from '../../../images/blackManta.png';


const meta: Meta<typeof Component> = {
  title:      'Components/Modals/PicUploader',
  component:  Component,
  tags:       ['autodocs'],
  args:       { onClose: () => {}, onSubmit: () => {} },
};

export default meta;
type Story = StoryObj<typeof Component>;


export const Primary: Story = {
  decorators: [
    Story => (
      <div style={{ width: '600px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const WiderEmpty: Story = {
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const WiderWithPic: Story = {
  args: {
    headerPictureUrl: blackManta,
  },
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const NarrowerEmpty: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const NarrowerWithPic: Story = {
  args: {
    headerPictureUrl: blackManta,
  },
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};


export const ShortAndNarrowEmpty: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndNarrowWithPic: Story = {
  args: {
    headerPictureUrl: blackManta,
  },
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndWideEmpty: Story = {
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndWideWithPic: Story = {
  args: {
    headerPictureUrl: blackManta,
  },
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};
