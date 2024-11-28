import React, { useId } from 'react';
import './style.scss';

type LabelProps = {
  className?: string
  children?:  React.ReactElement
  label?:     React.ReactNode
};

const Label = (props: LabelProps) => {
  const id = useId();
  return (
    <label htmlFor={id} className={`ssrc-label ${props.className ?? ''}`}>
      <div className="label-text">{props.label}</div>
      <div className="label-control">
        { props.children && React.cloneElement(props.children, { id: id }) }
      </div>
    </label>
  );
};

export default Label;
