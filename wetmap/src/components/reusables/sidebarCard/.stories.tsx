// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SidebarCard from './index';


const meta: Meta<typeof SidebarCard> = {
  title:      'Components/Reusables/SidebarCard',
  component:  SidebarCard,
  tags:       ['autodocs'],
  args:       {},
  decorators: [
    Story => (
      <div style={{ width: '400px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarCard>;


export const DiveSite: Story = {
  args: {
    title:  'Octopus Garden',
    info:   'Hard',
    rating: 4.8,
  },
};

export const SeaLife: Story = {
  args: {
    title:  'Giant Electric Ray',
    info:   '18 Sightings',
  },
};

export const SeaLifeHighlighted: Story = {
  args: {
    title:       'Giant Electric Ray',
    info:        '18 Sightings',
    highlighted: true,
  },
};

export const DiveCenter: Story = {
  args: {
    title:  'International Diving Center',
    info:   '3 Trips',
    rating: 4.8,
  },
};
