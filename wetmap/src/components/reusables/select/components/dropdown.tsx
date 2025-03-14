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
    <div className="ssrc-select_dropdown">

      <ul className="ssrc-select_option-list">

        {props.children}

        {props.shouldDisplayCreate && (
          <li>
            <button
              className="ssrc-select_create"
              onClick={() => props.createItem(props.searchText)}
              type="button"
            >
              Create
              {' '}
              <span className="ssrc-select_search-term">{props.searchText}</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
