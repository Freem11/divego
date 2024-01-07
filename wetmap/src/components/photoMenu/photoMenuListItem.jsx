import { Translate } from "@mui/icons-material";
import "./photoMenu.css";
import { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { rotation } from "exifr";
import zIndex from "@mui/material/styles/zIndex";

const handleDragStart = (e) => e.preventDefault();

const PhotoMenuListItem = (props) => {
  const { id, setAnimalVal, animalVal, name, photoURL, selectedID, setSelectedID } = props;

  let photoName =  photoURL.split('/').pop();

  console.log("im", photoName)
  const tileRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [yCoord, setYCoord] = useState(0);
  const [scale, setScale] = useState(1);
  const [zdex, setZdex] = useState(0);
  const [xCoord, setXCoord] = useState(0);
 

  const handleSelect = (name) => {
    if (animalVal.includes(name)) {
      setAnimalVal(animalVal.filter((item) => item !== name));
    } else {
      setAnimalVal([...animalVal, name]);
    }
  };

  let screenInital = window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(screenInital);
 
  window.addEventListener("resize", trackWidth);

  function trackWidth() {
    setWindowWidth(window.innerWidth);
  }

  const onDoubleClick = (e, id) => {

    setSelectedID(id)

    let mover = (windowWidth/2 - e.nativeEvent.x)/3

    if (e.nativeEvent.y < 300) {
      setYCoord(100);
      setXCoord(mover)
      setScale(3);
      setZdex(99);
      setClicked(true);
    } else {
      setYCoord(0);
      setXCoord(0)
      setScale(1);
      setZdex(0);
      setClicked(true);
    }
  };

  const pressReleaseAnimations = () => {
      setYCoord(0);
      setXCoord(0)
      setScale(1);
      setZdex(0);
};

useEffect(() => {
  if(selectedID !== id){
    pressReleaseAnimations()
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

  return (
    <animated.div
      key={id}
      className="pictureBoxA"
      ref={tileRef}
      style={({ zIndex: zdex }, move)}
      onDoubleClick={(e) => onDoubleClick(e, id)}
    >
      <div className={animalVal.includes(name) ? "microsSelected" : "micros"}>
        <h4
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
        // src={`https://bca075819c975f1f381667bcdff15b92.r2.cloudflarestorage.com/scubaseasons/${photoName}`}
        // src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${photoURL}`}
        width="191px"
        height="108px"
        onDragStart={handleDragStart}
        onClick={() => handleSelect(name)}
        style={{
          marginLeft: "-1px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottom: "1px grey solid",
          borderLeft: "1px grey solid",
          borderRight: "1px grey solid",
          objectFit: "cover",
        }}
      />
    </animated.div>
  );
};

export default PhotoMenuListItem;
