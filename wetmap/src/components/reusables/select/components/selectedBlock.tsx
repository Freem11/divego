import React, { ReactNode } from 'react';

type SelectedBlockProps = {
  deselctItem: () => void
  label:       string
};

export default function SelectedBlock(props: SelectedBlockProps) {
  return (
    <div>
      <span className="rsz__selected-text">{props.label}</span>
      <button
        aria-label={`remove ${props.label}`}
        className="rsz__selected-action"
        onClick={props.deselctItem}
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
