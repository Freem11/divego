import React from 'react';
import { DropdownItemProps } from '../../../reusables/select/components/dropdownItem';
import Icon from '../../../../icons/Icon';

const getIconName = (type: string) => {
  switch (type) {
    case 'place':
      return 'compass-outline';
    case 'diveSite':
      return 'anchor';
    default:
      return null;
  }
};

export default function MainSearchDropdownItem(props: DropdownItemProps) {
  const iconName = getIconName(props?.option?.data?.type);
  return (
    <li>
      <button
        onClick={() => props.onSelect(props.option.key)}
        role="option"
        type="button"
      >
        {iconName && <Icon height={25} name={iconName} className="mr-1" />}
        {props.option.label}
      </button>
    </li>
  );
}
