import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
  goToSlide:    (pageNumber: number) => void
  setProfile:   Dispatch<SetStateAction<ActiveProfile | null>>
  socialSignIn: (provider: any) => void
};

const detectOS = (): string => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Check for Android
  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // Check for iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS';
  }

  // Check for Windows
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  // Check for macOS
  if (/Macintosh/.test(userAgent)) {
    return 'macOS';
  }

  // Check for Windows
  if (/Win/.test(userAgent)) {
    return 'Windows';
  }

  // Check for Linux
  if (/Linux/.test(userAgent)) {
    return 'Linux';
  }

  // Default to "Unknown"
  return 'Unknown';
};


export default function LandingPageView(props: LandingPageProps) {
  useEffect(() => {
    const OS = detectOS();
    console.log(OS);
  });

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
              icon={<img src={googleIcon} alt="Google" onClick={() => props.socialSignIn('google')} />}
              className="google-icon"
            />

            <ButtonIcon
              icon={<img src={facebookIcon} alt="Facebook" onClick={() => props.socialSignIn('facebook')} />}
              className="social-icons"
            />

            <ButtonIcon
              icon={<img src={appleIcon} alt="Apple" onClick={() => props.socialSignIn('apple')} />}
              className="social-icons"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
