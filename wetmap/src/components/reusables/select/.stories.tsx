// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import { fn } from '@storybook/test';

import Select from './index';
import { on } from 'events';

const options = [
  { key: '1', label: 'aa' }, { key: '2', label: 'bb' }, { key: '3', label: 'cc' },
];
const meta = {
  title:      'Components/Reusables/Select',
  component:  Select,
  tags:       ['autodocs'],
  args:       { options, onChange: (value) => { console.log(value); } },
};

export default meta;


export const SingleSelect = {
  render: args => (
    <div style={{ width: '300px', height: '400px' }}>
      <Select name="test" {...args} maxSelectedOptions={1} />
    </div>
  ),
};

export const MultiSelect = {
  render: args => (
    <div style={{ width: '300px', height: '400px' }}>
      <Select name="test" {...args} maxSelectedOptions={3} labelInValue={true} />
    </div>
  ),
};

{ /* export const Option1 = {
  decorators: [
    Story => (
      <div style={{ width: '300px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
}; */ }
