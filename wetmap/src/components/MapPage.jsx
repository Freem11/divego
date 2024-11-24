import React from 'react';
import { animated, useSpring } from 'react-spring';
import Home from './googleMap';
import SearchTool from './searchTool/index';
import SiteSubmitter from './newModals/siteSubmitter';
import HowToGuide from './modals/howToGuide';
import UserProfileModal from './modals/userProfileModal';
import Settings from './modals/setting';
import PhotoMenu from './photoMenu/photoMenu2';
import PhotoFilterer from './photoMenu/photoFilter';
import { useState, useContext, useEffect, useRef } from 'react';
import { grabProfileById } from './../supabaseCalls/accountSupabaseCalls';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import Collapse from '@mui/material/Collapse';
import ExploreIcon from '@mui/icons-material/Explore';
import AnchorIcon from '@mui/icons-material/Anchor';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DiveSitesContext } from './contexts/diveSitesContext';
import { AnimalRevealContext } from './contexts/animalRevealContext';
import { MasterContext } from './contexts/masterContext';
import { MinorContext } from './contexts/minorContext';
import { CoordsContext } from './contexts/mapCoordsContext';
import { SelectedShopContext } from './contexts/selectedShopContext';
import { ZoomContext } from './contexts/mapZoomContext';
import { UserProfileContext } from './contexts/userProfileContext';
import { SessionContext } from './contexts/sessionContext';
import { PinContext } from './contexts/staticPinContext';
import { DiveSpotContext } from './contexts/diveSpotContext';
import { ModalSelectContext } from './contexts/modalSelectContext';
import { AnchorModalContext } from './contexts/anchorModalContext';
import { ShopModalContext } from './contexts/shopModalContext';
import { SitesArrayContext } from './contexts/sitesArrayContext';
import { ZoomHelperContext } from './contexts/zoomHelperContext';
import { DiveSiteAdderModalContext } from './contexts/diveSiteAdderModalContext';
import { PullTabContext } from './contexts/pullTabContext';
import { TutorialContext } from './contexts/tutorialContext';
import { IterratorContext } from './contexts/iterratorContext';
import { Iterrator2Context } from './contexts/iterrator2Context';
import { Iterrator3Context } from './contexts/iterrator3Context';
import { AreaPicsContext } from './contexts/areaPicsContext';
import IntroTutorial from './guides/introTutorial';
import SecondTutorial from './guides/secondTutorial';
import ThirdTutorial from './guides/thirdTutorial'; ;
import './mapPage.css';
import AnimalTopAutoSuggest from './animalTags/animalTagContainer';
import Histogram from './histogram/histogramBody';
import TutorialBar from './guideBar/tutorialBarContainer';
import { ModalContext } from './contexts/modalContext';
import Modal from './reusables/modal/modal';
import { ModalWindowSize } from './reusables/modal/constants';

