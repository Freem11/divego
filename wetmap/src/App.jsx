import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import AuthenticationPage from "./components/authenticationPage";
import LoadingScreen from "./LoadingScreen";
import AdminPage from "./components/adminComponents/adminPage";
import "./App.css";
import { MasterContext } from "./components/contexts/masterContext";
import { SliderContext } from "./components/contexts/sliderContext";
import { AnimalContext } from "./components/contexts/animalContext";
import { ZoomContext } from "./components/contexts/mapZoomContext";
import { CoordsContext } from "./components/contexts/mapCoordsContext";
import { PinSpotContext } from "./components/contexts/pinSpotContext";
import { PinContext } from "./components/contexts/staticPinContext";
import { DiveSpotContext } from "./components/contexts/diveSpotContext";
import { PicModalContext } from "./components/contexts/picModalContext";
import { JumpContext } from "./components/contexts/jumpContext";
import { DiveSitesContext } from "./components/contexts/diveSitesContext";
import { AdminContext } from "./components/contexts/adminContext";
import { PictureContext } from "./components/contexts/pictureContext";
import { GeoCoderContext } from "./components/contexts/geoCoderContext";
import { AnimalRevealContext } from "./components/contexts/animalRevealContext";
import { AnimalMultiSelectContext } from "./components/contexts/animalMultiSelectContext";
import { SelectedDiveSiteContext } from "./components/contexts/selectedDiveSiteContext";
import { SelectedPicContext } from "./components/contexts/selectPicContext";
import { LightBoxContext } from "./components/contexts/lightBoxContext";
import { SessionContext } from "./components/contexts/sessionContext";
import { MapBoundsContext } from "./components/contexts/mapBoundariesContext";
import { HeatPointsContext } from "./components/contexts/heatPointsContext";
import { UserProfileContext } from "./components/contexts/userProfileContext";
import { AnchorModalContext } from "./components/contexts/anchorModalContext";
import { ModalSelectContext } from "./components/contexts/modalSelectContext";
import { IterratorContext } from "./components/contexts/iterratorContext";
import { Iterrator2Context } from "./components/contexts/iterrator2Context";
import { Iterrator3Context } from "./components/contexts/iterrator3Context";
import { TutorialResetContext } from "./components/contexts/tutorialResetContext";
import { TutorialContext } from "./components/contexts/tutorialContext";
import { ReverseContext } from "./components/contexts/reverseContext";
import { ChapterContext } from "./components/contexts/chapterContext";
import { TutorialModelContext } from "./components/contexts/tutorialModalContext";
import { SecondTutorialModalContext } from "./components/contexts/secondTutorialModalContext";
import { ThirdTutorialModalContext } from "./components/contexts/thirdTutorialModalContext";

import {
  sessionCheck,
  userCheck,
  sessionRefresh,
} from "./supabaseCalls/authenticateSupabaseCalls";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
//DiveLocker

