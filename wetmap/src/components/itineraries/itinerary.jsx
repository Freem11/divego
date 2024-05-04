import React, { useState, useContext, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { SitesArrayContext } from "../contexts/sitesArrayContext";
import { CoordsContext } from "../contexts/mapCoordsContext";
import { ZoomHelperContext } from "../contexts/zoomHelperContext";
import { MinorContext } from "../contexts/minorContext";
import { MasterContext } from "../contexts/masterContext";
import "./itinerary.css";
import { getDiveSitesByIDs } from "../../supabaseCalls/diveSiteSupabaseCalls";
import gold from "../../images/mapIcons/AnchorGold.png";
import diveFlag from "../../images/diveflag.png";

export default function Itinerary(props) {
  const { itinerary, selectedID, setSelectedID, setShopModal } = props;
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);

  const [hiddenHeigth, setHiddenHeigth] = useState(0);

  const heightChange = useSpring({
    from: { height: 0 },
    to: { height: hiddenHeigth },
  });

  const startMoreInfoAnimation = (id) => {
    setSelectedID(id);

    if (hiddenHeigth === 0) {
      setHiddenHeigth(150);
    } else {
      setHiddenHeigth(0);
    }
  };

  const releaseMoreInfoAnimations = () => {
    setHiddenHeigth(0);
  };

  useEffect(() => {
    if (selectedID !== itinerary.id) {
      releaseMoreInfoAnimations();
    }
  }, [selectedID]);

  const flipMap = async (siteList) => {
    setSitesArray(siteList);
    let itinerizedDiveSites = await getDiveSitesByIDs(JSON.stringify(siteList));

    let lats = [];
    let lngs = [];
    itinerizedDiveSites.forEach((site) => {
      lats.push(site.lat);
      lngs.push(site.lng);
    });
    let moveLat = lats.reduce((acc, curr) => acc + curr, 0) / lats.length;
    let moveLng = lngs.reduce((acc, curr) => acc + curr, 0) / lngs.length;
    setZoomHelper(true);
    setShopModal(false);
    setMasterSwitch(false);
    setMapCoords([moveLat, moveLng]);
  };

  return (
    <div className="masterBox" key={itinerary.id}>
      <div className="shadowbox">
        <div className="moreBox">
          <p className="tripName">{itinerary.tripName}</p>
          <p
            className="opener"
            onClick={() => startMoreInfoAnimation(itinerary.id)}
          >
            More Info
          </p>
        </div>
        <div className="buttonBox">
          <div
            className="sitesButton"
            onClick={() => flipMap(itinerary.siteList)}
          >
            <img src={gold} style={{ height: "30px", width: "30px" }} />
          </div>
          <div className="bookButton">
            <img src={diveFlag} style={{ height: "30px", width: "30px" }} />
          </div>
        </div>
      </div>
      <animated.div className="extraBox" style={heightChange}>
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
