import React, { Dispatch, SetStateAction } from 'react';
import Button from '../../reusables/button';
import blackManta from '../../../images/blackManta.png';
import googleIcon from '../../../images/google-color.png';
import facebookIcon from '../../../images/facebook-color.png';
import appleIcon from '../../../images/apple.png';
import ButtonIcon from '../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import { ActiveProfile } from '../../../entities/profile';
import WavyBlock from '../../reusables/wavyBlock';

type LandingPageProps = {
  goToSlide:           (pageNumber: number) => void
  setProfile:          Dispatch<SetStateAction<ActiveProfile | null>>
  REDIRECT_URI:        string
  googleClientId:      string
  getGoogleUserData:   (token: any) => void
  facebookAppId:       string
  getFacebookUserData: (token: any) => void
  appleAppId:          string
  handleAppleUserData: (token: any) => void
};

export default function LandingPageView(props: LandingPageProps) {
  return (
    <div>
      <div className="authenticationPage">
        <div
          className="wrapper-wavy-block"
          style={{ backgroundImage: `url(${blackManta})` }}
        >
          <WavyBlock />
        </div>

        <div className="mt-6">
          <h1 className="text-clip">{carouselData.LandingPage.title}</h1>

          <div className="buttonsContainer mt-10">
            <Button
              className="btn-primary btn-lg"
              onClick={() => props.goToSlide(2)}
            >
              {carouselData.LandingPage.buttonOneText}
            </Button>
            <Button className="btn-lg" onClick={() => props.goToSlide(0)}>
              {carouselData.LandingPage.buttonTwoText}
            </Button>
          </div>

          <p style={{ marginTop: '15%' }}>{carouselData.LandingPage.content}</p>

          <div className="socialSignUps">

            <ButtonIcon
              icon={<img src={googleIcon} alt="Google" onClick={props.getGoogleUserData} />}
              className="google-icon"
            />

            <ButtonIcon
              icon={<img src={facebookIcon} alt="Facebook" onClick={props.getFacebookUserData} />}
              className="social-icons"
            />

            <ButtonIcon
              icon={<img src={appleIcon} alt="Apple" onClick={props.handleAppleUserData} />}
              className="social-icons"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
