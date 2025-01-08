// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import Component from './view';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  title:      'Components/Modals/PasswordUpdate',
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

export const Wider: Story = {
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const Narrower: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '900px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndNarrow: Story = {
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShortAndWide: Story = {
  decorators: [
    Story => (
      <div style={{ width: '800px', height: '500px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};
