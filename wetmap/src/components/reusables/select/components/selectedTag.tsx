import React from 'react';

type SelectedTagProps = {
  deselctItem: () => void
  label:       string
};

export default function SelectedTag(props: SelectedTagProps) {
  return (
    <div className="selected-tag">
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
