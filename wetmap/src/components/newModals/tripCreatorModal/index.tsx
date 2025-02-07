import React, { useState, useContext, useEffect } from 'react';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorView from './view';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { Form } from './form';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';
import { toast } from 'react-toastify';
import { FieldErrors } from 'react-hook-form';
import { insertItinerary } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { ModalContext } from '../../reusables/modal/context';
import screenData from '../screenData.json';
import { ItineraryItem } from '../../../entities/itineraryItem';

type TripCreatorModalProps = Partial<ModalHandleProps> & {
  itineraryInfo?:  ItineraryItem
  isEditModeOn:    boolean
  setIsEditModeOn: React.Dispatch<React.SetStateAction<boolean>>
};

export default function TripCreatorModal({ onModalCancel, itineraryInfo, isEditModeOn, setIsEditModeOn }: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const { modalCancel } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const [diveSitesError, setDiveSitesError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setSitesArray([]); // Clear dive sites array
    };
  }, []);

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

    const trip = {
      shopID:      selectedShop?.id,
      tripName:    formData.Name,
      startDate:   formData.Start,
      endDate:     formData.End,
      price:       formData.Price,
      description: formData.Details,
      siteList:    sitesArray,
      BookingPage: formData.Link,
    };

    const { error } = await insertItinerary(trip);

    if (error) {
      toast.error(screenData.TripCreator.submitError); // Error toast
    } else {
      toast.success(screenData.TripCreator.submitSuccess); // Success toast
      modalCancel(); // Close modal
      setSitesArray([]); // Clear dive sites array
    }
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
