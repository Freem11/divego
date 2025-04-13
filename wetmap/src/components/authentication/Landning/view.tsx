import React from 'react';
import Button from '../../reusables/button';
import blackManta from '../../../images/blackManta.png';
import googleIcon from '../../../images/google-color.png';
import appleIcon from '../../../images/apple.png';
import ButtonIcon from '../../reusables/buttonIcon';
import WavyBlock from '../../reusables/wavyBlock';
import style from './style.module.scss';
import { useTranslation } from 'react-i18next';
// import facebookIcon from '../../../images/facebook-color.png';

type LandingPageProps = {
  goToSlide:    (pageNumber: number) => void
  socialSignIn: (provider: any) => void
};

export default function LandingPageView(props: LandingPageProps) {
  const { t } = useTranslation();
  return (
    <div className="flex-column-between full-height">
      <div>
        <div className={style.wavyHeader} style={{ backgroundImage: `url(${blackManta})` }}>
          <WavyBlock />
        </div>

        <h1 className="ml-10 text-clip text-left">{t('LandingPage.title')}</h1>

        <div className="flex-centered">
          <div className="col-6">
            <Button className="btn-primary btn-lg" onClick={() => props.goToSlide(2)}>
              {t('LandingPage.buttonOneText')}
            </Button>
            <Button className="btn-lg mt-4" onClick={() => props.goToSlide(0)}>
              {t('LandingPage.buttonTwoText')}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 text-center">{t('LandingPage.content')}</div>
        <div className="flex-centered">
          <div className="col-3 flex-row-between" style={{ height: '3.5rem' }}>
            <ButtonIcon
              icon={<img src={googleIcon} alt="Google" onClick={() => props.socialSignIn('google')} />}
              className="full-height"
            />
            {/* <ButtonIcon
              icon={<img src={facebookIcon} alt="Facebook" onClick={() => props.socialSignIn('facebook')} />}
              className="full-height"
            /> */}
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
