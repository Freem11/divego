import React, { useState, useContext } from 'react';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorView from './view';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { Form } from './form';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';
import { toast } from 'react-toastify';
import { FieldErrors } from 'react-hook-form';
import { insertItinerary, insertItineraryRequest } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { ModalContext } from '../../reusables/modal/context';
import screenData from '../screenData.json';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { EditModeContext } from '../../contexts/editModeContext';

type TripCreatorModalProps = Partial<ModalHandleProps> & {
  itineraryInfo?:  ItineraryItem
};

export default function TripCreatorModal({ isEditModeOn1,  onModalCancel, itineraryInfo, registerModalCancelCallback }: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const { modalCancel } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const [diveSitesError, setDiveSitesError] = useState<boolean>(false);
  const [isEditModeOn, setIsEditModeOn] = useState(isEditModeOn1);

  registerModalCancelCallback?.(() => {
    if (sitesArray.length > 0) {
      setSitesArray([]);
    }
  });

  const diveSitesSubmitError = () => {
    toast.error(screenData.TripCreator.noSitesError);
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

    if (isEditModeOn) {
      const { error } = await insertItineraryRequest(trip, 'Edit');

      if (error) {
        toast.error(screenData.TripCreator.editTripError);
      } else {
        toast.success(screenData.TripCreator.editTripSuccess);
        modalCancel();
        setSitesArray([]);
      }
    } else {
      const { error } = await insertItinerary(trip);

      if (error) {
        toast.error(screenData.TripCreator.submitError);
      } else {
        toast.success(screenData.TripCreator.submitSuccess);
        modalCancel();
        setSitesArray([]);
      }
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
          setIsEditModeOn={setIsEditModeOn}
          diveSitesError={diveSitesError}
          values={{
            Name:    itineraryInfo?.tripName,
            Link:    isEditModeOn ? itineraryInfo?.BookingPage : '',
            Price:   isEditModeOn ? itineraryInfo?.price : '',
            Start:   isEditModeOn ? itineraryInfo?.startDate : '',
            End:     isEditModeOn ? itineraryInfo?.endDate : '',
            Details: isEditModeOn ? itineraryInfo?.description : '',
          }}
        />
      )}
    </>
  );
}
