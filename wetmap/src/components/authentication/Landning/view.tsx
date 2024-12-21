import React, { Dispatch, SetStateAction } from 'react';
// import style from './style.module.scss';
import Button from '../../reusables/button';
import blackManta from '../../../../images/blackManta.png';
import googleIcon from '../../../../images/google-color.png';
import facebookIcon from '../../../../images/facebook-color.png';
import appleIcon from '../../../../images/apple.png';
import ButtonIcon from '../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import { LoginSocialApple, LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
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
            <LoginSocialGoogle
              isOnlyGetToken
              scope="https://www.googleapis.com/auth/userinfo.email"
              client_id={props.googleClientId || ''}
              onResolve={({ data }) => {
                if (data) {
                  props.getGoogleUserData(data?.access_token);
                }
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <ButtonIcon
                icon={<img src={googleIcon} alt="Google" />}
                className="google-icon"
              />
            </LoginSocialGoogle>

            <LoginSocialFacebook
              isOnlyGetToken
              appId={props.facebookAppId || ''}
              state={false}
              onResolve={({ data }) => {
                props.getFacebookUserData(data?.accessToken);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <ButtonIcon
                icon={<img src={facebookIcon} alt="Facebook" />}
                className="social-icons"
              />
            </LoginSocialFacebook>

            <LoginSocialApple
              client_id={props.appleAppId || '1'}
              scope="name email"
              redirect_uri={props.REDIRECT_URI}
              onResolve={({ data }) => {
                console.log('apple', data);
                props.handleAppleUserData(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <ButtonIcon
                icon={<img src={appleIcon} alt="Apple" />}
                className="social-icons"
              />
            </LoginSocialApple>
          </div>
        </div>
      </div>
    </div>
  );
};
