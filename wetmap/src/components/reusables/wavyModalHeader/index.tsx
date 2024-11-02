import React from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import WavyBlock from '../wavyBlock';
import ButtonIcon from '../buttonIcon';

export type WavyModalHeaderProps = {
  onClose?: (event?: React.MouseEvent) => void
  children: React.ReactNode
  image:    string
};

export default function WavyModalHeader(props: WavyModalHeaderProps) {
  return (
    <div className={style.wavyModalHeader} style={{ backgroundImage: `url(${props.image})` }}>
      <div className={style.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className="btn-lg"
          onClick={(e) => {
            if (props.onClose) {
              props.onClose(e);
            }
          }}
        />
      </div>

      {props.children}

      <WavyBlock />
    </div>
  );
}
