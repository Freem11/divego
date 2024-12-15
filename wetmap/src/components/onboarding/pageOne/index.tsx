import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from './style.module.scss';
export default function PageOne() {
  const { slideForward } = useContext(SliderContext);

  function rotate(arg0: number, deg: any): import("csstype").Property.Transform | undefined {
    throw new Error('Function not implemented.');
  }

  return (

    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column'}}>
      
      <div style={{width: "80%", marginTop: '5%'}}>
        <h1 style={{color: 'white'}}>{CarrouselData.PageOne.title}</h1>
        </div>
        <div style={{width: "60%", marginRight: '30%', marginBottom: '-15%'}}>
        <p style={{color: 'white'}}>{CarrouselData.PageOne.content}</p>
        </div>
        <img src={Emilio} height='400vh' className={style.emilio}/>

      <div style={{width: "50%", position: 'fixed', bottom: 40}}>
          <Button onClick={slideForward} className="btn-lg">
            {CarrouselData.PageOne.buttonOneText}
          </Button>
      </div>

     
    </div>


  );
};
