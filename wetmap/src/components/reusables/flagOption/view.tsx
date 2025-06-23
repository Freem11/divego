import React from 'react';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../buttonIcon';
import style from './style.module.scss';

type FlagOptionViewProps = {
  title:              string
  index:              number
  isExpanded:         boolean
  handleOptionSelect: (id: number) => void
  height:             number
  contentRef:         React.RefObject<HTMLDivElement>
  children:           React.ReactNode | React.ReactNode[]
};

export default function FlagOptionView(props: FlagOptionViewProps) {
  const { index, title, isExpanded, handleOptionSelect, height, contentRef, children } = props;

  return (
    <div className={style.masterBox} key={index}>
      <div className={style.grayOutline}>
        <h5 className="ml-8 mb-0 text-bold text-dark">{title}</h5>
        <ButtonIcon
          type="button"
          icon={<Icon name="chevron-right" />}
          className={`btn text-gray ml-4 my-2 ${style.buttonBack} ${
            isExpanded ? style.expanded : style.collapsed
          }`}
          onClick={() => handleOptionSelect(index)}
        />
      </div>
      <div
        className={style.extraBox}
        style={{ height }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}
