import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ItineraryItem } from '../../../entities/itineraryItem';
import TripCreatorView from './view';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';
import { EditModeContext } from '../../contexts/editModeContext';

type TripCreatorProps = Partial<ModalHandleProps>;

export default function TripCreatorModal(props: TripCreatorProps) {
  const { selectedShop } = useContext(SelectedShopContext);

  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const { editMode } = useContext(EditModeContext);
  const [thePrice, setThePrice] = useState('');

  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

  const getItineraries = async (IdNum: number) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins && itins.length > 0) {
        setItineraryList(itins);
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

  const onSubmit = (data: Form) => {
    console.log(data, data.Start);
  };

  const priceChange = (data: any) => {
    const num = data.target.value;

    const regex1 = /^\d+(\.\d{1,2})?$/; // price without money symbol
    const regex2 = /^\$\d+(\.\d{1,2})?$/; // price with money symbol

    if (regex1.test(num.toString())) {
      const result = '$' + num.toString();
      console.log(result);
      setThePrice(result);
    }

    if (regex2.test(num.toString())) {
      const num2 = num.replace(/[^0-9.]/g, '');
      const result = '$' + num2.toString();
      console.log(result);
      setThePrice(result);
    }
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={props.onModalCancel}
          onSubmit={onSubmit}
          editMode={editMode}
          priceChange={priceChange}
          values={{
            Price: thePrice,
          }}
        />
      )}
    </>
  );
}
