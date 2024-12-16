import React, { useContext } from 'react';
import Button from '../../../reusables/button';
import { SliderContext } from '../../../reusables/slider/context';

/* KSB copies */
import blackManta from "../../../../images/blackManta.png";
import WavyBlock from "../../../reusables/wavyBlock";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import carouselData from "./carousel-data.json";
import carouselData from "../carousel-data.json"
import ButtonIcon from "../../../reusables/buttonIcon";
import googleIcon from "../../../../images/google-color.png";
import facebookIcon from "../../../../images/facebook-color.png";
import appleIcon from "../../../../images/apple.png";
import "./index.css"

export default function AuthnticationStep1() {
  const { slideForward, slideBackward } = useContext(SliderContext);

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
        <Button className="btn-lg" onClick={slideBackward}>{carouselData[1].buttonTwoText}</Button>
      </div>

      <Box sx={{ height: 96 }} />

      <Typography variant="h6">{carouselData[1].content}</Typography>

      <div className="socialSignUps">
        <ButtonIcon
          icon={<img src={googleIcon} alt="Google" />}
          className="google-icon"
        />
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
  )
};
