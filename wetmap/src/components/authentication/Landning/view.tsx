import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Button from '../../reusables/button';
import blackManta from '../../../images/blackManta.png';
import googleIcon from '../../../images/google-color.png';
import facebookIcon from '../../../images/facebook-color.png';
import appleIcon from '../../../images/apple.png';
import ButtonIcon from '../../reusables/buttonIcon';
import screenData from '../../newModals/screenData.json';
import { ActiveProfile } from '../../../entities/profile';
import WavyBlock from '../../reusables/wavyBlock';
import { detectOS } from '../../reusables/_helpers/detectOs';
import style from './style.module.scss';

type LandingPageProps = {
  goToSlide:    (pageNumber: number) => void
  setProfile:   Dispatch<SetStateAction<ActiveProfile | null>>
  socialSignIn: (provider: any) => void
};

export default function LandingPageView(props: LandingPageProps) {
  useEffect(() => {
    const OS = detectOS();
    console.log(OS);
  });

  return (
    <div className="flex-column-between full-height">
      <div>
        <div className={style.wavyHeader} style={{ backgroundImage: `url(${blackManta})` }}>
          <WavyBlock />
        </div>

        <h1 className="ml-10 text-clip text-left">{screenData.LandingPage.title}</h1>

        <div className="flex-centered">
          <div className="col-6">
            <Button className="btn-primary btn-lg" onClick={() => props.goToSlide(2)}>
              {screenData.LandingPage.buttonOneText}
            </Button>
            <Button className="btn-lg mt-4" onClick={() => props.goToSlide(0)}>
              {screenData.LandingPage.buttonTwoText}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2">{screenData.LandingPage.content}</div>
        <div className="flex-centered">
          <div className="col-6 flex-row-between" style={{ height: '3.5rem' }}>
            <ButtonIcon
              icon={<img src={googleIcon} alt="Google" onClick={() => props.socialSignIn('google')} />}
              className="full-height"
            />
            <ButtonIcon
              icon={<img src={facebookIcon} alt="Facebook" onClick={() => props.socialSignIn('facebook')} />}
              className="full-height"
            />
            <ButtonIcon
              icon={<img src={appleIcon} alt="Apple" onClick={() => props.socialSignIn('apple')} />}
              className="full-height"
            />
          </div>
        </div>
      </div>

      <div>{/* empty block to make 'flex-column-between' add some space */}</div>
    </div>
  );
};
