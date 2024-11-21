import React from 'react';
import { Values } from '..';

export type DropdownProps = {
  options:             Values
  children:            React.ReactNode
  searchText:          string
  shouldDisplayCreate: boolean
  createItem:          (value: string) => void
};

export default function Dropdown(props: DropdownProps) {
  return (
    <div className="dropdown">

      <ul className="option-list">

        {props.children}

        {props.shouldDisplayCreate && (
          <li>
            <button
              className="create"
              onClick={() => props.createItem(props.searchText)}
              type="button"
            >
              Create
              {' '}
              <span className="search-term">{props.searchText}</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
