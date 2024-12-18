import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';

export default function PageThree() {
  const { slideForward } = useContext(SliderContext);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          alert('Please allow location access.');
          window.location.href = 'app-settings:location';
        } else {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              alert('Location Permission was Granted.');
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
  }

  const grantPermissions = () => {
    getLocation();
    slideForward();
  };

  return (

    <div className="py-10 flex-column-between flex-centered full-height">

      <div className="col-10 mt-10">
        <h1>{CarrouselData.PageThree.title}</h1>
        <p>{CarrouselData.PageThree.content}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="d-flex col-12">
        <Button onClick={slideForward} className="btn-lg btn-primary mr-6">
          {CarrouselData.PageThree.buttonTwoText}
        </Button>
        <Button onClick={grantPermissions} className="btn-lg">
          {CarrouselData.PageThree.buttonOneText}
        </Button>
      </div>
    </div>
  );
};
