import React from 'react';
import { Option } from '..';

export type DropdownItemProps = {
  option:   Option
  selected: boolean
  onSelect: (key: string) => void
};

export default function DropdownItem(props: DropdownItemProps) {
  return (
    <li>
      <button
        aria-selected={props.selected}
        onClick={() => props.onSelect(props.option.key)}
        role="option"
        type="button"
      >
        {props.option.label}
      </button>
    </li>
  );
}
