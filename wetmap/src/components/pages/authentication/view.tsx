import React from 'react';

import style from './style.module.scss';
import AuthnticationStep1 from './step1';
import AuthnticationStep2 from './step2';
import AuthnticationStep3 from './step3';
import Slider from '../../reusables/slider';


export default function AuthnticationPageView() {
  return (
    <div className={style.container}>
      <div className={style.centerPage}>
        <Slider
          startIndex={1}
          showArrows={false}
          slides={[
            <AuthnticationStep1 key="step1" />,
            <AuthnticationStep2 key="step2" />,
            <AuthnticationStep3 key="step3" />,
          ]}
        />
      </div>
    </div>
  );
};
