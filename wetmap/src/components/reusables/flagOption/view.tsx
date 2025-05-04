import React from 'react';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../buttonIcon';
import style from './style.module.scss';

type FlagOptionViewProps = {
  title:                  string
  index:                  number
  isActive:               boolean
  startMoreInfoAnimation: (id: number) => void
  height:                 number
  contentRef:             React.RefObject<HTMLDivElement>
  children:               React.ReactNode | React.ReactNode[]
};

export default function FlagOptionView(props: FlagOptionViewProps) {
  return (
    <div className={style.masterBox} key={props.index}>
      <div className={style.grayOutline}>
        <h5 className="ml-8 mb-0 text-bold text-dark">{props.title}</h5>
        <ButtonIcon
          icon={<Icon name="chevron-right" />}
          className={`btn text-gray ml-4 my-2 ${style.buttonBack} ${
            props.isActive ? style.active : style.inactive
          }`}
          onClick={() => props.startMoreInfoAnimation(props.index)}
        />
      </div>
      <div
        className={style.extraBox}
        style={{ height: props.height }}
        ref={props.contentRef}
      >
        {props.children}
      </div>
    </div>
  );
}
