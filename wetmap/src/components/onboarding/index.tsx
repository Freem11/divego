import React from 'react';
import OnBoardingView from './view';
import { ModalHandleProps } from '../reusables/modal/types';

type ModalProps = Partial<ModalHandleProps>;

export default function OnBoardingCarrousel(props: ModalProps) {
  return <OnBoardingView onClose={props.onModalCancel}/>;
};
