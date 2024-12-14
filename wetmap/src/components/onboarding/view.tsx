import React from 'react';
import style from './style.module.scss';
import Slider from '../reusables/slider';
import PageOne from './pageOne';

export default function OnBoardingView() {
  return (
    <div className={style.container}>
      <div className={style.centerPage}>
        <Slider
          startIndex={1}
          showArrows={false}
          slides={[
            <PageOne key="step1"/>,
            <PageOne key="step2"/>,
            <PageOne key="step3"/>
          ]}
        />
      </div>
    </div>
  );
};
