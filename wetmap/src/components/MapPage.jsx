import React from "react";
import { animated, useSpring } from "react-spring";
import Logo from "./logo/logo";
import Home from "./googleMap";
import FormModal from "./modals/formModal";
import FormGuideModal from "./modals/formGuideModal";
import AdminPortal from "./adminPortal";
import PicUploader from "./modals/picUploader";
import SiteSubmitter from "./modals/siteSubmitter";
import HowToGuide from "./modals/howToGuide";
import AnchorPics from "./modals/anchorPics";
import Settings from "./modals/setting";
import PhotoMenu from "./photoMenu/photoMenu2";
import PhotoFilterer from "./photoMenu/photoFilter";
import { useState, useContext, useEffect, useRef } from "react";
import { grabProfileById } from "./../supabaseCalls/accountSupabaseCalls";
// import { removePhoto } from "./../supabaseCalls/uploadSupabaseCalls";
import { removePhoto } from "./../cloudflareBucketCalls/cloudflareAWSCalls";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import Collapse from "@mui/material/Collapse";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { AnimalContext } from "./contexts/animalContext";
import { PicModalContext } from "./contexts/picModalContext";
import { PictureContext } from "./contexts/pictureContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { AnimalRevealContext } from "./contexts/animalRevealContext";
import { MasterContext } from "./contexts/masterContext";
import { LightBoxContext } from "./contexts/lightBoxContext";
import { SelectedPicContext } from "./contexts/selectPicContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { UserProfileContext } from "./contexts/userProfileContext";
import { SessionContext } from "./contexts/sessionContext";
import { PinContext } from "./contexts/staticPinContext";
import { DiveSpotContext } from "./contexts/diveSpotContext";
import { ModalSelectContext } from "./contexts/modalSelectContext";
import { AnchorModalContext } from "./contexts/anchorModalContext";
import { DiveSiteAdderModalContext } from "./contexts/diveSiteAdderModalContext";
import { PicAdderModalContext } from "./contexts/picAdderModalContext";
import { DiveSiteSearchModalContext } from "./contexts/diveSiteSearchModalContext";
import { MapSearchModalContext } from "./contexts/mapSearchModalContext";
import { GuideLaunchModalContext } from "./contexts/guideLaunchModalContext";
import { SettingsModalContext } from "./contexts/settingsModalContext";
import { PullTabContext } from "./contexts/pullTabContext";
import { CarrouselTilesContext } from "./contexts/carrouselTilesContext";
import { TutorialContext } from "./contexts/tutorialContext";
import { IterratorContext } from "./contexts/iterratorContext";
import { Iterrator2Context } from "./contexts/iterrator2Context";
import { Iterrator3Context } from "./contexts/iterrator3Context";
import { AreaPicsContext } from "./contexts/areaPicsContext";
import IntroTutorial from "./guides/introTutorial";
import SecondTutorial from "./guides/secondTutorial";
import ThirdTutorial from "./guides/thirdTutorial";
import SiteSearchModal from "./modals/siteSearchModal";
import MapSearchModal from "./modals/mapSearchModal";
import Lightbox from "react-image-lightbox";
import "./mapPage.css";
import AnimalTopAutoSuggest from "./animalTags/animalTagContainer";
import Histogram from "./histogram/histogramBody";
import TutorialBar from "./guideBar/tutorialBarContainer";
import { getTablePaginationUtilityClass } from "@mui/material";

const adminPortalZone = (
  <div style={{ marginLeft: "10px", marginBottom: "40px" }}>
    <AdminPortal></AdminPortal>
  </div>
);

