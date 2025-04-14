import React, { useContext } from 'react';
import Button from '../../reusables/button';
import Emilio from '../../../images/EmilioNew.png';
import style from '../style.module.scss';
import { ModalContext } from '../../reusables/modal/context';
import { useTranslation } from 'react-i18next';

export default function PageFour() {
  const { modalSuccess } = useContext(ModalContext);
  const { t } = useTranslation();
  return (
    <div className="py-10 flex-column-between flex-centered full-height">
      <div className="col-10">
        <h1>{t('OnBoarding.PageFour.title')}</h1>
        <p>{t('OnBoarding.PageFour.content')}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="col-6">
        <Button onClick={modalSuccess} className="btn-lg">
          {t('OnBoarding.PageFour.buttonOneText')}
        </Button>
      </div>
    </div>

  );
};
