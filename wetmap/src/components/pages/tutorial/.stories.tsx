// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TutorialPageView from './view';


const meta: Meta<typeof TutorialPageView> = {
  title:      'Components/Pages/Tutorial',
  component:  TutorialPageView,
  tags:       ['autodocs'],
  args:       {  },
  decorators: [
    Story => (
      <div style={{ height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TutorialPageView>;


export const Tutorial: Story = {
  args: {
  },
};