const MapPage = React.memo(function MapPage() {
  const { activeSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);
  const { setZoomHelper } = useContext(ZoomHelperContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const { showAnimalSearch } = useContext(AnimalRevealContext);
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { selectedShop } = useContext(SelectedShopContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { setMapCoords } = useContext(CoordsContext);
  const { chosenModal } = useContext(ModalSelectContext);

  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { itterator, setItterator } = useContext(IterratorContext);
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);

  const { areaPics } = useContext(AreaPicsContext);
  const [isOpen, setIsOpen] = useState(false);

  const { setSitesArray } = useContext(SitesArrayContext);
  const { setSiteModal } = useContext(AnchorModalContext);
  const { setShopModal } = useContext(ShopModalContext);

  const { setDsAddermodal } = useContext(
    DiveSiteAdderModalContext,
  );
  const { showFilterer, setShowFilterer } = useContext(PullTabContext);
  const { modalShow, modalResume } = useContext(ModalContext);

  const returnToPicModal = () => {
    modalResume();
    setMasterSwitch(true);
    if (chosenModal === 'DiveSite') {
      if (tutorialRunning) {
        if (itterator2 === 19) {
          setItterator2(itterator2 + 1);
          animateSecondGuideModal();
        }
      }
    } else if (chosenModal === 'Photos') {
      if (tutorialRunning) {
        if (itterator3 === 19) {
          setItterator3(itterator3 + 1);
          animateThirdGuideModal();
        }
      }
    }
  };

  const onShopNavigate = () => {
    setSiteModal(false);
    setShopModal(true);
    setMapCoords([selectedShop[0].lat, selectedShop[0].lng]);
    setMasterSwitch(true);
    setMinorSwitch(true);
    setZoomHelper(true);
    setSitesArray([]);
  };

  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId = activeSession.user.id;
      try {
        const success = await grabProfileById(sessionUserId);
        if (success) {
          let bully = success[0] && success[0].UserName;
          if (bully == null || bully === '') {
            setIntroGuideModalYCoord(-window.innerHeight);
            setTutorialRunning(true);
            setItterator(0);
          } else {
            setProfile(success);
            setPin({
              ...pin,
              UserID:   success[0].UserID,
              UserName: success[0].UserName,
            });
            setAddSiteVals({
              ...addSiteVals,
              UserID:   success[0].UserID,
              UserName: success[0].UserName,
            });
          }
        }
      } catch (e) {
        console.log({ title: 'Error', message: e.message });
      }
    };

    getProfile();
  }, []);

  const sideLength = '3.5vw';
  const toggleButtonStyle = {
    '&.Mui-selected': {
      backgroundColor: '#538bdb',
      width:           sideLength,
      height:          sideLength,
    },
    '&.Mui-selected:hover': { backgroundColor: 'lightgrey', color: 'white' },
    '&:hover':              {
      color:           'lightgrey',
      backgroundColor: 'white',
    },
    'backgroundColor': 'white',
    'width':           sideLength,
    'height':          sideLength,
    'color':           '#538bdb',
    'boxShadow':       '-2px 4px 4px #00000064',
    'borderRadius':    '100%',
  };


  const handleProfileButton = () => {
    if (
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 3
      || itterator2 === 5
      || itterator2 === 9
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
    ) {
      return;
    }

    animateProfileModal();
  };

  const handleSettingsButton = () => {
    if (
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 3
      || itterator2 === 5
      || itterator2 === 9
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
    ) {
      return;
    }

    animateSettingsModal();
  };

  const handleTutorialButton = () => {
    if (
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 3
      || itterator2 === 5
      || itterator2 === 9
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
    ) {
      return;
    }

    animateLaunchModal();
  };

  const handleDiveSiteSearchButton = () => {
    if (
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 5
      || itterator2 === 9
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
    ) {
      return;
    }

    animateSiteSearchModal();

    if (tutorialRunning) {
      if (itterator2 === 3) {
        setItterator2(itterator2 + 1);
      }
    }
  };

  const handleDiveSiteModalButton = () => {
    if (
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 3
      || itterator2 === 5
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
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
      itterator === 11
      || itterator === 13
      || itterator === 16
      || itterator === 19
      || itterator === 25
      || itterator2 === 3
      || itterator2 === 5
      || itterator2 === 9
      || itterator2 === 13
      || itterator2 === 16
      || itterator2 === 19
      || itterator2 === 23
      || itterator2 === 26
      || itterator3 === 5
      || itterator3 === 8
      || itterator3 === 11
      || itterator3 === 14
      || itterator3 === 16
      || itterator3 === 19
      || itterator3 === 22
      || itterator3 === 26
    ) {
      return;
    }

    setDivesTog(!divesTog);
  };


  const introGuideModalRef = useRef(null);
  const secondGuideModalRef = useRef(null);
  const thirdGuideModalRef = useRef(null);

  const [introGuideModalYCoord, setIntroGuideModalYCoord] = useState(0);
  const [secondGuideModalYCoord, setSecondGuideModalYCoord] = useState(0);
  const [thirdGuideModalYCoord, setThirdGuideModalYCoord] = useState(0);
  const [fabsYCoord, setfabsYCoord] = useState(0);
  const [menuUp, setMenuUp] = useState(false);

  const moveFabModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${fabsYCoord}px,0)` },
  });

  const moveIntroGuidModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${introGuideModalYCoord}px,0)` },
  });

  const moveSecondGuideModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${secondGuideModalYCoord}px,0)` },
  });

  const moveThirdGuideModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${thirdGuideModalYCoord}px,0)` },
  });


  const animateFabs = () => {
    let containerHeight = document.getElementsByClassName('fabContainer')[0]
      .clientHeight;
    let buttonSectionHeight = document.getElementsByClassName('fabButtons')[0]
      .clientHeight;

    if (fabsYCoord === 0) {
      if (window.innerHeight < 400) {
        setfabsYCoord(-containerHeight + buttonSectionHeight / 3);
      } else {
        setfabsYCoord(-containerHeight + buttonSectionHeight / 3);
      }
    } else {
      setfabsYCoord(0);
    }
  };

  const animateMenu = () => {
    animateFabs();
    setMenuUp(!menuUp);
  };

  const animateSiteModal = () => {
    modalShow(SiteSubmitter);
  };

  const clearSiteModal = () => {
    animateSiteModal();
    setAddSiteVals({
      ...addSiteVals,
      Site:      '',
      Latitude:  '',
      Longitude: '',
    });
  };

  const animateLaunchModal = () => {
    modalShow(() => {
      return (
        <HowToGuide
          animateLaunchModal={animateLaunchModal}
          animateIntroGuideModal={animateIntroGuideModal}
          animateSecondGuideModal={animateSecondGuideModal}
          animateThirdGuideModal={animateThirdGuideModal}
        />
      );
    }, { name: 'HowToGuide' });
  };

  const animateSettingsModal = () => {
    modalShow(Settings);
  };

  const animateProfileModal = () => {
    modalShow(UserProfileModal);
  };

  const animateIntroGuideModal = () => {
    if (introGuideModalYCoord === 0) {
      setIntroGuideModalYCoord(-window.innerHeight);
    } else {
      setIntroGuideModalYCoord(0);
    }
  };

  const animateSecondGuideModal = () => {
    if (secondGuideModalYCoord === 0) {
      setSecondGuideModalYCoord(-window.innerHeight);
    } else {
      setSecondGuideModalYCoord(0);
    }
  };

  const animateThirdGuideModal = () => {
    if (thirdGuideModalYCoord === 0) {
      setThirdGuideModalYCoord(-window.innerHeight);
    } else {
      setThirdGuideModalYCoord(0);
    }
  };

  const animateSiteSearchModal = () => {
    modalShow(SearchTool, {
      size: ModalWindowSize.S,
    });
  };

  const animatePulltab = () => {
    setShowFilterer(!showFilterer);
  };

  useEffect(() => {
    if (!showFilterer) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [showFilterer]);


  return (
    <div className="mappagemaster">
      <div className="tutbarContainer" pointerEvents="box-none">
        {tutorialRunning && (
          <div className="tutorialBar" pointerEvents="box-none">
            <TutorialBar style={{ zIndex: 255 }} />
          </div>
        )}
      </div>

      {masterSwitch && (
        <animated.div className="fabContainer" style={moveFabModal}>
          <div className="animateBox" onClick={e => animateMenu(e)}>
            <p className="animateFont">{menuUp ? 'Hide Menu' : 'Show Menu'}</p>
            {menuUp
              ? (
                  <KeyboardArrowDownIcon
                    sx={{
                      height:       '3vh',
                      color:        'white',
                      marginTop:    '-2vh',
                      marginBottom: '1vh',
                      cursor:       'pointer',
                    }}
                  />
                )
              : (
                  <KeyboardArrowUpIcon
                    sx={{
                      height:       '3vh',
                      color:        'white',
                      marginTop:    '-2vh',
                      marginBottom: '1vh',
                      cursor:       'pointer',
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
                  onChange={() => {
                    handleProfileButton();
                  }}
                >
                  <PersonIcon sx={{ width: '3vw', height: '2vw' }} />
                </ToggleButton>
                <p className="buttonFont">Profile</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  onChange={() => {
                    handleSettingsButton();
                  }}
                >
                  <SettingsIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Settings</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  onChange={() => {
                    handleTutorialButton();
                  }}
                >
                  <QuestionMarkIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Guides</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={showAnimalSearch}
                  onChange={() => {
                    handleDiveSiteSearchButton();
                  }}
                >
                  <ExploreIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Search Map</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  onChange={() => {
                    handleDiveSiteModalButton();
                  }}
                >
                  <AddLocationAltIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Site Add</p>
              </div>
            )}

            {masterSwitch && (
              <div className="gearBox">
                {' '}
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  selected={divesTog}
                  onChange={() => {
                    handleAnchorButton();
                  }}
                >
                  <AnchorIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Show/Hide</p>
              </div>
            )}
          </div>
        </animated.div>
      )}

      {masterSwitch && (
        <div className="col1row8" pointerEvents="box-none">
          <PhotoMenu />
          <div className="filterer">
            {((areaPics && areaPics.length > 0) || isOpen) && (
              <div className="emptyBox">
                <Collapse
                  in={showFilterer}
                  orientation="vertical"
                  collapsedSize="0px"
                >
                  <div className="closer" pointerEvents="box-none">
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
        <div className="histoBox" style={{ pointerEvents: 'none' }}>
          <Histogram pointerEvents="none" />
        </div>
      )}

      <div className="col1rowB">
      </div>

      <div>
        <Home
          style={{
            zIndex: '1',
            height: '100%',
          }}
        >
        </Home>
      </div>

      <div className="just-testing2">
        <div
          className="colXrow1"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <ToggleButton
            sx={[toggleButtonStyle, { width: '2vw', height: '4vh' }]}
            value="check"
            onClick={() => {
              setMapZoom(mapZoom + 1);
            }}
          >
            <AddIcon sx={{ height: '2vw', width: '2vw' }} />
          </ToggleButton>
        </div>

        <div
          className="colXrow2"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <ToggleButton
            sx={[toggleButtonStyle, { width: '2vw', height: '4vh' }]}
            value="check"
            onClick={() => {
              setMapZoom(mapZoom - 1);
            }}
          >
            <RemoveIcon sx={{ height: '2vw', width: '2vw' }} />
          </ToggleButton>
        </div>
      </div>

      {!masterSwitch && minorSwitch && (
        <div
          style={{
            display:       'flex',
            flexDirection: 'row',
            position:      'absolute',
            width:         '90%',
            marginLeft:    '10%',
            top:           '5px',
            zIndex:        '2',
          }}
        >
          <div
            style={{
              width:    '90%',
              position: 'relative',
              zIndex:   '2',
            }}
          >
            <Button
              onClick={returnToPicModal}
              sx={{
                '&:hover':         { backgroundColor: 'lightblue' },
                'color':           'gold',
                'fontFamily':      'Patrick Hand',
                'fontSize':        '2vw',
                'width':           '20vw',
                'height':          '80%',
                'textAlign':       'center',
                'backgroundColor': '#538bdb',
                'marginTop':       '15px',
                'borderRadius':    '10px',
                'boxShadow':       ' 5px 5px 5px 5px rgba(0,0,0, 0.7)',
                'zIndex':          3,
              }}
            >
              Set Pin
            </Button>
          </div>
        </div>
      )}

      {!masterSwitch && !minorSwitch && (
        <div
          style={{
            display:       'flex',
            flexDirection: 'row',
            position:      'absolute',
            width:         '90%',
            marginLeft:    '10%',
            top:           '5px',
            zIndex:        '2',
          }}
        >
          <div
            style={{
              width:    '90%',
              position: 'relative',
              zIndex:   '2',
            }}
          >
            <Button
              onClick={onShopNavigate}
              sx={{
                '&:hover':         { backgroundColor: 'lightblue' },
                'color':           'gold',
                'fontFamily':      'Patrick Hand',
                'fontSize':        '2vw',
                'width':           '20vw',
                'height':          '80%',
                'textAlign':       'center',
                'backgroundColor': '#538bdb',
                'marginTop':       '15px',
                'borderRadius':    '10px',
                'boxShadow':       ' 5px 5px 5px 5px rgba(0,0,0, 0.7)',
                'zIndex':          3,
              }}
            >
              Return to Shop
            </Button>
          </div>
        </div>
      )}


      <Modal />


      <animated.div
        className="guideModalDiv"
        style={moveIntroGuidModal}
        ref={introGuideModalRef}
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
      >
        <SecondTutorial
          animateSecondGuideModal={animateSecondGuideModal}
          setSecondGuideModalYCoord={setSecondGuideModalYCoord}
          setDsAddermodal={setDsAddermodal}
          animateThirdGuideModal={animateThirdGuideModal}
          setThirdGuideModalYCoord={setThirdGuideModalYCoord}
        />
      </animated.div>

      <animated.div
        className="guideModalDiv3"
        style={moveThirdGuideModal}
        ref={thirdGuideModalRef}
      >
        <ThirdTutorial
          animateThirdGuideModal={animateThirdGuideModal}
          setThirdGuideModalYCoord={setThirdGuideModalYCoord}
        />
      </animated.div>
    </div>
  );
});

export default MapPage;
