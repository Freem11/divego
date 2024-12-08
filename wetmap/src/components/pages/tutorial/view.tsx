import React from 'react';

import style from './style.module.scss';
import TutorialStep1 from './step1';
import TutorialStep2 from './step2';
import TutorialStep3 from './step3';
import Slider from '../../reusables/slider';


export default function TutorialPageView() {
  return (
    <div className={style.container}>
      <div className={style.centerPage}>
        <Slider
          startIndex={1}
          slides={[
            <TutorialStep1 key="step1" />,
            <TutorialStep2 key="step2" />,
            <TutorialStep3 key="step3" />,
          ]}
        />
      </div>
    </div>
  );
};
