import React, { useState } from 'react';
import SiteSubmitterView from './view';
import { useContext } from 'react';
import '../../modals/confirmationModal.css';
import { insertDiveSiteWaits } from '../../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { Form } from './form';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import { MapContext } from '../../googleMap/mapContext';

type SiteSubmitterProps = Partial<ModalHandleProps>;

export default function SiteSubmitter(props: SiteSubmitterProps) {
  const { profile } = useContext(UserProfileContext);
  const [deviceLocation, setDeviceLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const { setMapConfig, draggablePoint, setDraggablePoint } = useContext(MapContext);

  const { modalPause } = useContext(ModalContext);

  const getDeviceLocation = () => {
    setDraggablePoint(null);
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          alert('Please allow location access.');
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
              console.log('location permissions denied', error.message);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
          );
        }
      });
    } else {
      alert('Geolocation is not supported in your browser.');
    }
  };

  const onNavigate = () => {
    setDeviceLocation(null);
    setMapConfig(1);
    modalPause();
  };

  const onSubmit = (data: Form) => {
    insertDiveSiteWaits({
      Site:      data.Site,
      Latitude:  data.Latitude,
      Longitude: data.Longitude,
      UserID:    profile && profile.UserID,
    });
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
