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

export const MultiSelectWithoutLimit: Story = {
  args: {
    maxSelectedOptions: Infinity,
  },
};

export const SelectWithLongPlaceholder: Story = {
  args: {
    placeholder: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloremque ipsa debitis reprehenderit repudiandae fugiat.',
  },
};


export const SelectWithoutSelectArrow: Story = {
  args: {
    iconSelectArrow: false,
  },
};

export const SelectWithCustomSelectArrow: Story = {
  args: {
    iconSelectArrow: <Icon name="anchor" />,
  },
};

export const SelectWithCustomDropdown: Story = {
  args: {
    dropdownComponent: props => (
      <div className="dropdown" style={{ border: '1px solid red' }}>
        Custom dropdown has red border
        <ul className="option-list">
          {props.children}
        </ul>
      </div>
    ),
  },
};

export const SelectWithCustomDropdownItem: Story = {
  args: {
    dropdownItemComponent: props => (
      <li>
        Some text before each option
        {' '}
        {props.option.label}
      </li>
    ),
  },
};
export const SelectWithManySelectedItems: Story = {
  args: {
    value:              options,
    maxSelectedOptions: Infinity,
    iconLeft:           <Icon name="anchor" />,
  },
};
