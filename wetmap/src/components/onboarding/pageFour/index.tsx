import React from 'react';
import Button from '../../reusables/button';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';

type PageFourProps = {
  onClose?: () => void
};

export default function PageFour(props: PageFourProps) {

  return (

    <div className={style.pageContainer}>

    <div className={style.topContainer}>
      <div className={style.titleContainer}>
        <h1 style={{color: 'white'}}>{CarrouselData.PageFour.title}</h1>
      </div>

      <div className={style.contentContainer}>
        <p style={{color: 'white'}}>{CarrouselData.PageFour.content}</p>
      </div>
    </div>
    
    <img src={Emilio} height='400vh' className={style.emilio}/>

      <div className={style.buttonContainer}>
          <Button onClick={props.onClose} className="btn-lg">
            {CarrouselData.PageFour.buttonOneText}
          </Button>
      </div>
    </div>
  );
};
