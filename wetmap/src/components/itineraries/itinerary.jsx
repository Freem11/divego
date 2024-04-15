import React, { useState, useContext, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { SitesArrayContext } from "../contexts/sitesArrayContext";
import { MapCenterContext } from "../contexts/mapCenterContext";
import { ZoomHelperContext } from "../contexts/zoomHelperContext";
import { MinorContext } from "../contexts/minorContext";
import { MasterContext } from "../contexts/masterContext";
import "./itinerary.css";
import { getDiveSitesByIDs } from "../../supabaseCalls/diveSiteSupabaseCalls";


export default function Itinerary(props) {
  const { itinerary, selectedID, setSelectedID , setShopModal} = props;
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);

  const moreInfoHeight = useSharedValue(0);

  const toVal = scale(100);

  const moreInfoHeigth = useDerivedValue(() => {
    return interpolate(moreInfoHeight.value, [0, 1], [0, toVal]);
  });

  const tabPullx = useAnimatedStyle(() => {
    return {
      height: moreInfoHeigth.value,
    };
  });

  const startMoreInfoAnimation = (id) => {
    setSelectedID(id);

    if (moreInfoHeight.value === 0) {
      moreInfoHeight.value = withTiming(1);
    } else {
      moreInfoHeight.value = withTiming(0);
    }
  };

  const releaseMoreInfoAnimations = () => {
    moreInfoHeight.value = withTiming(0);
  };

  useEffect(() => {
    if (selectedID !== itinerary.id) {
      releaseMoreInfoAnimations();
    }
  }, [selectedID]);

  const flipMap = async (siteList) => {
    setSitesArray(siteList)
    let itinerizedDiveSites = await getDiveSitesByIDs(JSON.stringify(siteList))
    
    let lats = []
    let lngs = []
    itinerizedDiveSites.forEach((site) => {
      lats.push(site.lat)
      lngs.push(site.lng)

    })
    let moveLat = lats.reduce((acc, curr) => acc + curr, 0) / lats.length
    let moveLng = lngs.reduce((acc, curr) => acc + curr, 0) / lngs.length
    setZoomHelper(true)
    setShopModal(false)
    setMasterSwitch(false)
    setMapCenter({
      lat: moveLat,
      lng: moveLng,
    });
   
    
  };

  return (
    <div className="masterBox" key={itinerary.id}>
      <div className="shadowbox">
        <div className="moreBox">
          <p className="tripName">{itinerary.tripName}</p>
            <p className="opener" onClick={() => startMoreInfoAnimation(itinerary.id)}>More Info</p>
        </div>
        <div className="buttonBox">
          <div className="sitesButton" onPress={() => flipMap(itinerary.siteList)}>
            {/* <FontAwesome5 name="anchor" size={24} color="gold" /> */}
          </div>
          <div className="bookButton">
          {/* <MaterialCommunityIcons
            name="diving-scuba-flag"
            size={24}
            color="red"
          /> */}
          </div>
        </div>
      </div>
      <animated.div className="extraBox" style={tabPullx}>
        <div className="topRail">
          <p className="dateText">
            {itinerary.startDate} to {itinerary.endDate}
          </p>
          <p className="priceText">{itinerary.price}</p>
        </div>

        <p className="lowerText">{itinerary.description}</p>
      </animated.div>
    </div>
  );
}
