// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import DynamicSelect from './index';
import { StoryObj } from '@storybook/react';

const options = [
  { key: '1', label: 'aa' }, { key: '2', label: 'bb' }, { key: '3', label: 'cc' },
];
const meta = {
  title:      'Components/Reusables/DynamicSelect',
  component:  DynamicSelect,
  tags:       ['autodocs'],
  args:       { name: 'test', onChange: (value) => { console.log(value); } },
  decorators: [
    Story => (
      <div style={{ height: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DynamicSelect>;


export const Select: Story = {
  args: {
    getMoreOptions: (search, limit, skip) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ options });
        }, 1000);
      });
    },
  },
};

export const SelectReturnsZeroMatches: Story = {
  args: {
    allowCreate:      true,
    modeSelectedTags: 'on',
    getMoreOptions:   (search, limit, skip) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ options: [] });
        }, 1000);
      });
    },
  },
};
