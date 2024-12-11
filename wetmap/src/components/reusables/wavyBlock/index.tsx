import React from 'react';
import style from './style.module.scss';

export type WavyBlockProps = {
  children?: React.ReactNode
};

export default function WavyBlock(props: WavyBlockProps) {
  return (
    <div className={style.wavyBlock}>

      {props.children}

      <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#ffffff"
          d="M0,10 Q25,0 50,10 Q75,20 100,10 L100,20 L0,20 Z"
        />
      </svg>
    </div>
  );
}
