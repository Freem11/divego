// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Component from './index';


const meta: Meta<typeof Component> = {
  title:      'Components/Reusables/PriceTextInput',
  component:  Component,
  tags:       ['autodocs'],
  args:       { },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Component>;


export const Input: Story = {
  args: {
  },
};

export const InputWithValue: Story = {
  args: {
    value: 'Lorem ipsum',
  },
};
