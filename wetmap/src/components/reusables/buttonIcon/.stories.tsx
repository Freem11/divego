// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ButtonIcon from './index';
import Icon from '../../../icons/Icon';


const meta: Meta<typeof ButtonIcon> = {
  title:      'Components/Reusables/ButtonIcon',
  component:  ButtonIcon,
  tags:       ['autodocs'],
  args:       { },
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const CameraButton: Story = {
  args: {
    icon:    <Icon name="camera-plus" />,
    onClick: () => console.log('clicked'),
  },
};
