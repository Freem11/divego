import React, { useState, useContext } from 'react';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import TripCreatorView from './view';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';

type TripCreatorModalProps = Partial<ModalHandleProps>;

export default function TripCreatorModal({ onModalCancel }: TripCreatorModalProps) {
  const { selectedShop } = useContext(SelectedShopContext);
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);


  const onSubmit = (data: Form) => {
    console.log(data, data.Start);
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={onModalCancel}
          onSubmit={onSubmit}
          isEditModeOn={isEditModeOn}
        />
      )}
    </>
  );
}
