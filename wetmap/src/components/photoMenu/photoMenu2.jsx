import { AnimalContext } from "../contexts/animalContext";
import { useState, useContext, useEffect, useRef } from "react";
import { multiHeatPoints } from "../../supabaseCalls/heatPointSupabaseCalls";
import { getPhotosforMapArea } from "../../supabaseCalls/photoSupabaseCalls";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { HeatPointsContext } from "../contexts/heatPointsContext";
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

const PhotoMenu = () => {
  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  const { boundaries } = useContext(MapBoundsContext);
  const { setHeatPts } = useContext(HeatPointsContext);
  const [areaPics, setAreaPics] = useState([]);

  const [selectedID, setSelectedID] = useState(null);

  const filterPhotosForMapArea = async () => {
    if (boundaries) {
      if (boundaries[0] > boundaries[2]) {
        try {
          const AmericanPhotos = await getPhotosforMapArea({
            minLat: boundaries[1],
            maxLat: boundaries[3],
            minLng: -180,
            maxLng: boundaries[2],
          });
          const AsianPhotos = await getPhotosforMapArea({
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
    filterPhotosForMapArea();
  }, []);

  useEffect(() => {
    filterHeatPointsForMapArea();
  }, [animalVal]);

  useEffect(() => {
    filterPhotosForMapArea();
  }, [boundaries]);

  let screenInital = window.innerWidth;

  const [boxWidth, setBoxWidth] = useState(screenInital * 0.99);
  const [caddyWidth, setCaddyWidth] = useState(
    Math.floor(screenInital / 192) * 193 - 192
  );

  window.addEventListener("resize", trackWidth);

  function trackWidth() {
    setBoxWidth(window.innerWidth * 0.95);
    setCaddyWidth(Math.floor(window.innerWidth / 192) * 193 - 192);
  }

  const wrapperRef = useRef(null);
  const caddyRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const [xCoord, setXCoord] = useState(0);

  const onClicko = (direction) => {
    let maxLength = areaPics.length * 193;

    if (direction === "shiftLeft") {
      if (xCoord >= 0) {
        setXCoord(0);
      } else if (xCoord >= maxLength) {
        setXCoord(maxLength);
      } else {
        if (xCoord + caddyWidth < 0) {
          setXCoord(xCoord + caddyWidth);
        } else {
          setXCoord(0)
        }
      }
    } else {
      //"shiftRight"
      if (xCoord > 0) {
        setXCoord(0);
      } else if (xCoord > -(maxLength - caddyWidth)) {
        if (xCoord - caddyWidth < -(maxLength - caddyWidth)) {
          setXCoord(-(maxLength - caddyWidth));
        } else {
          setXCoord(xCoord - caddyWidth);
        }
      } else {
        setXCoord(-(maxLength - caddyWidth));
      }
    }
    setClicked(true);
  };

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
    <div className="masterDivX" style={{ width: boxWidth }}>
      <ToggleButton
        className="backTog"
        sx={toggleButtonStyle}
        ref={leftButtonRef}
        onClick={() => onClicko("shiftLeft")}
      >
        <ArrowBackIosIcon />
      </ToggleButton>
      <div className="picScollY" style={{ width: caddyWidth }} ref={wrapperRef}>
        <animated.div
          className="picScollX"
          style={({ width: caddyWidth }, move)}
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
        onClick={() => onClicko("shiftRight")}
      >
        <ArrowForwardIosIcon />
      </ToggleButton>
    </div>
  );
};

export default PhotoMenu;
