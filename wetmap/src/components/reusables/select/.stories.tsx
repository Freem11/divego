// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from './index';
import Icon from '../../../icons/Icon';

const options = [
  { key: '1', label: 'aa' }, { key: '2', label: 'bb' }, { key: '3', label: 'cc' }, { key: '4', label: 'dd' }, { key: '5', label: 'ee' },
  { key: '6', label: 'ff' }, { key: '7', label: 'gg' }, { key: '8', label: 'hh' }, { key: '9', label: 'ii' }, { key: '10', label: 'jj' },
];
const meta: Meta<typeof Select> = {
  title:      'Components/Reusables/Select',
  component:  Select,
  tags:       ['autodocs'],
  args:       { options, onChange: (value) => { console.log(value); }, name: 'my-test-select' },
  decorators: [
    Story => (
      <div style={{ height: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;


export const SingleSelect: Story = {
  args: {
    maxSelectedOptions: 1,
  },
};

export const MultiSelectWithMaxThreeOptionsAllowed: Story = {
  args: {
    maxSelectedOptions: Infinity,
  },
};


export const SelectWithoutSelectArrow: Story = {
  args: {
    selectArrowIcon: false,
  },
};

export const SelectWithCustomSelectArrow: Story = {
  args: {
    selectArrowIcon: <Icon name="anchor" />,
  },
};
