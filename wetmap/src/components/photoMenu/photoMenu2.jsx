import { AnimalContext } from "../contexts/animalContext";
import { useState, useContext, useEffect, useRef } from "react";
import { multiHeatPoints } from "../../supabaseCalls/heatPointSupabaseCalls";
import { getPhotosforMapArea } from "../../supabaseCalls/photoSupabaseCalls";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { HeatPointsContext } from "../contexts/heatPointsContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { TutorialContext } from "../contexts/tutorialContext";
import { AnchorModalContext } from "../contexts/anchorModalContext";
import { AreaPicsContext } from "../contexts/areaPicsContext";
import { SearchTextContext } from "../contexts/searchTextContext";
import "photoswipe/dist/photoswipe.css";
import { formatHeatVals } from "../../helpers/heatPointHelpers";
import "./photoMenu.css";
import PhotoMenuListItem from "./photoMenuListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ToggleButton from "@mui/material/ToggleButton";
import { animated, useSpring } from "react-spring";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

let waiter2;

const PhotoMenu = () => {
  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  const { boundaries } = useContext(MapBoundsContext);
  const { setHeatPts } = useContext(HeatPointsContext);
  const { areaPics, setAreaPics } = useContext(AreaPicsContext);
  const { textvalue, setTextValue } = useContext(SearchTextContext);

  const [selectedID, setSelectedID] = useState(null);

  const { itterator, setItterator } = useContext(IterratorContext);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { siteModal, setSiteModal } = useContext(AnchorModalContext);

  const filterPhotosForMapArea = async () => {
    if (boundaries) {
      if (boundaries[0] > boundaries[2]) {
        try {
          const AmericanPhotos = await getPhotosforMapArea({
            animal: textvalue,
            minLat: boundaries[1],
            maxLat: boundaries[3],
            minLng: -180,
            maxLng: boundaries[2],
          });
          const AsianPhotos = await getPhotosforMapArea({
            animal: textvalue,
            minLat: boundaries[1],
            maxLat: boundaries[3],
            minLng: boundaries[0],
            maxLng: 180,
          });

          let photos = [...AsianPhotos, ...AmericanPhotos];

          if (photos) {
            const animalArray = Array.from(
              new Set(photos.map((a) => a.label))
            ).map((label) => {
              return photos.find((a) => a.label === label);
            });

            setAreaPics(animalArray);
          }
        } catch (e) {
          console.log({ title: "Error", message: e.message });
        }
      } else {
        try {
          const photos = await getPhotosforMapArea({
            animal: textvalue,
            minLat: boundaries[1],
            maxLat: boundaries[3],
            minLng: boundaries[0],
            maxLng: boundaries[2],
          });
          if (photos) {
            const animalArray = Array.from(
              new Set(photos.map((a) => a.label))
            ).map((label) => {
              return photos.find((a) => a.label === label);
            });

            setAreaPics(animalArray);
          }
        } catch (e) {
          console.log({ title: "Error", message: e.message });
        }
      }
    }
  };

  const filterHeatPointsForMapArea = async () => {
    if (boundaries) {
      try {
        const localHeatPoints = await multiHeatPoints(
          {
            minLat: boundaries[1],
            maxLat: boundaries[3],
            minLng: boundaries[0],
            maxLng: boundaries[2],
          },
          animalVal
        );
        if (localHeatPoints) {
          setHeatPts(formatHeatVals(localHeatPoints));
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    }
  };

 

  useEffect(() => {
      clearTimeout(waiter2);
  
      if (tutorialRunning) {
        if (itterator === 19) {
          waiter2 = setTimeout(() => {
            setItterator(itterator + 2);
            setSiteModal(true)
          }, 2000);
        }
      }
  
    filterHeatPointsForMapArea();
  }, [animalVal]);

  useEffect(() => {
    filterPhotosForMapArea();
  }, [boundaries, textvalue]);

  let screenInital = window.innerWidth;
  let caddyWidthNew = {
    width: "90vw"
  }

  const [boxWidth, setBoxWidth] = useState(screenInital * 0.8);
  const [caddyWidth, setCaddyWidth] = useState((screenInital * 0.8)/4);

  // const [caddyWidth, setCaddyWidth] = useState(
  //   Math.floor(screenInital / 192) * 193 - 192
  // );

  window.addEventListener("resize", trackWidth);

  function trackWidth() {
    setBoxWidth(window.innerWidth * 0.8);
    setCaddyWidth(Math.floor((window.innerWidth * 0.8)/4));
    // setCaddyWidth(Math.floor(window.innerWidth / 192) * 193 - 192);
  }

  const wrapperRef = useRef(null);
  const caddyRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const [xCoord, setXCoord] = useState(0);
  const [numTiles, setNumbTiles] = useState(0);

  const onClicko = (direction) => {
 
    if(areaPics.length < 4) {
      setXCoord((4*caddyWidth - (areaPics.length*caddyWidth))/2)
    } else {
      if (direction === "shiftLeft") {
        //left shift aka left BUTTON clicked
        if (numTiles >= areaPics.length-4) {
          setXCoord(0)
          setNumbTiles(areaPics.length-4)
        } else if (numTiles < areaPics.length){
          setXCoord(xCoord + numTiles*caddyWidth)
          setNumbTiles(numTiles + 4)
        } 
        } else {
          //"shiftRight"  aka right BUTTON clicked
            if (numTiles >= 4) {
              setXCoord(xCoord - caddyWidth*4)
              setNumbTiles(numTiles-4)
            } else if (numTiles < 4){
              setXCoord(xCoord - numTiles*caddyWidth)
              setNumbTiles(0)
            } 
      
        setClicked(true);
      };
    }
}


  const move = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${xCoord}px,0,0)` },
  });

  useEffect(() => {
    if (!clicked) return;

    return () => {
      setClicked(false);
    };
  }, [xCoord]);

  useEffect(() => {
    setXCoord(0);
    setClicked(false);
    setNumbTiles(areaPics.length-4)

    if(areaPics.length < 4){
      setXCoord((4*caddyWidth - (areaPics.length*caddyWidth))/2)
    }
  }, [areaPics.length]);

  const toggleButtonStyle = {
    "&.Mui-selected": { backgroundColor: "gold" },
    "&.Mui-selected:hover": { backgroundColor: "gold" },
    backgroundColor: "transparent",
    height: "48px",
    width: "48px",
    marginTop: "5px",
    color: "white",
    borderRadius: "100%",
  };

  return (
    // <div className="masterDivX" style={{ width: boxWidth }}>
    <div className="masterDivX">
      <ToggleButton
        className="backTog"
        sx={toggleButtonStyle}
        ref={leftButtonRef}
        onClick={() => onClicko("shiftLeft")}
        value="web"
      >
        <ArrowBackIosIcon />
      </ToggleButton>
      {/* <div className="picScollY" style={{ width: caddyWidth }} ref={wrapperRef} value="web"> */}
      <div className="picScollY" ref={wrapperRef} value="web">
        <animated.div
          className="picScollX"
          // style={({ width: caddyWidth }, move)}
          style={(move)}
          ref={caddyRef}
        >
          {areaPics &&
            areaPics.map((pic) => {
              return (
                <PhotoMenuListItem
                  key={pic.id}
                  id={pic.id}
                  name={pic.label}
                  photoURL={pic.photoFile}
                  setAnimalVal={setAnimalVal}
                  animalVal={animalVal}
                  setSelectedID={setSelectedID}
                  selectedID={selectedID}
                  caddyWidth={caddyWidth}
                />
              );
            })}
        </animated.div>
      </div>
      {areaPics.length === 0 && (
            <div className="emptyPhotos">
              No Sea Creatures have been added for this area yet
            </div>
          )}
      <ToggleButton
        className="backTog"
        sx={toggleButtonStyle}
        ref={rightButtonRef}
        value="web"
        onClick={() => onClicko("shiftRight")}
      >
        <ArrowForwardIosIcon />
      </ToggleButton>
    </div>
  );
};

export default PhotoMenu;
