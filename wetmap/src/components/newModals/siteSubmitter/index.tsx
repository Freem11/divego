import React from 'react';
import SiteSubmitterView from './view';
import { useContext } from 'react';
import '../../modals/confirmationModal.css';
import { insertDiveSiteWaits } from '../../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { DiveSpotContext } from '../../contexts/diveSpotContext';
import { MapConfigContext } from '../../contexts/mapConfigContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { Form } from './form';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';

type SiteSubmitterProps = Partial<ModalHandleProps>;

export default function SiteSubmitter(props: SiteSubmitterProps) {
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { profile } = useContext(UserProfileContext);

  const { setMapConfig } = useContext(MapConfigContext);

  const { modalPause } = useContext(ModalContext);

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          toast.error(screenData.DiveSiteAdd.allowLocation);
          window.location.href = 'app-settings:location';
        } else {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              setAddSiteVals({
                ...addSiteVals,
                Latitude:  position.coords.latitude,
                Longitude: position.coords.longitude,
              });
            },
            function (error) {
              console.log('Location permissions denied', error.message);
              toast.error(screenData.DiveSiteAdd.allowLocation);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
          );
        }
      });
    } else {
      toast.error(screenData.DiveSiteAdd.locationNotSupported);
    }
  };

  const onNavigate = () => {
    setMapConfig(1);
    modalPause();
  };

  const onSubmit = async (formData: Form) => {
    const { error, data } = await insertDiveSiteWaits({
      Site:      formData.Site,
      Latitude:  formData.Latitude,
      Longitude: formData.Longitude,
      UserID:    profile && profile.UserID,
    });
    onClose();
    if (error) {
      toast.error(screenData.DiveSiteAdd.addSiteError);
    }
    if (data) {
      toast.success(screenData.DiveSiteAdd.addSiteSuccess);
    }
  };

  const onClose = () => {
    setAddSiteVals({ ...addSiteVals, Site: '', Latitude: 0, Longitude: 0 });
    props?.onModalCancel?.();
  };


  return (
    <SiteSubmitterView
      getDeviceLocation={getDeviceLocation}
      onNavigate={onNavigate}
      onClose={onClose}
      onSubmit={onSubmit}
      values={{
        Latitude:  addSiteVals?.Latitude,
        Longitude: addSiteVals?.Longitude,
      }}
    />
  );
}
