import React from 'react';
import { ModalHandleProps } from '../../reusables/modal/types';
import ShopSubmitterView from './view';

type ShopSubmitterProps = Partial<ModalHandleProps>;

export default function ShopSubmitter({ onModalCancel }: ShopSubmitterProps) {
  const onClose = () => {
    onModalCancel?.();
  };

  return <ShopSubmitterView onClose={onClose} />;
}
