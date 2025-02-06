import React, { useState, useContext } from 'react';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorView from './view';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { Form } from './form';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';
import { toast } from 'react-toastify';
import { FieldErrors } from 'react-hook-form';

type TripCreatorModalProps = Partial<ModalHandleProps>;

export default function TripCreatorModal({ onModalCancel }: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const { sitesArray } = useContext(SitesArrayContext);

  const isEditModeOn = false;

  const [diveSitesError, setDiveSitesError] = useState<boolean>(false);

  const diveSitesSubmitError = () => {
    toast.error('Dive sites is required');
    setDiveSitesError(true);
  };

  const handleError = (errors: FieldErrors<Form>) => {
    toast.dismiss();
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
    if (sitesArray.length === 0) {
      diveSitesSubmitError();
    }
  };

  const onSubmit = async (formData: Form) => {
    // Validate dive site selector inputs
    if (sitesArray.length === 0) {
      diveSitesSubmitError();
      return;
    }

    const trip: any = formData;
    trip.siteList = sitesArray;
    trip.shopID = selectedShop?.id;
    console.log(trip);
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={onModalCancel}
          onSubmit={onSubmit}
          handleError={handleError}
          isEditModeOn={isEditModeOn}
          diveSitesError={diveSitesError}
        />
      )}
    </>
  );
}
