import React from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import WavyBlock from '../wavyBlock';
import ButtonIcon from '../buttonIcon';
import { useImageLoader } from '../blurryImage/useImageLoader';

export type WavyModalHeaderProps = {
  onClose?:  (event?: React.MouseEvent) => void
  children?: React.ReactNode
  image?:    string | null
};

export default function WavyModalHeader(props: WavyModalHeaderProps) {
  const { isLoading, validImage } = useImageLoader(props.image);

  return (
    <div
      className={`${style.wavyModalHeader} ${isLoading ? style.loading : ''}`}
      style={{ backgroundImage: validImage ? `url(${validImage})` : 'none' }}
    >
      <div className={style.buttonBack}>
        {props.onClose && (
          <ButtonIcon
            icon={<Icon name="chevron-left" />}
            className="btn-lg"
            onClick={e => props.onClose && props.onClose(e)}
          />
        )}
      </div>

      {props.children}

      <WavyBlock />
    </div>
  );
}
