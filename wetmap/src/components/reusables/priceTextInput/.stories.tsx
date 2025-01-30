// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import PriceTextInput from './index';


const meta: Meta<typeof PriceTextInput> = {
  title:      'Components/Reusables/PriceTextInput',
  component:  PriceTextInput,
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
type Story = StoryObj<typeof PriceTextInput>;


export const Input: Story = {
  args: {
  },
};

export const InputWithValue: Story = {
  args: {
    value: '$250',
  },
};
