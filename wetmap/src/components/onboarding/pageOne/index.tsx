import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import style from '../style.module.scss';
import { useTranslation } from 'react-i18next';

export default function PageOne() {
  const { slideForward } = useContext(SliderContext);
  const { t } = useTranslation();

  return (
    <div className="py-10 flex-column-between flex-centered full-height">
      <div className="col-10">
        <h1>{t('OnBoarding.PageOne.title')}</h1>
        <p>{t('OnBoarding.PageOne.content')}</p>
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="col-6">
        <Button onClick={slideForward} className="btn-lg">
          {t('OnBoarding.PageOne.buttonOneText')}
        </Button>
      </div>
    </div>
  );
};
