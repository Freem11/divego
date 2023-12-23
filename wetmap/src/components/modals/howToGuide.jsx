import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { Iterrator3Context } from "../contexts/iterrator3Context";
import { TutorialModelContext } from "../contexts/tutorialModalContext";
import { SecondTutorialModalContext } from "../contexts/secondTutorialModalContext";
import { ThirdTutorialModalContext } from "../contexts/thirdTutorialModalContext";
import CloseIcon from "@mui/icons-material/Close";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import "./howToGuide.css";

const HowToGuide = (props) => {
  const { itterator, setItterator } = useContext(IterratorContext);
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { animateLaunchModal, animateIntroGuideModal, animateSecondGuideModal, animateThirdGuideModal } = props;
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { guideModal, setGuideModal } = useContext(TutorialModelContext);
  const { secondGuideModal, setSecondGuideModal } = useContext(
    SecondTutorialModalContext
  );
  const { thirdGuideModal, setThirdGuideModal } = useContext(
    ThirdTutorialModalContext
  );

  const handleTutorialStartup = () => {
    setItterator(0)
    setTutorialRunning(true);
    animateIntroGuideModal()
    animateLaunchModal()
    setGuideModal(!guideModal);
  };

  const handleSecondTutorialStartup = () => {
    setItterator2(0)
    setTutorialRunning(true);
    animateSecondGuideModal()
    animateLaunchModal()
    setSecondGuideModal(!secondGuideModal);
  };

  const handleThirdTutorialStartup = () => {
    setItterator2(0)
    setTutorialRunning(true);
    animateThirdGuideModal()
    animateLaunchModal()
    setThirdGuideModal(!thirdGuideModal);
  };

  return (
    <div className="masterDiv">
      <div className="topRead">
        <div className="titleDiv">
          <h3 style={{ marginTop: 3, marginRight: 45, width: "200%", fontFamily: "Patrick Hand", fontSize: 32}}>How to use Scuba SEAsons</h3>
          <FormGroup>
            <Button
              variant="text"
              id="closeButton2"
              onClick={() => animateLaunchModal()}
              style={{ display: "flex", flexDirection: "column", marginRight: 20, marginTop: 10, backgroundColor: "transparent", border: "none"}}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
          </FormGroup>
        </div>

        <div className="mainBlurbDiv">
     
        <div onClick={handleTutorialStartup} className="introGuideLaunch">
          <Label
            style={{
              fontFamily: "Itim",
              fontWeight: "bold",
              color: "gold",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            Intro Guide
          </Label>
        </div>

        <div onClick={handleSecondTutorialStartup} className="diveSiteGuideLaunch">
          <Label
            style={{
              fontFamily: "Itim",
              fontWeight: "bold",
              color: "gold",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            Fun With Dive Sites
          </Label>
        </div>

        <div onClick={handleThirdTutorialStartup} className="photoGuideLaunch">
          <Label
            style={{
              fontFamily: "Itim",
              fontWeight: "bold",
              color: "gold",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            Photogenics
          </Label>
        </div>

        </div>
      </div>

    </div>
  );
};

export default HowToGuide;