let screenHeigthInital = window.innerHeight;

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [adminStat, setAdminStat] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [profile, setProfile] = useState([]);
  const [chosenModal, setChosenModal] = useState(null);
  const d = new Date();
  const [sliderVal, setSliderVal] = useState(d.getMonth() + 1);
  const [animalVal, setAnimalVal] = useState("");

  const [showGeoCoder, setShowGeoCoder] = useState(false);
  const [showAnimalSearch, setShowAnimalSearch] = useState(false);

  const [boundaries, setBoundaries] = useState(null);
  const [mapCoords, setMapCoords] = useState([49.316666, -123.066666]);
  const [dragPin, setDragPin] = useState({});

  const [animalMultiSelection, setAnimalMultiSelection] = useState([]);
  const [heatpts, setHeatPts] = useState([]);
  const [siteModal, setSiteModal] = useState(false);

  const [itterator, setItterator] = useState(null);
  const [itterator2, setItterator2] = useState(null);
  const [itterator3, setItterator3] = useState(null);
  const [tutorialReset, setTutorialReset] = useState(false);
  const [tutorialRunning, setTutorialRunning] = useState(false);
  const [movingBack, setMovingBack] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [guideModal, setGuideModal] = useState(false);
  const [secondGuideModal, setSecondGuideModal] = useState(false);
  const [thirdGuideModal, setThirdGuideModal] = useState(false);

  useLayoutEffect(() => {
    window.onload = async function () {
      try {
        const valuless = await localStorage.getItem("token");
        if (valuless) {
          const value = JSON.parse(valuless);
          if (value !== null) {
            if (value.session.refresh_token) {
              // console.log("token?", value.session.refresh_token)
              let newSession = await sessionRefresh(
                value.session.refresh_token
              );
              // console.log("new session", newSession)
              setActiveSession(newSession);
            }
          }
        }
        let sessionID = await sessionCheck();
        await localStorage.removeItem("token");
      } catch (error) {
        console.log("no dice:", error);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMapCoords([position.coords.latitude, position.coords.longitude]);
            setAppIsReady(true);
          },
          function (error) {
            console.log("location permissions denied", error.message);
            setAppIsReady(true);
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.log("unsupported");
        setAppIsReady(true);
      }
    };
  }, []);

  const [mapZoom, setMapZoom] = useState(10);

  const [picModal, setPicModal] = useState(false);

  const [lightbox, setLightbox] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);

  const [jump, setJump] = useState(false);

  const [divesTog, setDivesTog] = useState(true);

  const [pin, setPin] = useState({
    PicFile: "",
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
    UserID: "",
    UserName: "",
  });

  const [addSiteVals, setAddSiteVals] = useState({
    Site: "",
    Latitude: "",
    Longitude: "",
    UserID: "",
    UserName: "",
  });

  const [selectedDiveSite, setSelectedDiveSite] = useState({
    SiteName: "",
    Latitude: "",
    Longitude: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <div className="App" onLoad={onLayoutRootView}>
      <GoogleOAuthProvider clientId="803518830612-ullrhq9lgcfe9ornlc5tffhtch7o5t07.apps.googleusercontent.com">
        <AnchorModalContext.Provider value={{ siteModal, setSiteModal }}>
          <ThirdTutorialModalContext.Provider
            value={{
              thirdGuideModal,
              setThirdGuideModal,
            }}
          >
            <SecondTutorialModalContext.Provider
              value={{
                secondGuideModal,
                setSecondGuideModal,
              }}
            >
              <TutorialModelContext.Provider
                value={{
                  guideModal,
                  setGuideModal,
                }}
              >
                <ChapterContext.Provider value={{ chapter, setChapter }}>
                  <ReverseContext.Provider
                    value={{ movingBack, setMovingBack }}
                  >
                    <TutorialContext.Provider
                      value={{
                        tutorialRunning,
                        setTutorialRunning,
                      }}
                    >
                      <TutorialResetContext.Provider
                        value={{ tutorialReset, setTutorialReset }}
                      >
                        <Iterrator3Context.Provider
                          value={{ itterator3, setItterator3 }}
                        >
                          <Iterrator2Context.Provider
                            value={{ itterator2, setItterator2 }}
                          >
                            <IterratorContext.Provider
                              value={{ itterator, setItterator }}
                            >
                              <ModalSelectContext.Provider
                                value={{ chosenModal, setChosenModal }}
                              >
                                <UserProfileContext.Provider
                                  value={{ profile, setProfile }}
                                >
                                  <HeatPointsContext.Provider
                                    value={{ heatpts, setHeatPts }}
                                  >
                                    <AnimalMultiSelectContext.Provider
                                      value={{
                                        animalMultiSelection,
                                        setAnimalMultiSelection,
                                      }}
                                    >
                                      <MapBoundsContext.Provider
                                        value={{ boundaries, setBoundaries }}
                                      >
                                        <LightBoxContext.Provider
                                          value={{ lightbox, setLightbox }}
                                        >
                                          <SelectedPicContext.Provider
                                            value={{
                                              selectedPic,
                                              setSelectedPic,
                                            }}
                                          >
                                            <SelectedDiveSiteContext.Provider
                                              value={{
                                                selectedDiveSite,
                                                setSelectedDiveSite,
                                              }}
                                            >
                                              <MasterContext.Provider
                                                value={{
                                                  masterSwitch,
                                                  setMasterSwitch,
                                                }}
                                              >
                                                <DiveSpotContext.Provider
                                                  value={{
                                                    addSiteVals,
                                                    setAddSiteVals,
                                                  }}
                                                >
                                                  <PinSpotContext.Provider
                                                    value={{
                                                      dragPin,
                                                      setDragPin,
                                                    }}
                                                  >
                                                    <AnimalRevealContext.Provider
                                                      value={{
                                                        showAnimalSearch,
                                                        setShowAnimalSearch,
                                                      }}
                                                    >
                                                      <GeoCoderContext.Provider
                                                        value={{
                                                          showGeoCoder,
                                                          setShowGeoCoder,
                                                        }}
                                                      >
                                                        <PictureContext.Provider
                                                          value={{
                                                            photoFile,
                                                            setPhotoFile,
                                                          }}
                                                        >
                                                          <AdminContext.Provider
                                                            value={{
                                                              adminStat,
                                                              setAdminStat,
                                                            }}
                                                          >
                                                            <SliderContext.Provider
                                                              value={{
                                                                sliderVal,
                                                                setSliderVal,
                                                              }}
                                                            >
                                                              <AnimalContext.Provider
                                                                value={{
                                                                  animalVal,
                                                                  setAnimalVal,
                                                                }}
                                                              >
                                                                <ZoomContext.Provider
                                                                  value={{
                                                                    mapZoom,
                                                                    setMapZoom,
                                                                  }}
                                                                >
                                                                  <CoordsContext.Provider
                                                                    value={{
                                                                      mapCoords,
                                                                      setMapCoords,
                                                                    }}
                                                                  >
                                                                    <PinContext.Provider
                                                                      value={{
                                                                        pin,
                                                                        setPin,
                                                                      }}
                                                                    >
                                                                      <PicModalContext.Provider
                                                                        value={{
                                                                          picModal,
                                                                          setPicModal,
                                                                        }}
                                                                      >
                                                                        <JumpContext.Provider
                                                                          value={{
                                                                            jump,
                                                                            setJump,
                                                                          }}
                                                                        >
                                                                          <DiveSitesContext.Provider
                                                                            value={{
                                                                              divesTog,
                                                                              setDivesTog,
                                                                            }}
                                                                          >
                                                                            <SessionContext.Provider
                                                                              value={{
                                                                                activeSession,
                                                                                setActiveSession,
                                                                              }}
                                                                            >
                                                                              <BrowserRouter>
                                                                                <Routes>
                                                                                  <Route
                                                                                    path="/"
                                                                                    element={
                                                                                      activeSession ? (
                                                                                        <MapPage
                                                                                          screenHeigthInital={
                                                                                            screenHeigthInital
                                                                                          }
                                                                                        />
                                                                                      ) : (
                                                                                        <AuthenticationPage />
                                                                                      )
                                                                                    }
                                                                                    // element={
                                                                                    //   <MapPage screenHeigthInital={screenHeigthInital}/>
                                                                                    // }
                                                                                  />
                                                                                  <Route
                                                                                    path="/admin"
                                                                                    element={
                                                                                      <AdminPage />
                                                                                    }
                                                                                  />
                                                                                </Routes>
                                                                              </BrowserRouter>
                                                                            </SessionContext.Provider>
                                                                          </DiveSitesContext.Provider>
                                                                        </JumpContext.Provider>
                                                                      </PicModalContext.Provider>
                                                                    </PinContext.Provider>
                                                                  </CoordsContext.Provider>
                                                                </ZoomContext.Provider>
                                                              </AnimalContext.Provider>
                                                            </SliderContext.Provider>
                                                          </AdminContext.Provider>
                                                        </PictureContext.Provider>
                                                      </GeoCoderContext.Provider>
                                                    </AnimalRevealContext.Provider>
                                                  </PinSpotContext.Provider>
                                                </DiveSpotContext.Provider>
                                              </MasterContext.Provider>
                                            </SelectedDiveSiteContext.Provider>
                                          </SelectedPicContext.Provider>
                                        </LightBoxContext.Provider>
                                      </MapBoundsContext.Provider>
                                    </AnimalMultiSelectContext.Provider>
                                  </HeatPointsContext.Provider>
                                </UserProfileContext.Provider>
                              </ModalSelectContext.Provider>
                            </IterratorContext.Provider>
                          </Iterrator2Context.Provider>
                        </Iterrator3Context.Provider>
                      </TutorialResetContext.Provider>
                    </TutorialContext.Provider>
                  </ReverseContext.Provider>
                </ChapterContext.Provider>
              </TutorialModelContext.Provider>
            </SecondTutorialModalContext.Provider>
          </ThirdTutorialModalContext.Provider>
        </AnchorModalContext.Provider>
      </GoogleOAuthProvider>
      ;
    </div>
  );
}

export default App;
