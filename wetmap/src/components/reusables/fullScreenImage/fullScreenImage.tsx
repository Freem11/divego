import React from 'react';
import style from './fullScreenImage.module.scss';
import ButtonIcon from '../buttonIcon';
import Icon from '../../../icons/Icon';
import { ModalHandleProps } from '../modal/types';

type FullScreenImageViewProps = {
  src:           string
};

const FullScreenImage = (props: FullScreenImageViewProps & Partial<ModalHandleProps>) => {
  return (
    <>
      <div
        className={style.container}
        onClick={props.onModalCancel}
      >
        <img
          src={props.src}
          className={style.image}
          onClick={e => e.stopPropagation()}
        />
        <div className={style.close}>
          <ButtonIcon
            icon={<Icon name="close" style={{ scale: '1.5' }} />}
            onClick={props.onModalCancel}
          />
        </div>
      </div>
    </>
  );
};

export default FullScreenImage;
