import React from 'react';

type SelectedTagProps = {
  deselctItem: () => void
  label:       string
};

export default function SelectedTag(props: SelectedTagProps) {
  return (
    <div className="ssrc-select_selected-tag">
      <span>{props.label}</span>
      <button
        aria-label={`remove ${props.label}`}
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
