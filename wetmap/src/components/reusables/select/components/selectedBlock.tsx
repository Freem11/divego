import React, { ReactNode } from 'react';

type SelectedBlockProps = {
  deselctItem: () => void
  label:       string
};

export default function SelectedBlock(props: SelectedBlockProps) {
  return (
    <div className="selected-block">
      <span>{props.label}</span>
      <button
        aria-label={`remove ${props.label}`}
        className="action"
        onClick={(e) => {
          e.stopPropagation();
          props.deselctItem();
        }}
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
