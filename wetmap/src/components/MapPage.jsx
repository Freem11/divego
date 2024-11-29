import React from 'react';
import { animated, useSpring } from 'react-spring';
import MapLoader from './googleMap';
import SearchTool from './searchTool/index';
import SiteSubmitter from './modals/siteSubmitter';
import HowToGuide from './modals/howToGuide';
import UserProfileModal from './modals/userProfileModal';
import Settings from './modals/setting';
import PhotoMenu from './photoMenu/photoMenu2';
import PhotoFilterer from './photoMenu/photoFilter';
import { useState, useContext, useEffect } from 'react';
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
import { CoordsContext } from './contexts/mapCoordsContext';
import { SelectedShopContext } from './contexts/selectedShopContext';
import { ZoomContext } from './contexts/mapZoomContext';
import { UserProfileContext } from './contexts/userProfileContext';
import { SessionContext } from './contexts/sessionContext';
import { PinContext } from './contexts/staticPinContext';
import { DiveSpotContext } from './contexts/diveSpotContext';
import { ModalSelectContext } from './contexts/modalSelectContext';
import { SitesArrayContext } from './contexts/sitesArrayContext';
import { PullTabContext } from './contexts/pullTabContext';
import { AreaPicsContext } from './contexts/areaPicsContext';
import './mapPage.css';
import AnimalTopAutoSuggest from './animalTags/animalTagContainer';
import Histogram from './histogram/histogramBody';
import { ModalContext } from './contexts/modalContext';
import Modal from './reusables/modal/modal';
import { ModalWindowSize } from './reusables/modal/constants';
import { MapConfigContext } from './contexts/mapConfigContext';


const MapPage = React.memo(function MapPage() {
  const { activeSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { selectedShop } = useContext(SelectedShopContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { setMapCoords } = useContext(CoordsContext);
  const { chosenModal } = useContext(ModalSelectContext);

  const { areaPics } = useContext(AreaPicsContext);
  const [isOpen, setIsOpen] = useState(false);

  const { setSitesArray } = useContext(SitesArrayContext);

  const { showFilterer, setShowFilterer } = useContext(PullTabContext);
  const { modalShow, modalResume } = useContext(ModalContext);

  const { mapConfig, setMapConfig } = useContext(MapConfigContext);

  const returnToPicModal = () => {
    modalResume();
    setMapConfig(0);
  };

  const onShopNavigate = () => {
    setMapCoords([selectedShop.lat, selectedShop.lng]);
    setMapConfig(0);
    setSitesArray([]);
  };

  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId = activeSession.user.id;
      try {
        const success = await grabProfileById(sessionUserId);
        if (success) {
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
    animateProfileModal();
  };

  const handleSettingsButton = () => {
    animateSettingsModal();
  };

  const handleTutorialButton = () => {
    animateLaunchModal();
  };

  const handleDiveSiteSearchButton = () => {
    animateSiteSearchModal();

  };

  const handleDiveSiteModalButton = () => {
    clearSiteModal();
  };

  const handleAnchorButton = () => {
    setDivesTog(!divesTog);
  };

  const [fabsYCoord, setfabsYCoord] = useState(0);
  const [menuUp, setMenuUp] = useState(false);

  const moveFabModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${fabsYCoord}px,0)` },
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
      {mapConfig === 0 && (
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
            {mapConfig === 0 && (
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

            {mapConfig === 0 && (
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

            {mapConfig === 0 && (
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

            {mapConfig === 0 && (
              <div className="gearBox">
                <ToggleButton
                  sx={toggleButtonStyle}
                  value="check"
                  onChange={() => {
                    handleDiveSiteSearchButton();
                  }}
                >
                  <ExploreIcon sx={{ width: '3vw', height: '1.5vw' }} />
                </ToggleButton>
                <p className="buttonFont">Search Map</p>
              </div>
            )}

            {mapConfig === 0 && (
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

            {mapConfig === 0 && (
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

      {[0, 2].includes(mapConfig) && (
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

      {mapConfig === 0 && (
        <div className="histoBox" style={{ pointerEvents: 'none' }}>
          <Histogram pointerEvents="none" />
        </div>
      )}

      <div className="col1rowB">
      </div>

      <div>
        <MapLoader
          style={{
            zIndex: '1',
            height: '100%',
          }}
        >
        </MapLoader>
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

      {mapConfig === 1 && (
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

      {mapConfig === 2 && (
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

    </div>
  );
});

export default MapPage;
