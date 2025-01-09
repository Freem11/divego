import React from 'react';
import { ModalHandleProps } from '../../reusables/modal/types';
import GuidesModalView from './view';

type GuidesModalProps = Partial<ModalHandleProps>;

export default function GuidesModal({ onModalCancel }: GuidesModalProps) {
  const onClose = () => {
    onModalCancel?.();
  };

  return <GuidesModalView onClose={onClose} />;
}
