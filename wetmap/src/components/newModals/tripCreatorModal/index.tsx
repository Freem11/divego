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
import { ItineraryItem } from '../../../entities/itineraryItem';
import { useTranslation } from 'react-i18next';

type TripCreatorModalProps = Partial<ModalHandleProps> & {
  itineraryInfo?: ItineraryItem
  isEditModeOn:   boolean
};

export default function TripCreatorModal(props: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const { modalCancel } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const [diveSitesError, setDiveSitesError] = useState<boolean>(false);
  const [isEditModeOn, setIsEditModeOn] = useState(props.isEditModeOn);
  const { t } = useTranslation();

  props.registerModalCancelCallback?.(() => {
    if (sitesArray.length > 0) {
      setSitesArray([]);
    }
  });

  const diveSitesSubmitError = () => {
    toast.error(t('TripCreator.noSitesError'));
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
      shopID:              selectedShop?.id,
      tripName:            formData.Name,
      startDate:           formData.Start,
      endDate:             formData.End,
      price:               formData.Price,
      description:         formData.Details,
      siteList:            sitesArray,
      BookingPage:         formData.Link,
    };

    if (props.itineraryInfo) {
      Object.assign(trip, { OriginalItineraryID: props.itineraryInfo?.id });
    }

    if (isEditModeOn) {
      const { error } = await insertItineraryRequest(trip, 'Edit');

      if (error) {
        toast.error(t('TripCreator.editTripError'));
      } else {
        toast.success(t('TripCreator.editTripSuccess'));
        modalCancel();
        setSitesArray([]);
      }
    } else {
      const { error } = await insertItinerary(trip);

      if (error) {
        toast.error(t('TripCreator.submitError'));
      } else {
        toast.success(t('TripCreator.submitSuccess'));
        modalCancel();
        setSitesArray([]);
      }
    }
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={props.onModalCancel}
          onSubmit={onSubmit}
          handleError={handleError}
          isEditModeOn={isEditModeOn}
          setIsEditModeOn={setIsEditModeOn}
          diveSitesError={diveSitesError}
          values={{
            Name:    props.itineraryInfo?.tripName,
            Link:    props.itineraryInfo?.BookingPage,
            Price:   props.itineraryInfo?.price,
            Start:   props.itineraryInfo?.startDate,
            End:     props.itineraryInfo?.endDate,
            Details: props.itineraryInfo?.description,
          }}
        />
      )}
    </>
  );
}
