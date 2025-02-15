import React from 'react';
import './style.scss';
import MantaRay from '../images/Matt_Manta_White.png';

export default function LoadingScreen() {
  return (
    <div className="screenDiv">
      <div className="containerMain">
        <img src={MantaRay} className="mantaLogo"></img>

        <div className="logoDiv">Scuba SEAsons</div>
      </div>
    </div>
  );
}
