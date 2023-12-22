import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import "./introTutorial.css";
import mantaIOS from "../../images/Manta32.png";
import seaLionGuy from "../../images/EmilioNeutral.png";
import { TutorialModelContext } from "../contexts/tutorialModalContext";
import { CoordsContext } from "../contexts/mapCoordsContext";
import { SecondTutorialModalContext } from "../contexts/secondTutorialModalContext";
import { getRecentPhotos } from "../../supabaseCalls/photoSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import { grabProfileById } from "../../supabaseCalls/accountSupabaseCalls";
import { newGPSBoundaries } from "../../helpers/mapHelpers";
import { getPhotosforAnchorMulti, getPhotosforAnchor} from "../../supabaseCalls/photoSupabaseCalls";
import { UserProfileContext } from "../contexts/userProfileContext";
import { getToday } from "../../helpers/picUploaderHelpers.js";
import { ZoomContext } from "../contexts/mapZoomContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { TutorialContext } from "../contexts/tutorialContext";
import { TutorialResetContext } from "../contexts/tutorialResetContext";
import { AnchorModalContext } from "../contexts/anchorModalContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { AnimalContext } from "../contexts/animalContext";
import { AnimalMultiSelectContext } from "../contexts/animalMultiSelectContext";
import { ReverseContext } from "../contexts/reverseContext";
import { ChapterContext } from "../contexts/chapterContext";
import anchorClustIOS from "../../images/ClusterAnchor24.png";
import anchorIconIOS from "../../images/SiteAnchor20.png";
import heatIconIOS from "../../images/heatpoint.png";
import arrowIOS from "../../images/arrow.png";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UserNamer from "./usernamer";
import { JumpContext } from "../contexts/jumpContext";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
// import ImageCasher from "../helpers/imageCashing";

let screenWidthInital = window.innerWidth;
let screenHeitghInital = window.innerHeight;

