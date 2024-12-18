import React, { useContext } from 'react';
import Button from '../../reusables/button';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';
import { ModalContext } from '../../reusables/modal/context';

export default function PageFour() {
  const { modalSuccess } = useContext(ModalContext);

  return (
    <div className="py-10 flex-column-between flex-centered full-height">
      <div className="col-10 mt-10">
        <h1>{CarrouselData.PageFour.title}</h1>
        <p>{CarrouselData.PageFour.content}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="col-6">
        <Button onClick={modalSuccess} className="btn-lg">
          {CarrouselData.PageFour.buttonOneText}
        </Button>
      </div>
    </div>

  );
};
