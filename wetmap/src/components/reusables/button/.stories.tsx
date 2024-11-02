// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import Button from './index';
import Icon from '../../../icons/Icon';

const meta = {
  title:      'Components/Reusables/Button',
  component:  Button,
  tags:       ['autodocs'],
  args:       { children: 'Button' },
};

export default meta;

export const ButtonsWithIcons = {
  render: args => (
    <div className="d-flex">
      <div className="col-3 mx-4">
        <Button {...args} iconRight={<Icon name="close" />} iconLeft={<Icon name="close" />} />
      </div>
      <div className="col-3 mx-4">
        <Button {...args} iconRight={<Icon name="close" />} />
      </div>
      <div className="col-3 mx-4">
        <Button {...args} iconLeft={<Icon name="close" />} />
      </div>
      <div className="col-3 mx-4">
        <Button {...args} />
      </div>
    </div>
  ),
};

export const ButtonsWidthContentAware = {
  render: args => (
    <div className="d-flex">
      <div className="mx-4" style={{ display: 'content' }}>
        <Button>short</Button>
      </div>
      <div className="mx-4" style={{ display: 'content' }}>
        <Button>Pretty long label that should probably wrap</Button>
      </div>
      <div className="mx-4" style={{ display: 'content' }}>
        <Button iconLeft={<Icon name="close" />}>Pretty long label with icon</Button>
      </div>
      <div className="mx-4" style={{ display: 'content' }}>
        <Button></Button>
      </div>
    </div>
  ),
};
