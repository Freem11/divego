import React, { useState, useContext, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import "./introTutorial.css";
import mantaIOS from "../../images/Manta32.png";
import seaLionGuy from "../../images/EmilioNeutral.png";
import { TutorialModelContext } from "../contexts/tutorialModalContext";
import { SecondTutorialModalContext } from "../contexts/secondTutorialModalContext";
import { getRecentPhotos } from "../../supabaseCalls/photoSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import { grabProfileById } from "../../supabaseCalls/accountSupabaseCalls";
import { newGPSBoundaries } from "../../helpers/mapHelpers";
import { getPhotosforAnchorMulti } from "../../supabaseCalls/photoSupabaseCalls";
import { UserProfileContext } from "../contexts/userProfileContext";
import { getToday } from "../../helpers/picUploaderHelpers.js";
// import { MapCenterContext } from "../contexts/mapCenterContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { TutorialContext } from "../contexts/tutorialContext";
import { TutorialResetContext } from "../contexts/tutorialResetContext";
// import { AnchorModalContext } from "../contexts/anchorModalContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { AnimalMultiSelectContext } from "../contexts/animalMultiSelectContext";
import { ReverseContext } from "../contexts/reverseContext";
import { ChapterContext } from "../contexts/chapterContext";
import anchorClustIOS from "../../images/ClusterAnchor24.png";
import anchorIconIOS from "../../images/SiteAnchor20.png";
import heatIconIOS from "../../images/heatpoint.png";
import arrowIOS from "../../images/arrow.png";
// import UserNamer from "./usernamer";
// import ImageCasher from "../helpers/imageCashing";

let screenWidthInital = window.innerWidth;
let screenHeitghInital = window.innerHeight;

export default function IntroTutorial() {
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
  const { animalMultiSelection } = useContext(AnimalMultiSelectContext);

  // const { siteModal, setSiteModal } = useContext(AnchorModalContext);
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
  let counter = 0;
  let blinker;

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
        picX.value = withSpring(0);
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
    setCharacterX(0); //1000
    setTextBoxY(0); //1000
    setPicX(0); //-300
    setExploreButtonY(0); //-1000
    setQuestionButtonY(0); //-1000
    setClusterAnchorY(0); //-1200
    setHeatPotintY(0); //-1200
    setGuideButtonY(0); //-1200
    setArrowY(0); //-1200
    setUserBoxX(0); //-300
    setNextTutX(0); //-300
    clearUp();
  };

  const handleSecondTutorialStartup = () => {
    setItterator(null);
    setSiteModal(false);
    setTutorialRunning(true);
    setGuideModal(false);
    setSecondGuideModal(true);
  };

  const [characterX, setCharacterX] = useState(0); //1000
  const [textBoxY, setTextBoxY] = useState(0); //1000
  const [picX, setPicX] = useState(0); //-300
  const [exploreButtonY, setExploreButtonY] = useState(0); //-1000
  const [questionButtonY, setQuestionButtonY] = useState(0); //-1000
  const [clusterAnchorY, setClusterAnchorY] = useState(0); //-1200
  const [heatPotintY, setHeatPotintY] = useState(0); //-1200
  const [guideButtonY, setGuideButtonY] = useState(0); //-1200
  const [arrowY, setArrowY] = useState(0); //-1200
  const [userBoxX, setUserBoxX] = useState(0); //-300
  const [nextTutX, setNextTutX] = useState(0); //-300

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
  const text13 =
    "Wow, cool! look at all the neat sea creatures divers have already seen at this site!";
  const text14 =
    "Now try closing the dive site and choose a creature or two from the pictures along the top, then we will come back to the dive site and see what's changed!";
  const text15 = "";
  const text16 =
    "Select one or more sea creatures using the menu at the top, a tap will highlight the selected sea creature yellow to indicate that it is selected but...";
  const text17 =
    "If you LONG press on one, you will see that it pops out for a better look! You can long press on another to swap them or long press on the popped out one to put it back, and yes you can still tap to select while its popped out!";
  const text18 = "";
  const text19 =
    "Uh-oh! This isn't the dive site we were looking at before! Try to find the one we were looking at so we can see how it has changed.";
  const text20 =
    "As you can see, the photos have filtered to show only those creatures you have selected";
  const text21 =
    "Ok well that's all for this guide, I hope I have helped to give you a feel for how to get around the Scuba SEAsons map.";
  const text22 =
    "In the next one I'll show you how to check if a dive site is in the app and if not, enable you to add it yourself!";
  const text23 =
    "If you want to continue to the next guide please tap this button, if not tap anywhere else to exit, and thank you for joining Scuba SEAsons!";
  const text24 = "";

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
  ];

  const setupText = (pushVal) => {
    if (itterator === 12 && !textPrinting) {
      setItterator(11);
      setGuideModal(false);
      return;
    } else if (itterator === 19 && !textPrinting) {
      setItterator(18);
      setGuideModal(false);
      return;
    }
    if (
      itterator === 1 ||
      itterator === 6 ||
      itterator === 11 ||
      itterator === 15 ||
      itterator === 18 ||
      itterator >= 24
    ) {
      return;
    } else {
      if (pushVal === 1 && itterator < feederArray.length - 1) {
        if (textPrinting) {
          setTextPrinting(false);
          textArray = "";
          setTextRead("");
          setTextRead(feederArray[itterator]);
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
        // characterX.value = withTiming(
        //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
        // );
        // startCharacterAnimation();
      }, 800);

      setTimeout(() => {
        setTextBoxY(windowHeigth * 0.6);
        // textBoxY.value = withTiming(windowHeight * 0.8);
        // startTextBoxAnimation();
        setupText(0);
      }, 1000);
    }

    if (itterator === 1) {
      getProfile();

      if (profile[0].UserName) {
        setItterator((prev) => prev + 1);
        return;
      }
      // userBoxX.value = withSpring(windowWidth * 0.2);
      // startUserBoxAnimation();
    }

    if (itterator === 2) {
      getProfile();
      // if (userBoxX.value !== (-300)) {
      // userBoxX.value = withTiming(-300);
  
      // startUserBoxAnimation();
      // }
      // startPicAnimation();
    }

    if (itterator === 3) {
      // blinker = setInterval(guideBut, 1500);
      // guideButtonY.value = withTiming(windowHeight * 0.4);
    }

    if (itterator === 4) {
      // guideButtonY.value = withTiming(-1000);
      // clearUp();
    }

    if (itterator === 5) {
      // questionButtonY.value = withTiming(windowHeight * 0.4);
    }

    console.log("i am", itterator);
    if (itterator === 6) {
      // questionButtonY.value = withTiming(-1000);
      // picX.value = withSpring(0);
    }

    if (itterator === 8) {
      // exploreButtonY.value = withTiming(windowHeight * 0.4);
      // startExploreButtonAnimation();
    }

    if (itterator === 9) {
      // exploreButtonY.value = withTiming(-1000);
      // clusterAnchorY.value = withTiming(windowHeight * 0.4);
      // startClusterAnchorAnimation();
    }

    if (itterator === 10) {
      // heatPotintY.value = withTiming(windowHeight * 0.25);
      // startHeatPointAnimation();
    }

    if (itterator === 11) {
      if (movingBack) {
        setMovingBack(false);
        setGuideModal(false);
        return;
      } else {
        setGuideModal(false);
        heatPotintY.value = withTiming(-1200);
        // startHeatPointAnimation();
        clusterAnchorY.value = withTiming(-1200);
        // startClusterAnchorAnimation();
      }
    }

    if (itterator === 12) {
      setTextPrinting(true);
      setMovingBack(true);
      setGuideModal(true);
    }

    if (itterator === 13) {
      setTextRead("");
      setTextPrinting(true);
    }

    if (itterator === 14) {
      setChapter(null);
    }

    if (itterator === 15) {
      setGuideModal(false);
    }

    if (itterator === 16) {
      setGuideModal(true);
      arrowY.value = withTiming(windowWidth > 600 ? -10 : 65);
      // startArrowAnimation();
    }

    if (itterator === 18) {
      if (movingBack) {
        setMovingBack(false);
        setGuideModal(false);
        setBackHappened(false);
        return;
      } else {
        setGuideModal(false);
        arrowY.value = withTiming(-1200);
        // startArrowAnimation();
      }
    }

    if (itterator === 19) {
      if (backCount === 0) {
        arrowY.value = withTiming(-1200);
        // startArrowAnimation();
        setBackCount((prev) => prev + 1);
      }
      if (backHappened) {
        setTextPrinting(true);
        setMovingBack(true);
        // -------------------------
        setGuideModal(true);
      } else {
        setTextPrinting(true);
        setMovingBack(true);
        setGuideModal(true);
        setBackHappened(true);
      }
    }

    if (itterator === 20) {
      arrowY.value = withTiming(-1200);
      setGuideModal(true);
    }

    if (itterator === 23) {
      nextTutX.value = withSpring(windowWidth * 0.3);
      // startNextTutAnimation();
    }

    if (itterator === 24) {
      setSiteModal(false);
      nextTutX.value = withTiming(-300);
      // startNextTutAnimation();
    }

    if (itterator === feederArray.length - 1) {
      setItterator(null);
      setTutorialRunning(false);
      setGuideModal(false);
      // characterX.value = withTiming(
      //   Platform.OS === "ios" ? windowWidth * 0.2 : windowWidth * 0.26
      // );
      // startCharacterAnimation();
      textBoxY.value = withTiming(1000);
      // startTextBoxAnimation();
      setChapter(null);
      setBackHappened(false);
      setMovingBack(false);
      setBackCount(0);
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
    to: { transform: `translate3d(${picX}px,0,0)` },
  });

  const exporeButtonSlide = useSpring({
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
    to: { transform: `translate3d(${userBoxX}px,0,0)` },
  });

  const nextTutSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${nextTutX}px,0,0)` },
  });

  useEffect(() => {
    filterAnchorPhotos();
  }, [selectedDiveSite]);

  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = newGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    try {
      const photos = await getPhotosforAnchorMulti({
        animalMultiSelection,
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
    if (tutorialRunning) {
      if (itterator === null) {
        setItterator(0);
      }
    }

    let today = new Date();
    let formattedDate = getToday(today);
    getPhotos(formattedDate);
  }, [guideModal]);

  const moveMap = (values) => {
    setMapCenter({ lat: values.lat, lng: values.lng });

    let hopper = 0;
    if (itterator === 2) {
      hopper = 2;
    } else {
      hopper = 1;
    }
    setItterator((prev) => prev + hopper);
    picX.value = withTiming(-300);
    // startPicAnimation();
  };

  const nudgeMap = (values) => {
    setMapCenter({ lat: values.lat, lng: values.lng });
  };

  // const progress = useDerivedValue(() => {
  //   return withTiming(guideState === true ? 1 : 0);
  // });

  // const guideButtonPulse = useAnimatedStyle(() => {
  //   const backgroundColor = interpolateColor(
  //     progress.value,
  //     [0, 1],
  //     [
  //       styles.guideButton.backgroundColor,
  //       styles.guideButtonAlt.backgroundColor,
  //     ]
  //   );
  //   return {
  //     backgroundColor,
  //   };
  // });

  function guideBut() {
    counter++;
    if (counter % 2 == 0) {
      setGuideState(false);
    } else {
      setGuideState(true);
    }
  }

  function clearUp() {
    clearInterval(blinker);
    setGuideState(false);
  }

  return (
    <div className="wrapper" onPress={() => setupText(1)}>
      <div className="container3">
        {pics &&
          pics.map((pic) => {
            return (
              <animated.div
                key={pic.id}
                className="picContainer3"
                style={picSlide}
                onClick={() =>
                  moveMap({ lat: pic.latitude, lng: pic.longitude })
                }
              >
                <div classname="micro">
                  <p classname="titleText">{pic.label}</p>
                </div>
                <div classname="shadowbox">
                  <img
                    photoFile={pic.photoFile}
                    id={pic.id}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 15,
                      borderColor: "grey",
                    }}
                  />
                </div>
              </animated.div>
            );
          })}
      </div>

      <animated.div
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
        // className="textboxes"
        style={
          (textBoxSlide,
          {
            fontFamily: "Itim",
            fontSize: 24,
            backgroundColor: "white",
            height: 50,
            width: "50vw",
            top: "110vh",
            left: "50vw",
            borderRadius: 15,
          })
        }
      >
        <div style={{ padding: 10 }} classname="textcontain">
          {textRead}
          <div
            style={{
              opacity: textRead2.length > 2 ? 1 : 0,
              marginRight: -10,
              marginBottom: -15,
              // backgroundColor: "green",
            }}
          >
            <img src={heatIconIOS} classname="honkCon" />
          </div>
          {textRead2}
        </div>
      </animated.div>

      <animated.div classname="buttonwrapper" style={exporeButtonSlide}>
        {/* <MaterialIcons name="explore" color="aquamarine" size={(42)} /> */}
      </animated.div>

      <animated.div classname="buttonwrapper" style={questionButtonSlide}>
        {/* <FontAwesome5 name="question" color="aquamarine" size={(31)} /> */}
      </animated.div>

      <animated.div classname="buttonwrapper" style={userBoxSlide}>
        {/* <UserNamer></UserNamer> */}
      </animated.div>

      <animated.div classname="anchorClusterWrapper" style={clusterAnchorSlide}>
        <img
          src={anchorClustIOS}
          className="anchorclust"
          style={{
            height: 31,
            width: 31,
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor1"
          style={{
            height: 28,
            width: 28,
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor2"
          style={{
            height: 28,
            width: 28,
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor3"
          style={{
            height: 28,
            width: 28,
          }}
        />

        <img
          src={anchorIconIOS}
          className="anchor4"
          style={{
            height: 28,
            width: 28,
          }}
        />
      </animated.div>

      <animated.div className="heatPointWrapper" style={heatPointSlide}>
        <img
          src={heatIconIOS}
          className="anchor4"
          style={{
            height: 50,
            width: 50,
          }}
        />
      </animated.div>

      <animated.div className="arrowWrapper" style={arrowSlide}>
        <img
          src={arrowIOS}
          className="anchor4"
          style={{
            height: 90,
            width: 200,
          }}
        />
      </animated.div>

      <animated.div
        className="nextTutButton"
        style={nextTutSlide}
        onPress={handleSecondTutorialStartup}
      >
        <p onPress={handleSecondTutorialStartup} className="nextTutText">
          Fun With Dive Sites
        </p>
        {/* <FontAwesome
            name="arrow-right"
            size={24}
            color="white"
            onPress={handleSecondTutorialStartup}
          /> */}
      </animated.div>

      {/* <animated.div
      className="guideButton"
        style={[guideButtonSlide]}
      >
        <p style={guideState ? styles.guideTextAlt : styles.guideText}>
          Guide Active
        </p>
      </animated.div> */}
    </div>
  );
}
