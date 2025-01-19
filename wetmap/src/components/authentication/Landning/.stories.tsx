// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Component from './view';


const meta: Meta<typeof Component> = {
  title:      'Components/Modals/Auth/Landing',
  component:  Component,
  tags:       ['autodocs'],
  args:       { },
};

export default meta;
type Story = StoryObj<typeof Component>;


export const Primary: Story = {
  decorators: [
    Story => (
      <div style={{ width: '500px', height: '650px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};


export const LongAndNarrow: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '1200px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const LongAndWide: Story = {
  decorators: [
    Story => (
      <div style={{ width: '900px', height: '1200px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndNarrow: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '400px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndWide: Story = {
  decorators: [
    Story => (
      <div style={{ width: '900px', height: '400px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};
