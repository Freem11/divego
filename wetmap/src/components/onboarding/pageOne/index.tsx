import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';

export default function PageOne() {
  const { slideForward } = useContext(SliderContext);

  return (
    <div className="py-10 flex-column-between flex-centered full-height">
      <div className="col-10 mt-10">
        <h1>{CarrouselData.PageOne.title}</h1>
        <p>{CarrouselData.PageOne.content}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="col-6">
        <Button onClick={slideForward} className="btn-lg">
          {CarrouselData.PageOne.buttonOneText}
        </Button>
      </div>
    </div>
  );
};
