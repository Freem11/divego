import { Translate } from "@mui/icons-material";
import "./photoMenu.css";
import { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { rotation } from "exifr";
import zIndex from "@mui/material/styles/zIndex";

const handleDragStart = (e) => e.preventDefault();

const PhotoMenuListItem = (props) => {
  const { id, setAnimalVal, animalVal, name, photoURL, selectedID, setSelectedID, caddyWidth } = props;

  let photoName =  photoURL.split('/').pop();

  // console.log("im", photoName)
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

  let screenWidthInital = window.innerWidth;
  let screenHeigthInital = window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener("resize", trackDimensions);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  // window.addEventListener("resize", trackWidth);

  useEffect(() => {
    if(selectedID !== id){
      pressReleaseAnimations()
    }
  }, [selectedID]);
  
  // function trackWidth() {
  //   setBoxWidth(window.innerWidth * 0.9);
  //   setCaddyWidth(window.innerWidth * 0.9);
  //   // setCaddyWidth(Math.floor(window.innerWidth / 192) * 193 - 192);
  // }

  let screenInital = window.innerWidth;
  const [boxWidth, setBoxWidth] = useState(screenInital * 0.8);
  const [tileWidth, setTileWidth] = useState((screenInital * 0.8)/4);
  const [windowW, setWindowW] = useState(window.innerWidth);
  const [windowH, setWindowH] = useState(window.innerHeight);

  window.addEventListener("resize", trackWidth);

  function trackWidth() {
    setWindowW(window.innerWidth)
    setWindowH(window.innerHeight)
    setBoxWidth(window.innerWidth * 0.8);
    setTileWidth(Math.floor((window.innerWidth * 0.8)/4));
  }

  const onDoubleClick = (e, id) => {

    setSelectedID(id)
 
    let yClick = e.nativeEvent.clientY
    let xClick = e.nativeEvent.clientX
    let yClickI = e.nativeEvent.layerY
    let xClickI = e.nativeEvent.layerX

    let distanceToItemMiddleX = caddyWidth/2 - xClickI
    let centererPressX = xClick + distanceToItemMiddleX
    let distanceToItemMiddleY = caddyWidth/2 - yClickI
    let centererPressY = yClick + distanceToItemMiddleY
    let moverWidth = ((windowW/2) - centererPressX)/3
    let moverHeigth = ((windowH/2) - centererPressY)/3

    if (e.nativeEvent.y < 300) {
      setYCoord(moverHeigth);
      setXCoord(moverWidth)
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


  let labelLength = name.length
  let labelFont = (120)/labelLength + 6


  let picWidth = {
    width: "100%"
  }

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
          style={{fontSize: labelFont}}
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
        width={picWidth.width}
        height={"130vh"}
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
