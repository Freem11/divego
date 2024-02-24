import "./photoMenu.css";
import { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { AnchorModalContext } from "../contexts/anchorModalContext";
import { DiveSiteAdderModalContext } from "../contexts/diveSiteAdderModalContext";
import { PicAdderModalContext } from "../contexts/picAdderModalContext";
import { DiveSiteSearchModalContext } from "../contexts/diveSiteSearchModalContext";
import { MapSearchModalContext } from "../contexts/mapSearchModalContext";
import { GuideLaunchModalContext } from "../contexts/guideLaunchModalContext";
import { SettingsModalContext } from "../contexts/settingsModalContext";
import { CarrouselTilesContext } from "../contexts/carrouselTilesContext";

const handleDragStart = (e) => e.preventDefault();

const PhotoMenuListItem = (props) => {
  const {
    id,
    setAnimalVal,
    animalVal,
    name,
    photoURL,
    selectedID,
    setSelectedID,
    tileWidth,
    setTileWidth,
    boxWidth,
    setBoxWidth,
    tilesShifted
  } = props;

  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const { dsAdderModal, setDsAddermodal } = useContext(
    DiveSiteAdderModalContext
  );
  const { picAdderModal, setPicAddermodal } = useContext(PicAdderModalContext);
  const { diveSiteSearchModal, setDiveSiteSearchModal } = useContext(
    DiveSiteSearchModalContext
  );
  const { mapSearchModal, setMapSearchModal } = useContext(
    MapSearchModalContext
  );
  const { guideLaunchModal, setGuideLaunchModal } = useContext(
    GuideLaunchModalContext
  );
  const { settingsModal, setSettingsModal } = useContext(SettingsModalContext);
  const { tiles, setTiles } = useContext(CarrouselTilesContext);

  let photoName = photoURL.split("/").pop();

  const tileRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [yCoord, setYCoord] = useState(0);
  const [scale, setScale] = useState(1);
  const [zdex, setZdex] = useState(0);
  const [xCoord, setXCoord] = useState(0);

  const handleSelect = (name) => {

    setDsAddermodal(false);
    setPicAddermodal(false);
    setSettingsModal(false);
    setGuideLaunchModal(false);
    setDiveSiteSearchModal(false);
    setMapSearchModal(false);
    setSiteModal(false);

    if (animalVal.includes(name)) {
      setAnimalVal(animalVal.filter((item) => item !== name));
    } else {
      setAnimalVal([...animalVal, name]);
    }
  };

  let screenWidthInital = window.innerWidth;
  let screenHeigthInital = window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener("resize", trackDimensions);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  useEffect(() => {
    if (selectedID !== id) {
      pressReleaseAnimations();
    }
  }, [selectedID]);

  const [windowW, setWindowW] = useState(window.innerWidth);
  const [windowH, setWindowH] = useState(window.innerHeight);

  window.addEventListener("resize", trackWidth);

  function trackWidth() {
    setWindowW(window.innerWidth);
    setWindowH(window.innerHeight);
    setYCoord(0);
    setXCoord(0);
    setScale(1);
    setZdex(0);
  }

  const onDoubleClick = (e, id) => {
    setSelectedID(id);

    setDsAddermodal(false);
    setPicAddermodal(false);
    setSettingsModal(false);
    setGuideLaunchModal(false);
    setDiveSiteSearchModal(false);
    setMapSearchModal(false);
    setSiteModal(false);

    const WidthofTile = e.target.width;
    const HeightOfTile = e.target.height;

    const distanceToItemMiddleX = WidthofTile / 2 - (tilesShifted*WidthofTile);
    const centererPressX = e.target.x + distanceToItemMiddleX;
    const distanceToItemMiddleY = HeightOfTile / 2;
    const centererPressY = e.target.y + distanceToItemMiddleY;

    const moverWidth = (windowW / 2 - centererPressX) / 2.5;
    const moverHeigth = (windowH / 2 - centererPressY) / 3;

    if (scale === 1) {
      setYCoord(moverHeigth);
      setXCoord(moverWidth);
      setScale(2.5);
      setZdex(99);
      setClicked(true);
    } else {
      setYCoord(0);
      setXCoord(0);
      setScale(1);
      setZdex(0);
      setClicked(true);
    }
  };

  const pressReleaseAnimations = () => {
    setYCoord(0);
    setXCoord(0);
    setScale(1);
    setZdex(0);
  };

  useEffect(() => {
    if (tiles){
      pressReleaseAnimations()
      setTiles(false)
    }
  }, [tiles]);

  
  useEffect(() => {
    if (selectedID !== id) {
      pressReleaseAnimations();
    }
  }, [selectedID]);

  useEffect(() => {
    if (!clicked) return;

    return () => {
      setClicked(false);
    };
  }, [yCoord]);

  const move = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: {
      scale: `${scale}`,
      transform: `translate3d(${xCoord}px,${yCoord}px,0)`,
    },
  });

  const picWidth = {
    width: tileWidth,
    height: "150%",
  };

  return (
    <animated.div
      key={id}
      className="pictureBoxA"
      ref={tileRef}
      style={move}
      onDoubleClick={(e) => onDoubleClick(e, id)}
      onClick={() => handleSelect(name)}
    >
      <div
        style={{ width: tileWidth }}
        className={animalVal.includes(name) ? "microsSelected" : "micros"}
      >
        <h4
          style={{ fontSize: "1vw" }}
          className={
            animalVal.includes(name)
              ? "animalLabelAreaSelected"
              : "animalLabelArea"
          }
        >
          {name}
        </h4>
      </div>
      <img
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        width={tileWidth}
        height={picWidth.height}
        onDragStart={handleDragStart}
        style={{
          marginLeft: "-1px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottom: "1px grey solid",
          borderLeft: "1px grey solid",
          borderRight: "1px grey solid",
          objectFit: "cover",
          zIndex: 500
        }}
      />
    </animated.div>
  );
};

export default PhotoMenuListItem;
