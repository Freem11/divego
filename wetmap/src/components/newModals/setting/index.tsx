
import { ModalHandleProps } from '../../reusables/modal/types';
import SettingsView from './view';
import React from 'react';

type SettingsProps = Partial<ModalHandleProps>;

export default function Settings(props: SettingsProps) {
  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <SettingsView
      onClose={onClose}
    />
  );
}
