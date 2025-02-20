import React from 'react';
import style from './style.module.css';
import MantaRay from '../images/Matt_Manta_White.png';

export default function LoadingScreen() {
  return (
    <div className={style.screenDiv}>
      <div className={style.containerMain}>
        <img src={MantaRay} className={style.mantaLogo}></img>

        <div className={style.logoDiv}>Scuba SEAsons</div>
      </div>
    </div>
  );
}
