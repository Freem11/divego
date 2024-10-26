import React, { useState, useContext, useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import './thirdTutorial.css';
import mantaIOS from '../../images/Manta32.png';
import seaLionGuy from '../../images/EmilioNeutral.png';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhotoIcon from '@mui/icons-material/Photo';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThirdTutorialModalContext } from '../contexts/thirdTutorialModalContext';
import { SessionContext } from '../contexts/sessionContext';
import { grabProfileById } from '../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../contexts/userProfileContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { JumpContext } from '../contexts/jumpContext';
import { PictureContext } from '../contexts/pictureContext';
import { Iterrator2Context } from '../contexts/iterrator2Context';
import { Iterrator3Context } from '../contexts/iterrator3Context';
import { TutorialContext } from '../contexts/tutorialContext';
import { TutorialResetContext } from '../contexts/tutorialResetContext';
import { ChapterContext } from '../contexts/chapterContext';
import { MasterContext } from '../contexts/masterContext';
import PicUploader from '../modals/picUploader';
import { cleanupPinPicture } from '../../helpers/picUploaderHelpers';
import { ModalContext } from '../contexts/modalContext';
import { PinContext } from '../contexts/staticPinContext';

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function ThirdTutorial(props) {
  const {
    setThirdGuideModalYCoord,
  } = props;

  window.addEventListener('resize', trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeigth, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { jump, setJump } = useContext(JumpContext);

  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);

  const { uploadedFile, setUploadedFile } = useContext(PictureContext);
  // const { diveSiteAdderModal, setDiveSiteAdderModal } =
  //   useContext(DSAdderContext);
  // const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const { thirdGuideModal, setThirdGuideModal } = useContext(
    ThirdTutorialModalContext,
  );
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { chapter, setChapter } = useContext(ChapterContext);
  const { tutorialReset, setTutorialReset } = useContext(TutorialResetContext);
  // const { mapCenter, setMapCenter } = useContext(MapCenterContext);
  const { setMasterSwitch } = useContext(MasterContext);
  const { modalShow, modalCancel } = useContext(ModalContext);
  const { pin, setPin } = useContext(PinContext);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (tutorialReset) {
      setItterator3(null);
      setTutorialRunning(false);
      setThirdGuideModal(false);
      setTutorialReset(false);
      resetTutorial();
      setChapter(null);
    }
  }, [tutorialReset]);

  let modalHeigth = 700;

  useEffect(() => {
    setMasterSwitch(true);
    let characterWidth = document.getElementsByClassName('character3')[0]
      .clientWidth;


    switch (chapter) {
      case 'Contributing photos overview':
        resetTutorial();
        setItterator3(3);
        setThirdGuideModalYCoord(-windowHeigth);
        setThirdGuideModal(true);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        // setPicAddermodal(false);
        setCameraY(2 * windowHeigth + (windowHeigth - 100) / 3);
        break;

      case 'Adding your photo':
        resetTutorial();
        setItterator3(6);
        setThirdGuideModalYCoord(-windowHeigth);
        setThirdGuideModal(true);
        setTutorialRunning(true);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        modalShow(PicUploader, {
          name:             'PictureUploader',
          onCancelCallback: () => cleanupPinPicture(pin),
        });
        break;

      case 'Name that sea creature!':
        resetTutorial();
        setItterator3(12);
        setThirdGuideModalYCoord(-windowHeigth);
        setThirdGuideModal(true);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        modalShow(PicUploader, {
          name:             'PictureUploader',
          onCancelCallback: () => cleanupPinPicture(pin),
        });
        break;

      case 'Dropping the pin':
        resetTutorial();
        setItterator3(15);
        setThirdGuideModalYCoord(-windowHeigth);
        setThirdGuideModal(true);
        setTimeout(() => {
          setCharacterX(-windowWidth + characterWidth * 1.2);
        }, 100);
        setTimeout(() => {
          setTextBoxY(-windowHeigth / 4);
        }, 300);
        modalShow(PicUploader, {
          name:             'PictureUploader',
          onCancelCallback: () => cleanupPinPicture(pin),
        });
        setPinY(2 * windowHeigth + (windowHeigth - 100) / 3);
        break;

      case 'Exit Guide':
        setThirdGuideModalYCoord(0);
        handleClearTutorial();
        setTutorialRunning(false);
        modalCancel();
        break;
    }
    setChapter(null);
  }, [chapter]);

  const handleClearTutorial = async () => {
    let profileCheck = await getProfile();
    let bully;

    if (profile) {
      bully = profile[0].UserName;
    }
    else {
      bully = '';
    }

    if (bully == null || bully === '') {
      return;
    }
    else {
      setTutorialReset(true);
    }
  };

  const resetTutorial = async () => {
    setCharacterX(0);
    setTextBoxY(0);
    setCameraY(0);
    setPhotoY(0);
    setPinY(0);
    setMantaY(0);
    setTutorialReset(false);
  };

  const getProfile = async () => {
    let sessionUserId = activeSession.user.id;
    // let sessionUserId = 'acdc4fb2-17e4-4b0b-b4a3-2a60fdfd97dd'
    try {
      const success = await grabProfileById(sessionUserId);
      if (success) {
        setProfile(success);
      }
    }
    catch (e) {
      console.log({ title: 'Error', message: e.message });
    }
  };

  const characterRef = useRef(null);
  const textBoxRef = useRef(null);
  const photoRef = useRef(null);
  const cameraRef = useRef(null);
  const calendarRef = useRef(null);
  const pinRef = useRef(null);
  const mantaRef = useRef(null);

  const [characterX, setCharacterX] = useState(0);
  const [textBoxY, setTextBoxY] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const [photoY, setPhotoY] = useState(0);
  const [calendarY, setCalendarY] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [mantaY, setMantaY] = useState(0);

  const text0
    = 'Hey welcome back again! Let\'s continue with the guide on how you can contribute to Scuba SEAsons!';
  const text1
    = 'This time, let\'s look at working with your sea creature sightings, in other words the photos of sea creatures you have taken on your dives ';
  const text2
    = 'At this point you have already seen that diver\'s photos make up the heat map and show up when you open a dive site that is near to a sighting';
  const text3
    = 'Now it\'s time for you to join your fellow divers! To add a photo, we first need to open up the photo adding form, under the photo icon. It looks like this';
  const text4 = 'Open it up and let\'s take a look!';
  const text5 = '';
  const text6
    = 'This is the photo adding form, as you can see there\'s a lot here, so let\'s start from the top and work our way down.';
  const text7
    = 'At the top you can see this big empty field and just below is the \'Choose an image\' button, click it to go into your computer\'s file browser and select one (preferably a sea creature of course!)';
  const text8 = '';
  const text9
    = 'As you can see, the photo you chose is now in the big empty field and, depending on the photo you may have seen, that the date, lat. and lng. fields are populated. Scuba SEAsons will pull that data off your photo if it carries that info. If not, don\'t worry we can add them manually.';
  const text10
    = 'In any case, let\'s assume you need to add in that info. First let\'s take care of the date, it\'s the next field down, click on it and set the date the photo was taken for us';
  const text11 = '';
  const text12
    = 'Great! Now that we have the correct date in place, let\'s move down to the next \'animal\' field. As we did with the date field click on it and this time a dropdown will pop up.';
  const text13
    = 'Start entering the name of the sea creature in your picture, if it already exists in Scuba SEAsons it will show up as a selectable option to help speed things along, but if it\'s completely new you will need to type it out.';
  const text14 = '';
  const text15
    = 'Wonderful! Now that the sea creature has its name, the only piece left is the GPS, since we are assuming that we don\'t have them, use the Pin Dropper button to open up the map so we can drop a pin!';
  const text16 = '';
  const text17
    = 'And here we are! As you can see we have returned to the map page and the manta ray draggable pin is waiting for us once again.';
  const text18
    = 'Let\'s pretend that one of the dive sites on the map is where your sea creature sighting took place, drag the manta pin to be on top of it\'s anchor and then tap the \'set pin\' button at the bottom';
  const text19 = '';
  const text20
    = 'As you can see Scuba SEAsons has taken the location of the pin you set and has given us its GPS coordinates!';
  const text21
    = 'Your sighting is now ready! All you need to do now is click the \'submit photo\' button at the top of the page to finish up!';
  const text22 = '';
  const text23
    = 'Bam! That\'s how you add a new sea creature sighting to Scuba SEAsons! As we did with the dive site guide, this entry was not submitted since it\'s a dry run, but you can from now on in the same way.';
  const text24
    = 'Just like with the Dive site submissions your sea creature sighting won\'t automatically be added to the map, the Scuba SEAsons team will verify your submission before committing to the map, but after that your photo will go in and be credited to you with your diver name that we setup back in the intro guide!';
  const text25
    = 'That\'s it for adding sea creature sightings to the app! This is currently the last guide so click anywhere else to close, and thanks for being a member of Scuba SEAsons, I look forward to seeing what amazing sea creatures you encounter on your dives!';
  const text26 = '';

  const [textRead, setTextRead] = useState('');
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
      itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 >= 26
    ) {
      return;
    }
    else {
      if (pushVal === 1 && itterator3 < feederArray.length - 1) {
        if (textPrinting) {
          setTextPrinting(false);
          textArray = '';
          setTextRead('');
          setTextRead(feederArray[itterator3]);
        }
        else {
          setItterator3(prev => prev + pushVal);
          setTextPrinting(true);
        }
      }

      if (pushVal === 1 && itterator3 === feederArray.length - 1) {
        setThirdGuideModal(false);
      }
    }
  };

  let textArray;

  function printOutText() {
    if (textArray.length > 0) {
      const charToConcat = textArray[0];
      setTextRead(prev => prev + charToConcat);
      textArray = textArray.slice(1);
    }
    else {
      setTextPrinting(false);
    }
  }

  function cleanUp() {
    clearInterval(textPrinter);
  }

  let textPrinter;
  useEffect(() => {
    setTextRead('');

    let textVal = feederArray[itterator3];
    if (textVal) {
      textArray = textVal.split('');
      if (textPrinting) {
        textPrinter = setInterval(printOutText, 80);
      }
      else {
        setTextRead(textVal);
      }
    }

    return () => cleanUp();
  }, [itterator3, textPrinting]);

  useEffect(() => {
    let characterWidth = document.getElementsByClassName('character3')[0]
      .clientWidth;

    let textBoxHeight = document.getElementsByClassName('talkbox3')[0]
      .clientHeight;

    if (itterator3 === 0) {
      setTimeout(() => {
        setCharacterX(-windowWidth + characterWidth * 1.2);
      }, 600);

      setTimeout(() => {
        setTextBoxY(-windowHeigth / 4);
      }, 1000);
    }

    if (itterator3 === 3) {
      setCameraY(2 * windowHeigth + (windowHeigth - 100) / 3);
    }

    if (itterator3 === 5) {
      setCameraY(0);
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
    }

    if (itterator3 === 6) {
      setThirdGuideModalYCoord(-windowHeigth);
      modalShow(PicUploader, {
        name:             'PictureUploader',
        onCancelCallback: () => cleanupPinPicture(pin),
      });
    }

    if (itterator3 === 7) {
      setPhotoY(2 * windowHeigth + (windowHeigth - 100) / 3);
    }

    if (itterator3 === 8) {
      setPhotoY(0);
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
    }

    if (itterator3 === 9) {
      setThirdGuideModalYCoord(-windowHeigth);
      // animateThirdGuideModal()
    }

    if (itterator3 === 11) {
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
    }

    if (itterator3 === 12) {
      setThirdGuideModalYCoord(-windowHeigth);
      modalShow(PicUploader, {
        name:             'PictureUploader',
        onCancelCallback: () => cleanupPinPicture(pin),
      });
    }

    if (itterator3 === 14) {
      setThirdGuideModalYCoord(0);
      modalShow(PicUploader, {
        name:             'PictureUploader',
        onCancelCallback: () => cleanupPinPicture(pin),
      });
    }

    if (itterator3 === 15) {
      moveMap({ lat: 50.03312256836453, lng: -125.27333546429873 });
      setThirdGuideModalYCoord(-windowHeigth);
      modalShow(PicUploader, {
        name:             'PictureUploader',
        onCancelCallback: () => cleanupPinPicture(pin),
      });
      setTimeout(() => {
        setPinY(2 * windowHeigth + (windowHeigth - 100) / 3);
      }, 1000);
    }

    if (itterator3 === 16) {
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
      setPinY(0);
    }

    if (itterator3 === 17) {
      setThirdGuideModalYCoord(-windowHeigth);
      // animateThirdGuideModal()
      setTimeout(() => {
        setMantaY(2 * windowHeigth + (windowHeigth - 120) / 3);
      }, 1000);
    }

    if (itterator3 === 19) {
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
      setMantaY(0);
    }

    if (itterator3 === 20) {
      setThirdGuideModalYCoord(-windowHeigth);
      // animateThirdGuideModal()
    }

    if (itterator3 === 22) {
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
    }

    if (itterator3 === 23) {
      setThirdGuideModalYCoord(-windowHeigth);
      // animateThirdGuideModal()
    }

    if (itterator3 === 26) {
      setTutorialRunning(false);
    }

    if (itterator3 === feederArray.length - 1) {
      setItterator3(null);
      setThirdGuideModalYCoord(0);
      // animateThirdGuideModal()
      setMapZoom(10);
      resetTutorial();
    }
  }, [itterator3]);

  const characterSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(${characterX}px,0,0)` },
  });

  const textBoxSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${textBoxY}px,0)` },
  });

  const cameraButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${cameraY}px,0)` },
  });

  const photoButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${photoY}px,0)` },
  });

  // Calendar???

  const pinButtonSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${pinY}px,0)` },
  });

  const mantaSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${mantaY}px,0)` },
  });

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator3 === null) {
        setItterator3(0);
      }
    }
  }, [thirdGuideModal]);

  const moveMap = (values) => {
    setMapCoords([values.lat, values.lng]);
    setJump(!jump);
  };

  return (
    <div className="wrapper3" onClick={() => setupText(1)}>
      <animated.div
        ref={characterRef}
        className="character3"
        style={characterSlide}
        pointerEvents="box-none"
      >
        <img
          src={seaLionGuy}
          style={{
            height: '100%',
            width:  '100%',
          }}
        />
      </animated.div>
      <animated.div ref={textBoxRef} className="talkbox3" style={textBoxSlide}>
        {textRead}
      </animated.div>
      <animated.div
        ref={cameraRef}
        className="camerabuttonwrapper"
        style={cameraButtonSlide}
      >
        <PhotoCameraIcon
          sx={{
            height:    '90%',
            width:     '90%',
            color:     '#538dbd',
            marginTop: '0.5vh',
          }}
        />
      </animated.div>
      <animated.div
        ref={photoRef}
        className="photobuttonwrapper"
        style={photoButtonSlide}
      >
        <PhotoIcon
          sx={{
            height:    '90%',
            width:     '90%',
            color:     '#538dbd',
            marginTop: '0.5vh',
          }}
        />
      </animated.div>

      <animated.div
        ref={pinRef}
        className="pinbuttonwrapper"
        style={pinButtonSlide}
      >
        <LocationOnIcon
          sx={{
            height: '100%',
            width:  '100%',
            color:  '#538dbd',
          }}
        />
      </animated.div>

      <animated.div ref={mantaRef} className="mantaWrapper" style={mantaSlide}>
        <img
          src={mantaIOS}
          style={{
            height: '100%',
            width:  '80%',
          }}
        />
      </animated.div>
    </div>
  );
}
