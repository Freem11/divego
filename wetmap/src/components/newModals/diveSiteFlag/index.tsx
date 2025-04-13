import DiveSiteFlagView from './view';
import React, { useState } from 'react';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { ModalHandleProps } from '../../reusables/modal/types';

type DiveSiteFlagProps = Partial<ModalHandleProps> & {
  diveSite: DiveSiteWithUserName | null
};

export default function DiveSiteFlag(props: DiveSiteFlagProps) {
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <DiveSiteFlagView
      onClose={onClose}
      diveSite={props.diveSite}
      selectedReason={selectedReason}
      setSelectedReason={setSelectedReason}
    />
  );
}