const MapPage = React.memo((props) => {
  const { screenHeigthInital } = props;
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { animalVal } = useContext(AnimalContext);
  const { showGeoCoder, setShowGeoCoder } = useContext(GeoCoderContext);
  const { showAnimalSearch, setShowAnimalSearch } =
    useContext(AnimalRevealContext);
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { photoFile, setPhotoFile } = useContext(PictureContext);
  const { lightbox, setLightbox } = useContext(LightBoxContext);
  const { selectedPic } = useContext(SelectedPicContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { picModal, setPicModal } = useContext(PicModalContext);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);

  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { itterator, setItterator } = useContext(IterratorContext);
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);

  const { areaPics, setAreaPics } = useContext(AreaPicsContext);
  const [isOpen, setIsOpen] = useState(false);

  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const { dsAdderModal, setDsAddermodal } = useContext(DiveSiteAdderModalContext);
  const { picAdderModal, setPicAddermodal } = useContext(PicAdderModalContext);
  const { diveSiteSearchModal, setDiveSiteSearchModal } = useContext(DiveSiteSearchModalContext);
  const { mapSearchModal, setMapSearchModal } = useContext(MapSearchModalContext);
  const { guideLaunchModal, setGuideLaunchModal } = useContext(GuideLaunchModalContext);
  const { settingsModal, setSettingsModal } = useContext(SettingsModalContext);
  const { showFilterer, setShowFilterer } = useContext(PullTabContext);
  const { tiles, setTiles } = useContext(CarrouselTilesContext);

  const togglePicModal = () => {
    setPicModal(!picModal);
  };

  const [diveSiteModal, setDiveSiteModal] = useState(false);

  const toggleDiveSiteModal = () => {
    setDiveSiteModal(!diveSiteModal);
  };

  const [guideModal, setGuideModal] = useState(false);

  const toggleGuideModal = () => {
    setGuideModal(!guideModal);
  };

  const [gearModal, setGearModal] = useState(false);

  const [searButState, setSearButState] = useState(false);
  const [siteButState, setSiteButState] = useState(false);
  const [photButState, setPhotButState] = useState(false);

  let blinker;
  let counter = 0;
  let counter1 = 0;
  let counter2 = 0;

  function diveSiteSearch() {
    counter++;
    if (counter % 2 == 0) {
      setSearButState(false);
    } else {
      setSearButState(true);
    }
  }

  function diveSiteAdd() {
    counter1++;
    if (counter1 % 2 == 0) {
      setSiteButState(false);
    } else {
      setSiteButState(true);
    }
  }

  function photoAdd() {
    counter2++;
    if (counter2 % 2 == 0) {
      setPhotButState(false);
    } else {
      setPhotButState(true);
    }
  }

  function cleanUp() {
    clearInterval(blinker);
    setSearButState(false);
    setSiteButState(false);
    setPhotButState(false);
  }

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator2 === 3) {
        blinker = setInterval(diveSiteSearch, 1500);
      } else if (itterator2 === 9) {
        blinker = setInterval(diveSiteAdd, 1500);
      }
    }
    return () => cleanUp();
  }, [itterator2]);

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator3 === 5) {
        blinker = setInterval(photoAdd, 1500);
      }
    }
    return () => cleanUp();
  }, [itterator3]);

  const toggleGearModal = () => {
    setGearModal(!gearModal);
  };

  const returnToPicModal = () => {
    if (chosenModal === "DiveSite") {
      animateSiteModal();
      setMasterSwitch(true);
      setChosenModal(null);
      if (tutorialRunning) {
        if (itterator2 === 19) {
          setItterator2(itterator2 + 1);
          animateSecondGuideModal();
        }
      }
    } else if (chosenModal === "Photos") {
      animatePicModal();
      setMasterSwitch(true);
      setChosenModal(null);
      if (tutorialRunning) {
        if (itterator3 === 19) {
          setItterator3(itterator3 + 1);
          animateThirdGuideModal();
        }
      }
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId = activeSession.user.id;
      try {
        const success = await grabProfileById(sessionUserId);
        if (success) {
          let bully = success[0].UserName;
          if (bully == null || bully === "") {
            setIntroGuideModalYCoord(-windowHeight);
            setTutorialRunning(true);
            setItterator(0);
          } else {
            setProfile(success);
            setPin({
              ...pin,
              UserID: success[0].UserID,
              UserName: success[0].UserName,
            });
            setAddSiteVals({
              ...addSiteVals,
              UserID: success[0].UserID,
              UserName: success[0].UserName,
            });
          }
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    };

    getProfile();
  }, []);

  const toggleButtonStyle = {
    "&.Mui-selected": {
      backgroundColor: "#538bdb",
      width: "70%",
      height: "40%",
      // border: "1px solid #538bdb",
    },
    "&.Mui-selected:hover": { backgroundColor: "lightgrey", color: "white" },
    "&:hover": {
      color: "lightgrey",
      backgroundColor: "white",
    },
    backgroundColor: "white",
    width: "70%",
    height: "40%",
    // border: "1px solid white",
    // marginTop: "5px",
    color: "#538bdb",
    boxShadow: "-2px 4px 4px #00000064",
    borderRadius: "100%",
  };

  const toggleButtonStyleAlt = {
    "&.Mui-selected": { backgroundColor: "#538bdb", width: "70%" },
    "&.Mui-selected:hover": { backgroundColor: "#538bdb", color: "white" },
    "&:hover": {
      color: "white",
      backgroundColor: "gold",
    },
    backgroundColor: "#538dbd",
    height: "40%",
    width: "30%",
    // border: "1px solid black",
    // marginTop: "5px",
    color: "gold",
    boxShadow: "-2px 4px 4px #00000064",
    borderRadius: "100%",
  };

  const handleSettingsButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    animateSettingsModal();
  };

  const handleTutorialButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    animateLaunchModal();
  };

  const handleGeocodingSearchButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    animateMapSearchModal();
    setSiteSearchModalYCoord(0);
    setPicModalYCoord(0);
    setSiteModalYCoord(0);
    setSettingsModalYCoord(0);
    setLaunchModalYCoord(0);
    setAnchorModalYCoord(0);
    setSiteModal(false);
    setShowFilterer(false);
    if (pin.PicFile !== null) {
      removePhoto({
        filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
        fileName: `${pin.PicFile}`,
      });
    }
  };

  const handleDiveSiteSearchButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    animateSiteSearchModal();
    setMapSearchYCoord(0);
    setPicModalYCoord(0);
    // setSiteModalYCoord(0);
    setSettingsModalYCoord(0);
    setLaunchModalYCoord(0);
    setAnchorModalYCoord(0);
    setSiteModal(false);
    // setDiveSiteSearchModal(true);
    setShowFilterer(false)
    if (pin.PicFile !== null) {
      removePhoto({
        filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
        fileName: `${pin.PicFile}`,
      });
    }

    if (tutorialRunning) {
      if (itterator2 === 3) {
        setItterator2(itterator2 + 1);
      }
    }
  };

  const handlePhotoModalButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }
    clearPicModal();

    if (tutorialRunning) {
      if (itterator3 === 5) {
        setItterator3(itterator3 + 1);
      }
    }
  };

  const handleDiveSiteModalButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    clearSiteModal();

    if (tutorialRunning) {
      if (itterator2 === 9) {
        setItterator2(itterator2 + 1);
      }
    }
  };

  const handleAnchorButton = () => {
    if (
      itterator === 11 ||
      itterator === 13 ||
      itterator === 16 ||
      itterator === 19 ||
      itterator === 25 ||
      itterator2 === 3 ||
      itterator2 === 5 ||
      itterator2 === 9 ||
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23 ||
      itterator2 === 26 ||
      itterator3 === 5 ||
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 19 ||
      itterator3 === 22 ||
      itterator3 === 26
    ) {
      return;
    }

    setDivesTog(!divesTog);
  };
  let screenWidthInital = window.innerWidth;
  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener("resize", trackScreen);

  function trackScreen() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setMenuUp(false);
    setfabsYCoord(0);
    setPicModalYCoord(0);
    setSiteModalYCoord(0);
    setSettingsModalYCoord(0);
    setAnchorModalYCoord(0);
    setSiteModal(false);
    setLaunchModalYCoord(0);
    setMapSearchYCoord(0);
    setSiteSearchModalYCoord(0);
  }

  const picModalRef = useRef(null);
  const siteModalRef = useRef(null);
  const launchModalRef = useRef(null);
  const settingsModalRef = useRef(null);
  const introGuideModalRef = useRef(null);
  const secondGuideModalRef = useRef(null);
  const thirdGuideModalRef = useRef(null);
  const anchorModalRef = useRef(null);
  const siteSearchModalRef = useRef(null);
  const mapSearchModalRef = useRef(null);
  const [picModalYCoord, setPicModalYCoord] = useState(0);
  const [siteModalYCoord, setSiteModalYCoord] = useState(0);
  const [launchModalYCoord, setLaunchModalYCoord] = useState(0);
  const [settingsModalYCoord, setSettingsModalYCoord] = useState(0);
  const [introGuideModalYCoord, setIntroGuideModalYCoord] = useState(0);
  const [secondGuideModalYCoord, setSecondGuideModalYCoord] = useState(0);
  const [thirdGuideModalYCoord, setThirdGuideModalYCoord] = useState(0);
  const [siteSearchModalYCoord, setSiteSearchModalYCoord] = useState(0);
  const [mapSearchYCoord, setMapSearchYCoord] = useState(0);
  const [anchorModalYCoord, setAnchorModalYCoord] = useState(0);
  const [fabsYCoord, setfabsYCoord] = useState(0);
  const [menuUp, setMenuUp] = useState(false);

  const moveFabModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${fabsYCoord}px,0)` },
  });

  const movePicModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${picModalYCoord}px,0)` },
  });

  const moveSiteModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${siteModalYCoord}px,0)` },
  });

  const moveLaunchModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${launchModalYCoord}px,0)` },
  });

  const moveSettingsModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${settingsModalYCoord}px,0)` },
  });

  const moveIntroGuidModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${introGuideModalYCoord}px,0)` },
  });

  const moveSecondGuideModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${secondGuideModalYCoord}px,0)` },
  });

  const moveThirdGuideModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${thirdGuideModalYCoord}px,0)` },
  });

  const moveAnchorModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${anchorModalYCoord}px,0)` },
  });

  const moveSiteSearchModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${siteSearchModalYCoord}px,0)` },
  });

  const moveMapSearchModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${mapSearchYCoord}px,0)` },
  });

  // let modalHeigth = 700;

  const animateFabs = () => {
    let containerHeight =
      document.getElementsByClassName("fabContainer")[0].clientHeight;
    let buttonSectionHeight =
      document.getElementsByClassName("fabButtons")[0].clientHeight;

    if (fabsYCoord === 0) {
      if(windowHeight < 400 ) {
        setfabsYCoord(-containerHeight-(buttonSectionHeight/2));
      } else {
        setfabsYCoord(-containerHeight+(buttonSectionHeight/2));
      }
     
    } else {
      setfabsYCoord(0);
    }
  };

  const animateMenu = (e) => {
    animateFabs();
    setMenuUp(!menuUp);
  };

  const animatePicModal = () => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (picModalYCoord === 0) {
      // setPicModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      // setSiteModalYCoord(0);
      // setSettingsModalYCoord(0);
      // setLaunchModalYCoord(0);
      // setAnchorModalYCoord(0);
      // setSiteSearchModalYCoord(0);
      // setMapSearchYCoord(0);
      setSiteModal(false);
      setDsAddermodal(false);
      setSettingsModal(false);
      setGuideLaunchModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(false);
      setPicAddermodal(true);
      setShowFilterer(false);
      setTiles(true);
    } else {
      setPicAddermodal(false);
      // setPicModalYCoord(0);
      if (pin.PicFile !== null) {
        removePhoto({
          filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
          fileName: `${pin.PicFile}`,
        });
      }
    }
  };

  const clearPicModal = () => {
    animatePicModal();
    setPin({
      ...pin,
      PicFile: "",
      PicDate: "",
      Animal: "",
      Latitude: "",
      Longitude: "",
    });
    setPhotoFile(null);
  };

  const animateSiteModal = () => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (siteModalYCoord === 0) {
      setSiteModal(false);
      setPicAddermodal(false);
      setSettingsModal(false);
      setGuideLaunchModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(false);
      setDsAddermodal(true);
      setShowFilterer(false);
      setTiles(true);
      if (pin.PicFile !== null) {
        removePhoto({
          filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
          fileName: `${pin.PicFile}`,
        });
      }
    } else {
      setDsAddermodal(false);
    }
  };

  const clearSiteModal = () => {
    animateSiteModal();
    setAddSiteVals({
      ...addSiteVals,
      Site: "",
      Latitude: "",
      Longitude: "",
    });
  };

  const animateLaunchModal = () => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (launchModalYCoord === 0) {
      setSiteModal(false);
      setDsAddermodal(false);
      setPicAddermodal(false);
      setSettingsModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(false);
      setGuideLaunchModal(true);
      setShowFilterer(false);
      setTiles(true);
      if (pin.PicFile !== null) {
        removePhoto({
          filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
          fileName: `${pin.PicFile}`,
        });
      }
    } else {
      setGuideLaunchModal(false);
    }
  };

  const animateSettingsModal = () => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (settingsModalYCoord === 0) {
      setSiteModal(false);
      setDsAddermodal(false);
      setPicAddermodal(false);
      setGuideLaunchModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(false);
      setSettingsModal(true);
      setShowFilterer(false);
      setTiles(true);
      if (pin.PicFile !== null) {
        removePhoto({
          filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
          fileName: `${pin.PicFile}`,
        });
      }
    } else {
      setSettingsModal(false);
    }
  };

  const animateIntroGuideModal = () => {
    if (introGuideModalYCoord === 0) {
      setIntroGuideModalYCoord(-windowHeight);
    } else {
      setIntroGuideModalYCoord(0);
    }
  };

  const animateSecondGuideModal = () => {
    if (secondGuideModalYCoord === 0) {
      setSecondGuideModalYCoord(-windowHeight);
    } else {
      setSecondGuideModalYCoord(0);
    }
  };

  const animateThirdGuideModal = () => {
    if (thirdGuideModalYCoord === 0) {
      setThirdGuideModalYCoord(-windowHeight);
    } else {
      setThirdGuideModalYCoord(0);
    }
  };

  const animateAnchorModal = () => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (anchorModalYCoord === 0) {
      setDsAddermodal(false);
      setPicAddermodal(false);
      setSettingsModal(false);
      setGuideLaunchModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(false);
      setSiteModal(true);
      setShowFilterer(false);
      setTiles(true);
      if (pin.PicFile !== null) {
        removePhoto({
          filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
          fileName: `${pin.PicFile}`,
        });
      }
    } else {
      setSiteModal(false);
    }
  };

  const animateSiteSearchModal = () => {
    let modalHeigth =
      document.getElementsByClassName("searchModalDiv")[0].clientHeight;

    if (siteSearchModalYCoord === 0) {
      setSiteModal(false);
      setDsAddermodal(false);
      setPicAddermodal(false);
      setSettingsModal(false);
      setGuideLaunchModal(false);
      setMapSearchModal(false);
      setDiveSiteSearchModal(true);
      setShowFilterer(true);
      setTiles(true);
    } else {
      setDiveSiteSearchModal(false);
    }
  };

  const animateMapSearchModal = () => {
    let modalHeigth =
      document.getElementsByClassName("searchModalDiv")[0].clientHeight;

    if (mapSearchYCoord === 0) {
      setSiteModal(false);
      setDsAddermodal(false);
      setPicAddermodal(false);
      setSettingsModal(false);
      setGuideLaunchModal(false);
      setDiveSiteSearchModal(false);
      setMapSearchModal(true);
      setShowFilterer(true);
      setTiles(true);
    } else {
      setMapSearchModal(false);
    }
  };

  const animatePulltab = () => {
    console.log(showFilterer)
    setDsAddermodal(false);
    setPicAddermodal(false);
    setSettingsModal(false);
    setGuideLaunchModal(false);
    setDiveSiteSearchModal(false);
    setMapSearchModal(false);
    setSiteModal(false);
    setShowFilterer(!showFilterer);
  };

  useEffect(() => {
    if (!showFilterer) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [showFilterer]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (siteModal) {
      setAnchorModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setPicModalYCoord(0);
      setSiteModalYCoord(0);
      setSettingsModalYCoord(0);
      setLaunchModalYCoord(0);
      setMapSearchYCoord(0);
      setSiteSearchModalYCoord(0);
      setShowFilterer(false)
    }

    if (!siteModal) {
      setAnchorModalYCoord(0);
    }
  }, [siteModal]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (dsAdderModal) {
      setSiteModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setPicModalYCoord(0);
      setAnchorModalYCoord(0);
      setSettingsModalYCoord(0);
      setLaunchModalYCoord(0);
      setMapSearchYCoord(0);
      setSiteSearchModalYCoord(0);
    }

    if (!dsAdderModal) {
      setSiteModalYCoord(0);
    }
  }, [dsAdderModal]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (picAdderModal) {
      setPicModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setAnchorModalYCoord(0);
      setSiteModalYCoord(0);
      setSettingsModalYCoord(0);
      setLaunchModalYCoord(0);
      setMapSearchYCoord(0);
      setSiteSearchModalYCoord(0);
    }

    if (!picAdderModal) {
      setPicModalYCoord(0);
    }
  }, [picAdderModal]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (settingsModal) {
      setSettingsModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setAnchorModalYCoord(0);
      setSiteModalYCoord(0);
      setPicModalYCoord(0);
      setLaunchModalYCoord(0);
      setMapSearchYCoord(0);
      setSiteSearchModalYCoord(0);
    }

    if (!settingsModal) {
      setSettingsModalYCoord(0);
    }
  }, [settingsModal]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("picModalDiv")[0].clientHeight;

    if (guideLaunchModal) {
      setLaunchModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setAnchorModalYCoord(0);
      setSiteModalYCoord(0);
      setPicModalYCoord(0);
      setSettingsModalYCoord(0);
      setMapSearchYCoord(0);
      setSiteSearchModalYCoord(0);
    }

    if (!guideLaunchModal) {
      setLaunchModalYCoord(0);
    }
  }, [guideLaunchModal]);

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("searchModalDiv")[0].clientHeight;

    if (diveSiteSearchModal) {
      setSiteSearchModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setAnchorModalYCoord(0);
      setSiteModalYCoord(0);
      setPicModalYCoord(0);
      setSettingsModalYCoord(0);
      setMapSearchYCoord(0);
      setLaunchModalYCoord(0);
    }

    if (!diveSiteSearchModal) {
      setSiteSearchModalYCoord(0);
    }
  }, [diveSiteSearchModal])

  useEffect(() => {
    let modalHeigth =
      document.getElementsByClassName("searchModalDiv")[0].clientHeight;

    if (mapSearchModal) {
      setMapSearchYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      setAnchorModalYCoord(0);
      setSiteModalYCoord(0);
      setPicModalYCoord(0);
      setSettingsModalYCoord(0);
      setSiteSearchModalYCoord(0);
      setLaunchModalYCoord(0);
    }

    if (!mapSearchModal) {
      setMapSearchYCoord(0);
    }
  }, [mapSearchModal])

  // useEffect(() => {
  //   let modalHeigth =
  //     document.getElementsByClassName("picModalDiv")[0].clientHeight;

  //   if (dsAdderModal) {
  //     setSiteModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
  //   }

  //   if (!dsAdderModal) {
  //     setSiteModalYCoord(0);
  //   }
  // }, [dsAdderModal]);

  // useEffect(() => {
  //   let modalHeigth =
  //     document.getElementsByClassName("picModalDiv")[0].clientHeight;

  //   if (picAdderModal) {
  //     setPicModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
  //   }

  //   if (!picAdderModal) {
  //     setPicModalYCoord(0);
  //   }
  // }, [picAdderModal]);

  return (
    <div className="mappagemaster">
      <div className="tutbarContainer" pointerEvents={"box-none"}>
        {tutorialRunning && (
          <div className="tutorialBar" pointerEvents={"box-none"}>
            <TutorialBar style={{ zIndex: 255 }} />
          </div>
        )}
      </div>

      {masterSwitch && (
        <div className="col2rowT">{/* <AnimalTopAutoSuggest /> */}</div>
      )}

      {masterSwitch && (
        <animated.div className="fabContainer" style={moveFabModal}>
          <div className="animateBox" onClick={(e) => animateMenu(e)}>
            <p className="animateFont">{menuUp ? "Hide Menu" : "Show Menu"}</p>
            {menuUp ? (
              <KeyboardArrowDownIcon
                sx={{
                  height: "3vh",
                  color: "white",
                  marginTop: "-2vh",
                  marginBottom: "1vh",
                }}
              />
            ) : (
              <KeyboardArrowUpIcon
                sx={{
                  height: "3vh",
                  color: "white",
                  marginTop: "-2vh",
                  marginBottom: "1vh",
                }}
              />
            )}
          </div>

          <div className="fabButtons">
            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={gearModal}
                  onChange={() => {
                    handleSettingsButton();
                  }}
                >
                  <SettingsIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Settings</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={guideModal}
                  onChange={() => {
                    handleTutorialButton();
                  }}
                >
                  <QuestionMarkIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Guides</p>
              </div>
            )}

            {masterSwitch && (
              <div
                className="gearBox"
                // style={{ display: "flex", flexDirection: "row" }}
              >
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={showGeoCoder}
                  onChange={() => {
                    handleGeocodingSearchButton();
                  }}
                >
                  <ExploreIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Map Search</p>
                {/* <Collapse
          in={showGeoCoder}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {locationSearchZone}
        </Collapse> */}
              </div>
            )}

            {masterSwitch && (
              <div
                className="gearBox"
                // style={{ display: "flex", flexDirection: "row" }}
              >
                <ToggleButton
                  sx={searButState ? toggleButtonStyleAlt : toggleButtonStyle}
                  value="check"
                  selected={showAnimalSearch}
                  onChange={() => {
                    handleDiveSiteSearchButton();
                  }}
                >
                  <TravelExploreIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Site Search</p>
                {/* <Collapse
              in={showAnimalSearch}
              orientation="horizontal"
              collapsedSize="0px"
            >
              {diveSiteSearchZone}
            </Collapse> */}
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={photButState ? toggleButtonStyleAlt : toggleButtonStyle}
                  value="check"
                  selected={picModal}
                  onChange={() => {
                    handlePhotoModalButton();
                  }}
                >
                  <PhotoCameraIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Photo Add</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={siteButState ? toggleButtonStyleAlt : toggleButtonStyle}
                  value="check"
                  selected={diveSiteModal}
                  onChange={() => {
                    handleDiveSiteModalButton();
                  }}
                >
                  <AddLocationAltIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Site Add</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                {" "}
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={divesTog}
                  onChange={() => {
                    handleAnchorButton();
                  }}
                >
                  <AnchorIcon sx={{ width: "3vw", height: "1.5vw" }} />
                </ToggleButton>
                <p className="buttonFont">Show/Hide</p>
              </div>
            )}
          </div>
        </animated.div>
      )}

      {masterSwitch && (
        <div className="col1row8" pointerEvents={"box-none"}>
          <PhotoMenu />
          <div className="filterer">
            {((areaPics && areaPics.length > 0) || isOpen) && (
              <div className="emptyBox">
                <Collapse
                  in={showFilterer}
                  orientation="vertical"
                  collapsedSize="0px"
                >
                  <div className="closer" pointerEvents={"box-none"}>
                    <PhotoFilterer />
                  </div>
                </Collapse>

                <div className="pullTab" onClick={() => animatePulltab()}></div>
                <AnimalTopAutoSuggest />
              </div>
            )}
          </div>
        </div>
      )}

      {masterSwitch && (
        <div className="histoBox" style={{ pointerEvents: "none" }}>
          <Histogram pointerEvents={"none"} />
        </div>
      )}

      <div className="col1rowB">
        <Collapse
          in={showAdminPortal}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {adminPortalZone}
        </Collapse>
        <Logo
          setShowAdminPortal={setShowAdminPortal}
          showAdminPortal={showAdminPortal}
        />
      </div>

      <div>
        <Home
          style={{
            // position: "absolute",
            zIndex: "1",
            height: "100%",
          }}
        ></Home>
      </div>

      <div className="just-testing2">
        <div
          className="colXrow1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <ToggleButton
            sx={[toggleButtonStyle, { width: "2vw", height: "4vh" }]}
            value="check"
            onClick={() => {
              setMapZoom(mapZoom + 1);
            }}
          >
            <AddIcon sx={{ height: "2vw", width: "2vw" }} />
          </ToggleButton>
        </div>

        <div
          className="colXrow2"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <ToggleButton
            sx={[toggleButtonStyle, { width: "2vw", height: "4vh" }]}
            value="check"
            onClick={() => {
              setMapZoom(mapZoom - 1);
            }}
          >
            <RemoveIcon sx={{ height: "2vw", width: "2vw" }} />
          </ToggleButton>
        </div>
      </div>

      {!masterSwitch && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            width: "90%",
            marginLeft: "10%",
            top: "5px",
            zIndex: "2",
          }}
        >
          <div
            style={{
              width: "90%",
              position: "relative",
              zIndex: "2",
              // backgroundColor: "green"
            }}
          >
            <Button
              onClick={returnToPicModal}
              sx={{
                "&:hover": { backgroundColor: "lightblue" },
                color: "gold",
                fontFamily: "Permanent Marker, cursive",
                fontSize: "2vw",
                width: "20vw",
                height: "80%",
                textAlign: "center",
                backgroundColor: "#538bdb",
                marginTop: "15px",
                borderRadius: "10px",
                boxShadow: " 5px 5px 5px 5px rgba(0,0,0, 0.7)",
                zIndex: 3,
              }}
            >
              Set Pin
            </Button>
          </div>
        </div>
      )}

      <animated.div
        className="picModalDiv"
        style={movePicModal}
        ref={picModalRef}
      >
        <PicUploader
          animatePicModal={animatePicModal}
          setPicModalYCoord={setPicModalYCoord}
        />
      </animated.div>

      <animated.div
        className="picModalDiv"
        style={moveSiteModal}
        ref={siteModalRef}
      >
        <SiteSubmitter
          animateSiteModal={animateSiteModal}
          setSiteModalYCoord={setSiteModalYCoord}
        />
      </animated.div>

      <animated.div
        className="picModalDiv"
        style={moveLaunchModal}
        ref={launchModalRef}
      >
        <HowToGuide
          animateLaunchModal={animateLaunchModal}
          animateIntroGuideModal={animateIntroGuideModal}
          animateSecondGuideModal={animateSecondGuideModal}
          animateThirdGuideModal={animateThirdGuideModal}
        />
      </animated.div>

      <animated.div
        className="picModalDiv"
        style={moveSettingsModal}
        ref={settingsModalRef}
      >
        <Settings animateSettingsModal={animateSettingsModal} />
      </animated.div>

      <animated.div
        className="guideModalDiv"
        style={moveIntroGuidModal}
        ref={introGuideModalRef}
        // onClick={() => setItterator(itterator + 1)}
      >
        <IntroTutorial
          animateIntroGuideModal={animateIntroGuideModal}
          setIntroGuideModalYCoord={setIntroGuideModalYCoord}
          animateSecondGuideModal={animateSecondGuideModal}
          setSecondGuideModalYCoord={setSecondGuideModalYCoord}
        />
      </animated.div>

      <animated.div
        className="guideModalDiv2"
        style={moveSecondGuideModal}
        ref={secondGuideModalRef}
        // onClick={() => setItterator(itterator + 1)}
      >
        <SecondTutorial
          animateSecondGuideModal={animateSecondGuideModal}
          setSecondGuideModalYCoord={setSecondGuideModalYCoord}
          setDsAddermodal={setDsAddermodal}
          animateThirdGuideModal={animateThirdGuideModal}
          setThirdGuideModalYCoord={setThirdGuideModalYCoord}
          setSiteModalYCoord={setSiteModalYCoord}
        />
      </animated.div>

      <animated.div
        className="guideModalDiv3"
        style={moveThirdGuideModal}
        ref={thirdGuideModalRef}
        // onClick={() => setItterator(itterator + 1)}
      >
        <ThirdTutorial
          animateThirdGuideModal={animateThirdGuideModal}
          setThirdGuideModalYCoord={setThirdGuideModalYCoord}
          setPicAddermodal={setPicAddermodal}
          setPicModalYCoord={setPicModalYCoord}
        />
      </animated.div>

      <animated.div
        className="anchorModalDiv"
        style={moveAnchorModal}
        ref={anchorModalRef}
      >
        <AnchorPics
          animateAnchorModal={animateAnchorModal}
          setAnchorModalYCoord={setAnchorModalYCoord}
        />
      </animated.div>

      <animated.div
        className="searchModalDiv"
        style={moveMapSearchModal}
        ref={mapSearchModalRef}
      >
        <MapSearchModal
          animateMapSearchModal={animateMapSearchModal}
          setMapSearchYCoord={setMapSearchYCoord}
          mapSearchYCoord={mapSearchYCoord}
        />
      </animated.div>

      <animated.div
        className="searchModalDiv"
        style={moveSiteSearchModal}
        ref={siteSearchModalRef}
      >
        <SiteSearchModal
          animateSiteSearchModal={animateSiteSearchModal}
          setSiteSearchModalYCoord={setSiteSearchModalYCoord}
        />
      </animated.div>

      {lightbox && (
        <Lightbox
          mainSrc={selectedPic}
          onCloseRequest={() => setLightbox(false)}
        />
      )}
    </div>
  );
});

export default MapPage;
