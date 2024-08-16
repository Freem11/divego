import "./App.scss";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import AuthenticationPage from "./components/authenticationPage";
import LoadingScreen from "./LoadingScreen";
import { getMostRecentPhoto } from "./supabaseCalls/photoSupabaseCalls";
import {
  sessionCheck,
  sessionRefresh,
} from "./supabaseCalls/authenticateSupabaseCalls";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./components/contexts/appContextProvider";
import { CoordsContext } from "./components/contexts/mapCoordsContext";
import { SessionContext } from "./components/contexts/sessionContext";
//DiveLocker

let screenHeigthInital = window.innerHeight;

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [mapCoords, setMapCoords] = useState([49.316666, -123.066666]);
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getSession().then((value) => {
        localStorage.setItem("token", JSON.stringify(value.data.session));
        setActiveSession(value.data.session);
      });
    }
    getUserData();
  }, []);

  const handleStartup = async() => {
    try {
      const valuless = localStorage.getItem("token");
      if (valuless) {
        const value = JSON.parse(valuless);
        if (value && value.session) {
          if (value.session.refresh_token) {
            let newSession = await sessionRefresh(
              value.session.refresh_token
            );
            setActiveSession(newSession);
          }
        }
      }
      await sessionCheck();
      localStorage.removeItem("token");
    } catch (error) {
      console.log("no dice:", error);
    }

    const photoLocation = await getMostRecentPhoto();
    if (photoLocation) {
      setMapCoords([photoLocation[0].latitude, photoLocation[0].longitude]);
      setAppIsReady(true);
    }
  };

  useLayoutEffect(() => {
    handleStartup()
  }, []);

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
        <AppContextProvider>
          <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
            <SessionContext.Provider
              value={{ activeSession, setActiveSession }}
            >
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      activeSession ? (
                        <MapPage screenHeigthInital={screenHeigthInital} />
                      ) : (
                        <AuthenticationPage />
                      )
                    }
                  />
                  {/* <Route
                    path="/admin"
                    element={
                      <AdminPage />
                    }
                  /> */}
                </Routes>
              </BrowserRouter>
            </SessionContext.Provider>
          </CoordsContext.Provider>
        </AppContextProvider>
      </GoogleOAuthProvider>
      ;
    </div>
  );
}

export default App;
