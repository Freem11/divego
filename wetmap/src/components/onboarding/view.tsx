import React from 'react';
import style from './style.module.scss';
import Slider from '../reusables/slider';
import PageOne from './pageOne';
import PageTwo from './pageTwo';
import PageThree from './pageThree';
import PageFour from './pageFour';

type OnboardingModalProps = {
  onClose?: () => void
};

export default function OnBoardingView(props: OnboardingModalProps) {
  return (
    <div className={style.container}>
      <div className={style.centerPage}>
        <Slider
          startIndex={0}
          showArrows={false}
          slides={[
            <PageOne key="step1"/>,
            <PageTwo key="step2"/>,
            <PageThree key="step3"/>,
            <PageFour key="step4" onClose={props.onClose}/>
          ]}
        />
      </div>
    </div>
  );
};
