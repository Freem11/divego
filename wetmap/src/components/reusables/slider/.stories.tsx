// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Slider from './index';
const style: React.CSSProperties = { height: '100%', textAlign: 'center', fontSize: '3em', color: 'white' };
const slides = [
  <div style={{ ...style, backgroundColor: 'red' }}   key={1}>1</div>,
  <div style={{ ...style, backgroundColor: 'blue' }}  key={2}>2</div>,
  <div style={{ ...style, backgroundColor: 'green' }} key={3}>3</div>,
];

const meta: Meta<typeof Slider> = {
  title:      'Components/Reusables/Slider',
  component:  Slider,
  tags:       ['autodocs'],
  args:       { slides },
  decorators: [
    Story => (
      <div style={{ height: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;


export const SimpleSlider: Story = {
  args: {
  },
};

export const SliderWithoutArrows: Story = {
  args: {
    showArrows: false,
  },
};
export const SliderStartsFromSecond: Story = {
  args: {
    startIndex: 1,
  },
};

export const SliderInNarrowContainer: Story = {
  decorators: [
    Story => (
      <div style={{ width: '250px', height: '250px' }}>
        <Story />
      </div>
    ),
  ],
};
