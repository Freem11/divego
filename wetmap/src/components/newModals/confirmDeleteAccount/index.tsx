import React, { useState, useContext, useEffect } from 'react';
import ConfirmDeleteAccountView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';

type DiveSiteProps = Partial<ModalHandleProps>;
export default function ConfirmDeleteAccount(props: DiveSiteProps) {
  return (
    <ConfirmDeleteAccountView />
  );
}
