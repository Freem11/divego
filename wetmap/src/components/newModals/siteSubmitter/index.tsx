import React, { useState } from 'react';
import SiteSubmitterView from './view';
import { useContext } from 'react';
import { insertDiveSiteWaits } from '../../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { Form } from './form';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import { MapContext } from '../../googleMap/mapContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type SiteSubmitterProps = Partial<ModalHandleProps>;

export default function SiteSubmitter(props: SiteSubmitterProps) {
  const { profile } = useContext(UserProfileContext);
  const { t } = useTranslation();
  const [deviceLocation, setDeviceLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const { setMapConfig, draggablePoint, setDraggablePoint } = useContext(MapContext);

  const { modalPause } = useContext(ModalContext);

  const getDeviceLocation = () => {
    setDraggablePoint(null);
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          toast.error(t('DiveSiteAdd.allowLocation'));
          window.location.href = 'app-settings:location';
        } else {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              setDeviceLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            function (error) {
              console.log('Location permissions denied', error.message);
              toast.error(t('DiveSiteAdd.allowLocation'));
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
          );
        }
      });
    } else {
      toast.error(t('DiveSiteAdd.locationNotSupported'));
    }
  };

  const onNavigate = () => {
    setDeviceLocation(null);
    setMapConfig(1);
    modalPause();
  };

  const onSubmit = async (formData: Form) => {
    const { error } = await insertDiveSiteWaits({
      Site:      formData.Site,
      Latitude:  formData.Latitude,
      Longitude: formData.Longitude,
      UserID:    profile && profile.UserID,
    });

    if (error) {
      toast.error(t('DiveSiteAdd.addSiteError'));
    } else {
      toast.success(t('DiveSiteAdd.addSiteSuccess'));
    }
    onClose();
  };

  const onClose = () => {
    setDraggablePoint(null);
    props?.onModalCancel?.();
  };

  return (
    <SiteSubmitterView
      getDeviceLocation={getDeviceLocation}
      onNavigate={onNavigate}
      onClose={onClose}
      onSubmit={onSubmit}
      values={{
        Latitude:  draggablePoint ? draggablePoint?.lat : deviceLocation?.lat,
        Longitude: draggablePoint ? draggablePoint?.lng : deviceLocation?.lng,
      }}
    />
  );
}