export default function IntroTutorial(props) {
  const { animateIntroGuideModal } = props;
  window.addEventListener("resize", trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeigth, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext
  );
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { jump, setJump } = useContext(JumpContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { animalVal } = useContext(AnimalContext);
  const { animalMultiSelection } = useContext(AnimalMultiSelectContext);

  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const { guideModal, setGuideModal } = useContext(TutorialModelContext);
  const { secondGuideModal, setSecondGuideModal } = useContext(
    SecondTutorialModalContext
  );
  const { itterator, setItterator } = useContext(IterratorContext);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { chapter, setChapter } = useContext(ChapterContext);
  const { tutorialReset, setTutorialReset } = useContext(TutorialResetContext);
  const { movingBack, setMovingBack } = useContext(ReverseContext);
  const [backHappened, setBackHappened] = useState(false);

  // const { setMapCenter } = useContext(MapCenterContext);

  const [pics, setPics] = useState([]);

  const [guideState, setGuideState] = useState(false);


  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (tutorialReset && profile[0].UserName) {
      setItterator(null);
      setTutorialRunning(false);
      setGuideModal(false);
      setTutorialReset(false);
      setSiteModal(false);
      resetTutorial();
      setChapter(null);
    }
  }, [tutorialReset]);

  useEffect(() => {
    setMovingBack(false);

    switch (chapter) {
      case "Getting around the map":
        resetTutorial();
        setSiteModal(false);
        setItterator(6);
        setGuideModal(true);
        // characterX.value = withTiming(
        //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
        // );
        textBoxY.value = withTiming(windowHeight * 0.8);
        picY.value = withSpring(0);
        break;

      case "Dive sites":
        resetTutorial();
        setSiteModal(false);
        setItterator(9);
        setGuideModal(true);
        // characterX.value = withTiming(
        //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
        // );
        textBoxY.value = withTiming(windowHeight * 0.8);
        clusterAnchorY.value = withTiming(windowHeight * 0.4);
        heatPotintY.value = withTiming(windowHeight * 0.25);
        nudgeMap({ lat: 49.3134161482923, lng: -124.242440499365 });
        break;

      case "Changed dive site":
        resetTutorial();
        setSiteModal(false);
        setItterator(16);
        setGuideModal(true);
        // characterX.value = withTiming(
        //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
        // );
        textBoxY.value = withTiming(windowHeight * 0.8);
        arrowY.value = withTiming(65);
        if (selectedDiveSite.SiteName === "") {
          setSelectedDiveSite({
            SiteName: "Madrona Point",
            Latitude: 49.3134,
            Longitude: -124.2424,
          });
        }
        nudgeMap({ lat: 49.3134161482923, lng: -124.242440499365 });
        break;

      case "Exit Guide":
        handleClearTutorial();
        break;
    }
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

  const getPhotos = async (today) => {
    try {
      const photos = await getRecentPhotos(today);
      if (photos) {
        setPics(photos);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const resetTutorial = async () => {
    setItterator(null);
    setCharacterX(0); //1000
    setTextBoxY(0); //1000
    setPixY(0); //-300
    setExploreButtonY(0); //-1000
    setQuestionButtonY(0); //-1000
    setClusterAnchorY(0); //-1200
    setHeatPotintY(0); //-1200
    setGuideButtonY(0); //-1200
    setArrowY(0); //-1200
    setUserBoxY(0); //-300
    setNextTutY(0); //-300
    clearUp();
  };

  const handleSecondTutorialStartup = () => {
    setItterator(null);
    setSiteModal(false);
    setTutorialRunning(true);
    setGuideModal(false);
    setSecondGuideModal(true);
  };

  const characterRef = useRef(null);
  const textBoxRef = useRef(null);
  const questionRef = useRef(null);
  const exploreRef = useRef(null);
  const clusterAnchorRef = useRef(null);
  const heatPotintRef = useRef(null);
  const guideButtonRef = useRef(null);
  const arrowRef = useRef(null);
  const userBoxRef = useRef(null);
  const nextTutRef = useRef(null);
  const picRef = useRef(null);

  const [characterX, setCharacterX] = useState(0); //1000
  const [textBoxY, setTextBoxY] = useState(0); //1000
  const [picY, setPixY] = useState(0); //-300
  const [exploreButtonY, setExploreButtonY] = useState(0); //-1000
  const [questionButtonY, setQuestionButtonY] = useState(0); //-1000
  const [clusterAnchorY, setClusterAnchorY] = useState(0); //-1200
  const [heatPotintY, setHeatPotintY] = useState(0); //-1200
  const [guideButtonY, setGuideButtonY] = useState(0); //-1200
  const [arrowY, setArrowY] = useState(0); //-1200
  const [userBoxY, setUserBoxY] = useState(0); //-300
  const [nextTutY, setNextTutY] = useState(0); //-300

  const text0 =
    "Hi, welcome to Scuba SEAsons, I'm Emilio, I'm here to show you around.";
  const text1 =
    "First, what should I call you? This way, when you add a dive site or contribute a sea creature sighting we can put your name on it! ";
  const text2 =
    "Nice to meet you! Now that we are buddied up, let me first explain how my guide system works";
  const text3 =
    "In the top left you may have noticed this 'Guide Active' button, as long as you are in a guide it will be on screen if you tap on it a menu will open giving you the option to chapter skip to different parts of the guide you are currently in";
  const text4 =
    "The last option in the list on any of the guides is the 'Exit Guide' option which will let you jump out and explore on your own at any time";
  const text5 =
    "If you ever want to refer back to a guide (or miss me!) you can find me under this question mark button in the menu, from there you can open any of the guides";
  const text6 =
    "Ok thats the guide system, now let's find a spot with some action! Here are 3 recent sightings by other divers. Choose one and let's see what else is there!";
  const text7 =
    "Great! We've moved the map, as you can see there is a lot more action here!";
  const text8 =
    "Normally to move the map, you can use the location search under this icon. Enter in the name of the location you want to hop over to and it will take you there";
  const text9 =
    "Looking at the map you can now see a few things, namely these grey and blue anchors, the grey anchors are a cluster of dive sites, tapping on one will zoom the map into it until the single dive sites split out from it";
  const text10 = `The blue anchors are dive sites, try tapping on one and let's take a closer look! But make sure it has a heat point nearby, they look like this,      that means sea creatures have been spotted on that dive site.`;
  const text11 = "";
  const text12 =
    "Oops! Looks like you have chosen a dive site that doesn't have any sightings yet! Remember you want a dive site with a heat point       nearby. Close the form and try to find one with heat points.";
  const text13 = ""
  const text14 =
    "Wow, cool! look at all the neat sea creatures divers have already seen at this site!";
  const text15 =
    "Now try closing the dive site and choose a creature or two from the pictures along the top, then we will come back to the dive site and see what's changed!";
  const text16 = "";
  const text17 =
    "Select one or more sea creatures using the menu at the top, a click will highlight the selected sea creature yellow to indicate that it is selected but...";
  const text18 =
    "If you DOUBLE click on one, you will see that it pops out for a better look! You can double click on another to swap them or double click on the popped out one to put it back, and yes you can still click to select while its popped out!";
  const text19 = "";
  const text20 =
    "Uh-oh! This isn't the dive site we were looking at before! Try to find the one we were looking at so we can see how it has changed.";
  const text21 =
    "As you can see, the photos have filtered to show only those creatures you have selected";
  const text22 =
    "Ok well that's all for this guide, I hope I have helped to give you a feel for how to get around the Scuba SEAsons map.";
  const text23 =
    "In the next one I'll show you how to check if a dive site is in the app and if not, enable you to add it yourself!";
  const text24 =
    "If you want to continue to the next guide please tap this button, if not tap anywhere else to exit, and thank you for joining Scuba SEAsons!";
  const text25 = "";

  const [textRead, setTextRead] = useState("");
  const [textRead2, setTextRead2] = useState("  ");
  const [textPrinting, setTextPrinting] = useState(true);
  const [anchPhotos, setAnchPhotos] = useState(null);
  const [backCount, setBackCount] = useState(0);

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
  ];

  const setupText = (pushVal) => {
    // if (itterator === 12 && !textPrinting) {
    //   setItterator(11);
    //   setGuideModal(false);
    //   return;
    // } else if (itterator === 19 && !textPrinting) {
    //   setItterator(18);
    //   setGuideModal(false);
    //   return;
    // }
    if (
      itterator === 1 ||
      itterator === 6 ||
      itterator === 11 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator >= 25
    ) {
      return;
    } else {
      if (pushVal === 1 && itterator < feederArray.length - 1) {
        if (textPrinting) {
          textArray = "";
          setTextRead("");
          setTextRead(feederArray[itterator]);
          setTextPrinting(false);
        } else {
          setItterator((prev) => prev + pushVal);
          setTextPrinting(true);
        }
      }

      if (pushVal === 1 && itterator === feederArray.length - 1) {
        setGuideModal(false);
      }
    }
  };

  let textArray;

  function printOutText() {
    if (textArray.length > 0) {
      if (itterator === 10 && textArray.length <= 64) {
        setTextRead2((prev) => prev + textArray[0]);
      } else if (itterator === 12 && textArray.length <= 63) {
        setTextRead2((prev) => prev + textArray[0]);
      } else {
        setTextRead((prev) => prev + textArray[0]);
      }
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
    setTextRead2("");
    let textVal = feederArray[itterator];
    if (textVal) {
      textArray = textVal.split("");
      if (textPrinting) {
        textPrinter = setInterval(printOutText, 80);
      } else if (itterator === 10 && !textPrinting) {
        let val1 = textVal.slice(0, 147); // textVal.slice(0, 145);
        let val2 = textVal.slice(-64); // textVal.slice(-68);
        setTextRead(val1);
        setTextRead2(val2);
      } else if (itterator === 12 && !textPrinting) {
        let val1 = textVal.slice(0, 133); // textVal.slice(0, 131);
        let val2 = textVal.slice(-62); // textVal.slice(-65);
        setTextRead(val1);
        setTextRead2(val2);
      } else {
        setTextRead(textVal);
      }
    }

    return () => cleanUp();
  }, [itterator, textPrinting]);

  useEffect(() => {
    if (itterator === 0) {
      setTimeout(() => {
        setCharacterX(-windowWidth * 0.35);
      }, 600);

      setTimeout(() => {
        setTextBoxY(-windowHeigth * 0.35);
      }, 1000);
    }

    if (itterator === 1) {
      getProfile();

      if (profile[0].UserName) {
        setItterator((prev) => prev + 1);
        return;
      }

      setUserBoxY(-windowHeigth * 0.8)
    }

    if (itterator === 2) {
      getProfile();
      setUserBoxY(0)
    }

    if (itterator === 3) {
      setGuideButtonY(windowHeigth * 1.75)
    }


    if (itterator === 5) {
      setGuideButtonY(0)
      setQuestionButtonY(windowHeigth * 1.5);
    }

    // console.log("i am", itterator);

    if (itterator === 6) {
      setQuestionButtonY(0);
      setPixY(windowHeigth * 1.9)
    }

    if (itterator === 7) {
      setPixY(0)
    }

    if (itterator === 8) {
      setExploreButtonY(windowHeigth * 1.5);
    }

    if (itterator === 9) {
      setExploreButtonY(0);
      setClusterAnchorY(windowHeigth * 1.85);
    }

    if (itterator === 10) {
      setHeatPotintY(windowHeigth * 1.6);
    }

    if (itterator === 11) {

      if(!movingBack){
        animateIntroGuideModal()
        setHeatPotintY(0);
        setClusterAnchorY(0);
      } else {
        setMovingBack(false)
      }
     
    }

    if (itterator === 12) {
      animateIntroGuideModal()
      setTextPrinting(true);
      setMovingBack(true);
      setMapZoom(10)
    }

    if (itterator === 13) {
      animateIntroGuideModal()
      setItterator(11)
    }

    if (itterator === 14) {
      animateIntroGuideModal()
      setChapter(null);
    }

   
    if (itterator === 16) {
      animateIntroGuideModal()
      
    }

    if (itterator === 17) {
      animateIntroGuideModal()
      setArrowY(windowHeigth * 1.4);
    }

    if (itterator === 19) {
        setArrowY(0);
        animateIntroGuideModal()
    }

    if (itterator === 21) {
      animateIntroGuideModal()
    }

    if (itterator === 23) {
      // nextTutY.value = withSpring(windowWidth * 0.3);
      // startNextTutAnimation();
    }

    if (itterator === 24) {
      // setSiteModal(false);
      // nextTutY.value = withTiming(-300);
      // startNextTutAnimation();
    }

    if (itterator === feederArray.length - 1) {
      animateIntroGuideModal();
      setItterator(null);
      setMapZoom(10)
      resetTutorial();

      // setItterator(null);
      // setTutorialRunning(false);
      // setGuideModal(false);
      // characterX.value = withTiming(
      //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
      // );
      // startCharacterAnimation();
      // textBoxY.value = withTiming(1000);
      // startTextBoxAnimation();
      // setChapter(null);
      // setBackHappened(false);
      // setMovingBack(false);
      // setBackCount(0);
    }
  }, [itterator]);

  const characterSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${characterX}px,0,0)` },
  });

  const textBoxSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${textBoxY}px,0)` },
  });

  const guideButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${guideButtonY}px,0)` },
  });

  const questionButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${questionButtonY}px,0)` },
  });

  const picSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${picY}px,0)` },
  });

  const exploreButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${exploreButtonY}px,0)` },
  });

  const clusterAnchorSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${clusterAnchorY}px,0)` },
  });

  const heatPointSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${heatPotintY}px,0)` },
  });

  const arrowSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${arrowY}px,0)` },
  });

  const userBoxSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${userBoxY}px,0)` },
  });

  const nextTutSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${nextTutY}px,0,0)` },
  });

  useEffect(() => {
    filterAnchorPhotos();
  }, [selectedDiveSite, itterator]);

  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = newGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    let animalVal = animalMultiSelection
    try {
      const photos = await getPhotosforAnchor({
        animalVal,
        // sliderVal,
        minLat,
        maxLat,
        minLng,
        maxLng,
      });
      if (photos) {
        let count = 0;
        photos.forEach((obj) => {
          count++;
        });
        setAnchPhotos(count);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    if (tutorialRunning && guideModal) {
      if (itterator === null) {
        setItterator(0);
      } else if (itterator == 12 || itterator == 13){
        animateIntroGuideModal()
      }
    }

    let today = new Date();
    let formattedDate = getToday(today);
    let dateFormat = new Date(formattedDate)
    getPhotos(formattedDate);
  }, [guideModal]);

  const moveMap = async (values) => {
    setMapCoords([values.lat, values.lng]);
    setJump(!jump)

    setItterator((prev) => prev + 1);

  };

  const nudgeMap = async (values) => {
    setMapCoords([values.lat, values.lng]);
    setJump(!jump)

  };

  return (
    <div className="wrapper" onClick={() => setupText(1)}>
      <animated.div 
        className="container3"
        ref={picRef}
        style={picSlide}
        >
        {pics &&
          pics.map((pic) => {
            return (
              <div
                key={pic.id}
                className="picContainer3"
                onClick={() =>
                  moveMap({ lat: pic.latitude, lng: pic.longitude })
                }
              >
                <div className="micro">
                  <p className="titleTextX">{pic.label}</p>
                </div>
                <div className="shadowbox">
                  <img
                    src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                    id={pic.id}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 15,
                      borderColor: "grey",
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            );
          })}
      </animated.div>

      <animated.div
        ref={characterRef}
        className="character"
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

      <animated.div
        className="talkbox"
        ref={textBoxRef}
        style={textBoxSlide}
        pointerEvents={"box-none"}
      >
        <div className="textcontain">
          {textRead}
         {(textRead2.length > 0) && <img src={heatIconIOS} className="tinyHeat" />}
          {textRead2}
  
        </div>
      </animated.div>

      <animated.div
        className="explorebuttonwrapper"
        ref={exploreRef}
        style={exploreButtonSlide}
        pointerEvents={"box-none"}
      >
        <ExploreIcon
          sx={{
            height: "10vh",
            width: "10vh",
            color: "aquamarine",
          }}
        />
      </animated.div>

      <animated.div
        className="questionbuttonwrapper"
        ref={questionRef}
        style={questionButtonSlide}
        pointerEvents={"box-none"}
      >
        <QuestionMarkIcon
          sx={{
            height: "10vh",
            width: "10vh",
            color: "aquamarine",
          }}
        />
      </animated.div>

      <animated.div 
      className="usernamerwrapper" 
      ref={userBoxRef}
      style={userBoxSlide}
      >
        <UserNamer></UserNamer>
      </animated.div>

      <animated.div
        className="anchorclusterwrapper"
        ref={clusterAnchorRef}
        style={clusterAnchorSlide}
        pointerEvents={"box-none"}
      >
        <img
          src={anchorIconIOS}
          className="anchor1"
          style={{
            height: "10vh",
            width: "10vh",
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor2"
          style={{
            height: "10vh",
            width: "10vh",
          }}
        />

        <img
          src={anchorClustIOS}
          className="anchorclust"
          style={{
            height: "12vh",
            width: "12vh",
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor3"
          style={{
            height: "10vh",
            width: "10vh",
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor4"
          style={{
            height: "10vh",
            width: "10vh",
          }}
        />
      </animated.div>

      <animated.div
        className="heatpointwrapper"
        ref={heatPotintRef}
        style={heatPointSlide}
        pointerEvents={"box-none"}
      >
        <img
          src={heatIconIOS}
          className="anchorclust"
          style={{
            height: "20vh",
            width: "20vh",
          }}
        />
      </animated.div>

      <animated.div
        className="arrowWrapper"
        ref={arrowRef}
        style={arrowSlide}
        pointerEvents={"box-none"}
      >
        <img
          src={arrowIOS}
          className="anchor4"
          style={{
            height: "30vh",
            width: "70vh",
          }}
        />
      </animated.div>

      {/* <animated.div
        className="nextTutButton"
        ref={nextTutRef}
        style={nextTutSlide}
        onPress={handleSecondTutorialStartup}
      >
        <p onPress={handleSecondTutorialStartup} className="nextTutText">
          Fun With Dive Sites
        </p>
        <KeyboardArrowRightIcon
          sx={{
            height: "10vh",
            width: "10vh",
            color: "white",
          }}
          onClick={handleSecondTutorialStartup}
        />
      </animated.div> */}

      <animated.div
        className="guidebutton"
        ref={guideButtonRef}
        style={guideButtonSlide}
      >
        <p className="guidetext">
          Guide Active
        </p>
      </animated.div>
    </div>
  );
}
