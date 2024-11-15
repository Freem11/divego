import React from 'react';
import { Values } from '..';

export type DropdownProps = {
  options:             Values
  children:            React.ReactNode
  searchText:          string
  shouldDisplayCreate: boolean
  createItem:          (label: string) => void
};

export default function Dropdown(props: DropdownProps) {
  console.log('Render dropdown');
  return (
    <div className="dropdown">

      <ul className="option-list">

        {props.children}

        {props.options.size > 0 && (
          <span className="no-results">
            {`No results for "${props.searchText}"`}
          </span>
        )}

        {props.shouldDisplayCreate && (
          <li className="rsz__option">
            <button
              className="create"
              onClick={() => props.createItem(props.searchText || '')}
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
