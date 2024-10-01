import React, { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import "./secondTutorial.css";
import mantaIOS from "../../images/Manta32.png";
import seaLionGuy from "../../images/EmilioNeutral.png";
import { SecondTutorialModalContext } from "../contexts/secondTutorialModalContext";
import { ThirdTutorialModalContext } from "../contexts/thirdTutorialModalContext";
import { SessionContext } from "../contexts/sessionContext";
import { grabProfileById } from "../../supabaseCalls/accountSupabaseCalls";
import { UserProfileContext } from "../contexts/userProfileContext";
// import { MapRegionContext } from "../contexts/mapRegionContext";
// import { MapCenterContext } from "../contexts/mapCenterContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { Iterrator3Context } from "../contexts/iterrator3Context";
import { TutorialContext } from "../contexts/tutorialContext";
import { TutorialResetContext } from "../contexts/tutorialResetContext";
// import { DSAdderContext } from "../contexts/DSModalContext";
import { DiveSpotContext } from "../contexts/diveSpotContext";
import { ChapterContext } from "../contexts/chapterContext";
import { JumpContext } from "../contexts/jumpContext";
import { CoordsContext } from "../contexts/mapCoordsContext";
import { ZoomContext } from "../contexts/mapZoomContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SiteSubmitter from "../modals/siteSubmitter";
import { ModalContext } from "../contexts/modalContext";

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function SecondTutorial(props) {
  const {
    animateSecondGuideModal,
    setSecondGuideModalYCoord,
    setDsAddermodal,
    animateThirdGuideModal,
  } = props;

  window.addEventListener("resize", trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeigth, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);

  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { jump, setJump } = useContext(JumpContext);

  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { secondGuideModal, setSecondGuideModal } = useContext(
    SecondTutorialModalContext
  );
  const { thirdGuideModal, setThirdGuideModal } = useContext(
    ThirdTutorialModalContext
  );
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { chapter, setChapter } = useContext(ChapterContext);
  const { tutorialReset, setTutorialReset } = useContext(TutorialResetContext);
  const { modalShow } = useContext(ModalContext);
  // const { setMapCenter } = useContext(MapCenterContext);
  // const { setRegion } = useContext(MapRegionContext);

  // const { diveSiteAdderModal, setDiveSiteAdderModal } = useContext(
  //   DSAdderContext
  // );

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (tutorialReset) {
      setItterator2(null);
      // setDiveSiteAdderModal(false);
      setTutorialRunning(false);
      setSecondGuideModal(false);
      setTutorialReset(false);
      resetTutorial();
      setChapter(null);
    }
  }, [tutorialReset]);

  let modalHeigth = 700;

  useEffect(() => {
    let characterWidth = document.getElementsByClassName("character2")[0]
      .clientWidth;

    let textBoxHeight = document.getElementsByClassName("talkbox2")[0]
      .clientHeight;

    switch (chapter) {
      case "Checking for a dive site":
        resetTutorial();
        setItterator2(1);
        setSecondGuideModalYCoord(-windowHeigth);
        setSecondGuideModal(true);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        setDsSearchY(2 * windowHeigth + (windowHeigth - 100) / 3);
        break;

      case "Adding your dive sites":
        resetTutorial();
        setItterator2(8);
        setSecondGuideModalYCoord(-windowHeigth);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        setDiveSiteY(2 * windowHeigth + (windowHeigth - 100) / 3);
        break;

      case "DS Help":
        resetTutorial();
        setItterator2(10);
        setTutorialRunning(true);
        setDsAddermodal(true);
        setSecondGuideModalYCoord(-windowHeigth);
        modalShow(SiteSubmitter)
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        break;

      case "Placing the pin":
        resetTutorial();
        setItterator2(15);
        setDsAddermodal(true);
        setSecondGuideModalYCoord(-windowHeigth);
        modalShow(SiteSubmitter)
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        setLocationY(2 * windowHeigth + (windowHeigth - 100) / 3);
        break;

      case "Exit Guide":
        setDsAddermodal(false);
        setSecondGuideModalYCoord(0);
        handleClearTutorial();
        setTutorialRunning(false);

        break;
    }
    setChapter(null);
  }, [chapter]);

  const handleClearTutorial = async () => {
    let profileCheck = await getProfile();
    let bully;

    if (profile) {
      bully = profile[0].UserName;
    } else {
      bully = "";
    }

    if (bully == null || bully === "") {
      return;
    } else {
      setTutorialReset(true);
    }
  };

  const resetTutorial = async () => {
    setCharacterX(0);
    setTextBoxY(0);
    setDsSearchY(0);
    setDiveSiteY(0);
    setLocationY(0);
    setPinY(0);
    setMantaY(0);
    setNextTutY(0);
    setAddSiteVals({
      ...addSiteVals,
      Site: "",
      Latitude: "",
      Longitude: "",
    });
  };

  const getProfile = async () => {
    let sessionUserId = activeSession.user.id;
    // let sessionUserId = 'acdc4fb2-17e4-4b0b-b4a3-2a60fdfd97dd'
    try {
      const success = await grabProfileById(sessionUserId);
      if (success) {
        setProfile(success);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const handleThirdTutorialStartup = () => {
    setItterator2(null);
    setItterator3(0);
    setDsAddermodal(false);
    setTutorialRunning(true);
    animateSecondGuideModal();
    animateThirdGuideModal();
  };

  const characterRef = useRef(null);
  const textBoxRef = useRef(null);
  const dsSearchRef = useRef(null);
  const diveSiteRef = useRef(null);
  const locationRef = useRef(null);
  const pinRef = useRef(null);
  const mantaRef = useRef(null);
  const nextTutRef = useRef(null);

  const [characterX, setCharacterX] = useState(0);
  const [textBoxY, setTextBoxY] = useState(0);
  const [dsSearchY, setDsSearchY] = useState(0);
  const [diveSiteY, setDiveSiteY] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [mantaY, setMantaY] = useState(0);
  const [nextTutY, setNextTutY] = useState(0);

  const text0 =
    "Hey welcome back! Now that you have a Diver Name, I can show you how you can contribute to Scuba SEAsons!";
  const text1 =
    "First, let's look at working with Dive sites, let's move to a spot with known dive sites";
  const text2 =
    "Now that the map is positioned, let's check for a dive site by clicking on the dive site search tool option, it looks like this";
  const text3 = "";
  const text4 =
    "Now that the options are open, it will show you a list of dive sites in the area, try searching for 'Copper Cliffs' and select it, once you have found it";
  const text5 = "";
  const text6 =
    "Nice! As you can see when you selected the dive site, the map zoomed to it and put that yellow indicator over it to highlight it, this means the site is in the app and ready for you to add your sightings to it later!";
  const text7 =
    "Next, let's say the site you were looking for was NOT in the app, no problem adding them is very easy!";
  const text8 =
    "To add a dive site we need to click on the dive site adding button, it's under this option, pop it open and I'll walk you through how it works";
  const text9 = "";
  const text10 =
    "This is the dive site adding form, here, you can see 3 fields and a couple of buttons. First is the site name, add the dive site name in this spot";
  const text11 =
    "Next are the GPS lat and lng fields, there are 3 ways you can add them. The first is manually if you have the decimal format GPS coordinates simply add them to the fields and your good to go!";
  const text12 =
    "The second way is using the location button, it’s this one. Clicking it will take your device’s current location and use that to create GPS coordinates for the dive site. Try it out now!";
  const text13 = "";
  const text14 =
    "Nice! As you can see clicking the location button has produced GPS coordinates for your current location!";
  const text15 =
    "Next, assuming neither of these options will fit your situation there is one more, using this Pin Dropper button to open up the map so we can drop a pin, let’s try it";
  const text16 = "";
  const text17 =
    "As you can see we are now back on the map and there is a new icon that looks like a manta ray, this is our draggable pin";
  const text18 =
    "Simply press on and drag the manta pin to to place it where you dive site is meant to be and then click the 'set pin' button at the top of the page";
  const text19 = "";
  const text20 =
    "As you can see Scuba SEAsons has taken the location of the pin you set and has given us its GPS coordinates!";
  const text21 =
    "Now that you have your GPS fields filled out add the site name in the top field and then click the 'Submit Dive Site' button at the bottom and your site will be submitted for review";
  const text22 =
    "Please note your new site won't automatically be added to the map, the Scuba SEAsons team will verify your submission before committing to the map, but after that your site will go in and be credited to you with your diver name that we setup earlier!";
  const text23 = "";
  const text24 =
    "Nice Job, That's how you add a new dive site to Scuba SEAsons! In this case, since this is a guide, the entry was not submitted, but you can add from now on, in the same way";
  const text25 =
    "That's it for adding dive sites to the app! In the next guide we will look at adding sea creature sighting photos! Click on this button to go to that guide next, otherwise click anywhere else to close, and thanks for joining me again!";
  const text26 = "";

  const [textRead, setTextRead] = useState("");
  const [textPrinting, setTextPrinting] = useState(true);

  const feederArray = [
    text0,
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    text10,
    text11,
    text12,
    text13,
    text14,
    text15,
    text16,
    text17,
    text18,
    text19,
    text20,
    text21,
    text22,
    text23,
    text24,
    text25,
    text26,
  ];

  //  var interval;

  const setupText = (pushVal) => {
    if (
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 23 ||
      itterator2 >= 26
    ) {
      return;
    } else {
      if (pushVal === 1 && itterator2 < feederArray.length - 1) {
        if (textPrinting) {
          setTextPrinting(false);
          textArray = "";
          setTextRead("");
          setTextRead(feederArray[itterator2]);
        } else {
          setItterator2((prev) => prev + pushVal);
          setTextPrinting(true);
        }
      }

      if (pushVal === 1 && itterator2 === feederArray.length - 1) {
        setSecondGuideModal(false);
      }
    }
  };

  let textArray;

  function printOutText() {
    if (textArray.length > 0) {
      const charToConcat = textArray[0];
      setTextRead((prev) => prev + charToConcat);
      textArray = textArray.slice(1);
    } else {
      setTextPrinting(false);
    }
  }

  function cleanUp() {
    clearInterval(textPrinter);
  }

  let textPrinter;
  useEffect(() => {
    setTextRead("");

    let textVal = feederArray[itterator2];
    if (textVal) {
      textArray = textVal.split("");
      if (textPrinting) {
        textPrinter = setInterval(printOutText, 80);
      } else {
        setTextRead(textVal);
      }
    }

    return () => cleanUp();
  }, [itterator2, textPrinting]);

  useEffect(() => {
    let characterWidth = document.getElementsByClassName("character2")[0]
      .clientWidth;

    let textBoxHeight = document.getElementsByClassName("talkbox2")[0]
      .clientHeight;

    if (itterator2 === 0) {
      setTimeout(() => {
        setCharacterX(-windowWidth + characterWidth * 1.2);
      }, 600);

      setTimeout(() => {
        setTextBoxY(-windowHeigth / 4);
      }, 1000);
    }

    if (itterator2 === 2) {
      moveMap({ lat: 50.03312256836453, lng: -125.27333546429873 });
      setJump(!jump);
      setTimeout(() => {
        setDsSearchY(2 * windowHeigth + (windowHeigth - 100) / 3);
      }, 1000);
    }

    if (itterator2 === 3) {
      setDsSearchY(0);
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
    }

    if (itterator2 === 4) {
      setDsSearchY(0);
      setSecondGuideModalYCoord(-windowHeigth);
      // animateSecondGuideModal()
    }

    if (itterator2 === 5) {
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
    }

    if (itterator2 === 6) {
      setSecondGuideModalYCoord(-windowHeigth);
      // animateSecondGuideModal()
    }

    if (itterator2 === 8) {
      setDiveSiteY(2 * windowHeigth + (windowHeigth - 100) / 3);
    }

    if (itterator2 === 9) {
      setDiveSiteY(0);
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
      setSecondGuideModal(false);
    }

    if (itterator2 === 10) {
      moveMap({ lat: 50.03312256836453, lng: -125.27333546429873 });
      // modalShow(SiteSubmitter)
      setSecondGuideModalYCoord(-windowHeigth);
    }

    if (itterator2 === 12) {
      setPinY(2 * windowHeigth + (windowHeigth - 100) / 3);
    }

    if (itterator2 === 13) {
      setPinY(0);
      // modalShow(SiteSubmitter)
      setSecondGuideModalYCoord(0)
    }

    if (itterator2 === 14) {
      setSecondGuideModalYCoord(-windowHeigth);
      // modalShow(SiteSubmitter)
    }

    if (itterator2 === 15) {
      // modalShow(SiteSubmitter)
      setLocationY(2 * windowHeigth + (windowHeigth - 100) / 3);
    }

    if (itterator2 === 16) {
      moveMap({ lat: 50.03312256836453, lng: -125.27333546429873 });
      setLocationY(0);
      // modalShow(SiteSubmitter)
      setSecondGuideModalYCoord(0)
    }

    if (itterator2 === 17) {
      setLocationY(0);
      setSecondGuideModalYCoord(-windowHeigth);
      // animateSecondGuideModal()
      setTimeout(() => {
        setMantaY(2 * windowHeigth + (windowHeigth - 120) / 3);
      }, 1000);
    }

    if (itterator2 === 19) {
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
      setMantaY(0);
    }

    if (itterator2 === 20) {
      // setLocationY((2*windowHeigth)+(windowHeigth-100)/3)
      // animateSecondGuideModal()
    }

    if (itterator2 === 23) {
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
    }

    if (itterator2 === 24) {
      setSecondGuideModalYCoord(-windowHeigth);
      // animateSecondGuideModal()
    }

    if (itterator2 === 25) {
      let nextTutHeight = document.getElementsByClassName("nextTutButton")[0]
        .clientHeight;

      setNextTutY(2 * windowHeigth + (windowHeigth - nextTutHeight) / 2);
    }

    if (itterator2 === 26) {
      setAddSiteVals({
        ...addSiteVals,
        Site: "",
        Latitude: "",
        Longitude: "",
      });
      setNextTutY(0);
      setTutorialRunning(false);
    }

    if (itterator2 === feederArray.length - 1) {
      setSecondGuideModalYCoord(0);
      // animateSecondGuideModal()
      setItterator2(null);
      setMapZoom(10);
      resetTutorial();
    }
  }, [itterator2]);

  const characterSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${characterX}px,0,0)` },
  });

  const textBoxSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${textBoxY}px,0)` },
  });

  const DsSearchButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${dsSearchY}px,0)` },
  });

  const diveSiteSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${diveSiteY}px,0)` },
  });

  const locationSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${locationY}px,0)` },
  });

  const pinSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${pinY}px,0)` },
  });

  const mantaSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${mantaY}px,0)` },
  });

  const nextTutSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${nextTutY}px,0)` },
  });

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator2 === null) {
        setItterator2(0);
      }
    }
  }, [secondGuideModal]);

  const moveMap = (values) => {
    setMapCoords([values.lat, values.lng]);
    setJump(!jump);
  };

  return (
    <div className="wrapper2" onClick={() => setupText(1)}>
      <animated.div
        ref={characterRef}
        className="character2"
        style={characterSlide}
        pointerEvents={"box-none"}
      >
        <img
          src={seaLionGuy}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </animated.div>

      <animated.div ref={textBoxRef} className="talkbox2" style={textBoxSlide}>
        {textRead}
      </animated.div>

      <animated.div
        ref={dsSearchRef}
        className="dsSearchbuttonwrapper"
        style={DsSearchButtonSlide}
      >
        <TravelExploreIcon
          sx={{
            height: "100%",
            width: "100%",
            color: "#538dbd",
          }}
        />
      </animated.div>

      <animated.div
        ref={diveSiteRef}
        className="dsAddbuttonwrapper"
        style={diveSiteSlide}
      >
        <AddLocationAltIcon
          sx={{
            height: "90%",
            width: "90%",
            color: "#538dbd",
            marginTop: "10%",
          }}
        />
      </animated.div>

      <animated.div
        ref={locationRef}
        className="myLocationbuttonwrapper"
        style={locationSlide}
      >
        <LocationOnIcon
          sx={{
            height: "100%",
            width: "100%",
            color: "#538dbd",
          }}
        />
      </animated.div>

      <animated.div ref={pinRef} className="pinbuttonwrapper" style={pinSlide}>
        <MyLocationIcon
          sx={{
            height: "100%",
            width: "100%",
            color: "#538dbd",
          }}
        />
      </animated.div>

      <animated.div ref={mantaRef} className="mantaWrapper" style={mantaSlide}>
        <img
          src={mantaIOS}
          style={{
            height: "100%",
            width: "80%",
          }}
        />
      </animated.div>

      <animated.div
        className="nextTutButton2"
        ref={nextTutRef}
        style={nextTutSlide}
        onClick={handleThirdTutorialStartup}
      >
        <p onClick={handleThirdTutorialStartup} className="nextTutText2">
          Photogenics
        </p>
        <KeyboardArrowRightIcon
          sx={{
            height: "6vw",
            width: "6vw",
            color: "white",
            cursor: "pointer",
            marginTop: "1vh",
          }}
          onClick={handleThirdTutorialStartup}
        />
      </animated.div>
    </div>
  );
}
