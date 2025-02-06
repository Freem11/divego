import React, { useId } from 'react';
import './style.scss';

type LabelProps = {
  className?: string
  children?:  React.ReactElement
  label?:     React.ReactNode
};

export default function Label(props: LabelProps) {
  const id = useId();
  return (
    <div className={`ssrc-label ${props.className ?? ''}`}>
      <label htmlFor={id} className="label-text">{props.label}</label>
      <div className="label-control">
        { props.children && React.cloneElement(props.children, { id: id }) }
      </div>
    </div>

  );
};
