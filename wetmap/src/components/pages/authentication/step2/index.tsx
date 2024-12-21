import React, { useContext, useState } from "react";
import Button from "../../../reusables/button";

import { SessionContext } from "../../../contexts/sessionContext";
import { SliderContext } from "../../../reusables/slider/context";
import {
  register,
  signInStandard,
} from "../../../../supabaseCalls/authenticateSupabaseCalls";

import { createProfile } from "../../../../supabaseCalls/accountSupabaseCalls";

/* KSB copies */
import blackManta from "../../../../images/blackManta.png";
import WavyBlock from "../../../reusables/wavyBlock";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import carouselData from "./carousel-data.json";
import carouselData from "../carousel-data.json";
import ButtonIcon from "../../../reusables/buttonIcon";
import googleIcon from "../../../../images/google-color.png";
import facebookIcon from "../../../../images/facebook-color.png";
import appleIcon from "../../../../images/apple.png";
import "./index.css";
import { LoginSocialGoogle } from "reactjs-social-login";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
const appleAppId = import.meta.env.VITE_APPLE_APP_ID;
const REDIRECT_URI = window.location.href;

export default function AuthnticationStep1() {
  const { slideForward, slideBackward } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);
  const [profile, setProfile] = useState(null);
  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState(null);

  async function getGoogleUserData(token) {
    if (!token) return;

    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      handleOAuthSubmit(user);
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleOAuthSubmit = async (user) => {
    let Fname;
    let LName;
    let Pword = user.id;
    let MailE = user.email;

    if (user.given_name) {
      if (user.family_name) {
        Fname = user.given_name;
        LName = user.family_name;
      } else {
        Fname = user.given_name.split(" ").slice(0, -1).join(" ");
        LName = user.given_name.split(" ").slice(-1)[0];
      }
    } else if (user.name) {
      Fname = user.name.split(" ").slice(0, 1);
      LName = user.name.split(" ").slice(-1);
    }

    let accessToken = await OAuthSignIn({
      password: Pword,
      email: MailE,
      firstName: Fname,
      lastName: LName,
    });
  };

  async function OAuthSignIn(formVals) {
    let accessToken = await signInStandard(formVals);
    if (accessToken.data.session !== null) {
      await localStorage.setItem(
        "token",
        JSON.stringify(accessToken.data.session.refresh_token)
      );
      setActiveSession(accessToken.data.session);
      return;
    } else {
      let registrationToken = await register(formVals);

      if (registrationToken) {
        await createProfile({
          id: registrationToken.data.session.user.id,
          email: registrationToken.data.user.email,
        });
      }

      if (registrationToken.data.session !== null) {
        await localStorage.setItem(
          "token",
          JSON.stringify(registrationToken.data.session.refresh_token)
        );
        setActiveSession(registrationToken.data.session);
      } else {
        setLoginFail("You already have an account with this email");
      }
    }
  }

  return (
    <>
      <div className="authenticationPage">
        <div
          className="wrapper-wavy-block"
          style={{ backgroundImage: `url(${blackManta})` }}
        >
          <WavyBlock />
        </div>
        <Box sx={{ height: 16 }} />
        <Typography variant="h3" align="left" sx={{ ml: 9 }}>
          {carouselData[1].title}
        </Typography>

        <Box sx={{ height: 62 }} />

        <div className="buttonsContainer">
          <Button
            className="btn-primary btn-lg"
            // onClick={() => <SignInRoute setValue={setValue} />}
            onClick={slideForward}
          >
            {carouselData[1].buttonOneText}
          </Button>
          <Button className="btn-lg" onClick={slideBackward}>
            {carouselData[1].buttonTwoText}
          </Button>
        </div>

        <Box sx={{ height: 96 }} />

        <Typography variant="h6">{carouselData[1].content}</Typography>

        <div className="socialSignUps">
          <LoginSocialGoogle
            isOnlyGetToken
            scope="https://www.googleapis.com/auth/userinfo.email"
            client_id={googleClientId || ""}
            onResolve={({ provider, data }) => {
              setProfile(data);
              getGoogleUserData(data.access_token);
              console.log("google", data);
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

          <ButtonIcon
            icon={<img src={facebookIcon} alt="Facebook" />}
            className="social-icons"
          />
          <ButtonIcon
            icon={<img src={appleIcon} alt="Apple" />}
            className="social-icons"
          />
        </div>
      </div>
    </>
  );
}
