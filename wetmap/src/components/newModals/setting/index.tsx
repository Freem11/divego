
import SettingsView from './view';
import React from 'react';

export default function Settings(props) {
  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <SettingsView
      onClose={onClose}
    />
  );
}
