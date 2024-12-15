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
      navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
        if (permissionStatus.state === 'denied') {
          alert('Please allow location access.');
          window.location.href = "app-settings:location";
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
    getLocation()
    slideForward()
  }
  
  return (

    <div className={style.pageContainer}>

    <div className={style.topContainer}>
      <div className={style.titleContainer}>
        <h1 style={{color: 'white'}}>{CarrouselData.PageThree.title}</h1>
      </div>

      <div className={style.contentContainer}>
        <p style={{color: 'white'}}>{CarrouselData.PageThree.content}</p>
      </div>
    </div>
    
    <img src={Emilio} height='400vh' className={style.emilio}/>

      <div className={style.buttonDoubleContainer}>
          <Button onClick={grantPermissions} className="btn-lg">
            {CarrouselData.PageThree.buttonOneText}
          </Button>
          <div style={{width: '10%'}}></div>
          <Button onClick={slideForward} className="btn-lg btn-primary">
            {CarrouselData.PageThree.buttonTwoText}
          </Button>
      </div>
    </div>
  );
};
