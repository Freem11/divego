import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import style from '../style.module.scss';
import { useTranslation } from 'react-i18next';

export default function PageThree() {
  const { slideForward } = useContext(SliderContext);
  const { t } = useTranslation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          alert(t('OnBoarding.PageThree.allowLocation'));
          window.location.href = 'app-settings:location';
        } else {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              alert(t('OnBoarding.PageThree.locationGranted'));
            },
            function (error) {
              console.log('location permissions denied', error.message);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
          );
        }
      });
    } else {
      alert(t('OnBoarding.PageThree.locationNotSupported'));
    }
  }

  const grantPermissions = () => {
    getLocation();
    slideForward();
  };

  return (

    <div className="py-10 flex-column-between flex-centered full-height">

      <div className="col-10">
        <h1>{t('OnBoarding.PageThree.title')}</h1>
        <p>{t('OnBoarding.PageThree.content')}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="d-flex col-12">
        <Button onClick={slideForward} className="btn-lg btn-primary mr-6">
          {t('OnBoarding.PageThree.buttonTwoText')}
        </Button>
        <Button onClick={grantPermissions} className="btn-lg">
          {t('OnBoarding.PageThree.buttonOneText')}
        </Button>
      </div>
    </div>
  );
};
