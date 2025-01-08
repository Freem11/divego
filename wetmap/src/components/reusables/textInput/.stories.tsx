// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Component from './index';
import Icon from '../../../icons/Icon';


const meta: Meta<typeof Component> = {
  title:      'Components/Reusables/TextInput',
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

export const InputEmptyWithError: Story = {
  args: {
    error: true,
  },
};

export const InputWithValue: Story = {
  args: {
    value: 'Lorem ipsum',
  },
};

export const InputWithValueAndError: Story = {
  args: {
    value: 'Lorem ipsum',
    error: true,
  },
};

export const InputWithLeftIcon: Story = {
  args: {
    iconLeft: <Icon name="lock-outline" />,
  },
};

export const InputWithLeftIconAndValue: Story = {
  args: {
    value:    'Lorem ipsum',
    iconLeft: <Icon name="explore" />,
  },
};

export const InputWithLeftIconAndValueAndError: Story = {
  args: {
    error:    true,
    value:    'Lorem ipsum',
    iconLeft: <Icon name="diving-snorkel" />,
  },
};
export const InputWithRightIcon: Story = {
  args: {
    iconRight: <Icon name="pencil" />,
  },
};

export const InputWithRightIconAndValue: Story = {
  args: {
    value:     'Lorem ipsum',
    iconRight: <Icon name="close" />,
  },
};

export const InputWithRightIconAndValueAndError: Story = {
  args: {
    error:     true,
    value:     'Lorem ipsum',
    iconRight: <Icon name="photo" />,
  },
};

export const InputWithBothIcons: Story = {
  args: {
    iconLeft:  <Icon name="my-location" />,
    iconRight: <Icon name="pencil" />,
  },
};

export const InputWithBothIconsAndValue: Story = {
  args: {
    value:     'Lorem ipsum',
    iconLeft:  <Icon name="remove" />,
    iconRight: <Icon name="close" />,
  },
};

export const InputWithBothIconsAndValueAndError: Story = {
  args: {
    error:     true,
    value:     'Lorem ipsum',
    iconLeft:  <Icon name="eye" />,
    iconRight: <Icon name="photo" />,
  },
};
