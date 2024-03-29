import { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./siteSubmitter.css";
import exifr from "exifr";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import Collapse from "@mui/material/Collapse";
import { insertDiveSiteWaits } from "../../supabaseCalls/diveSiteWaitSupabaseCalls";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";
import { DiveSpotContext } from "../contexts/diveSpotContext";
import { MasterContext } from "../contexts/masterContext";
import { ModalSelectContext } from "../contexts/modalSelectContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { TutorialContext } from "../contexts/tutorialContext";
import { ChapterContext } from "../contexts/chapterContext";

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

const noGPSZone = (
  <div
    style={{
      marginLeft: "2%",
      backgroundColor: "pink",
      height: "40px",
      width: "95%",
      color: "red",
      borderRadius: "15px",
    }}
  >
    <h4 style={{ marginLeft: "35px", paddingTop: "10px" }}>
      No GPS Coordinates Found!
    </h4>
  </div>
);

const SiteSubmitter = (props) => {
  const { animateSiteModal, setSiteModalYCoord } = props;
  const [showNoGPS, setShowNoGPS] = useState(false);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { setMasterSwitch } = useContext(MasterContext);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { chapter, setChapter } = useContext(ChapterContext);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  window.addEventListener("resize", trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const handleChange = (e) => {
    setAddSiteVals({ ...addSiteVals, [e.target.name]: e.target.value });

    if (e.target.name === "PicFile") {
      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      exifr.parse(e.target.files[0]).then((output) => {
        let EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef
        );

        if (EXIFData) {
          setAddSiteVals({
            ...addSiteVals,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setAddSiteVals({ ...addSiteVals });
          setShowNoGPS(true);
        }
      });
    }
  };

  const handleDiveSiteGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setAddSiteVals({
            ...addSiteVals,
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.log("location permissions denied", error.message);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
      if (tutorialRunning) {
        if (itterator2 === 13) {
          setItterator2(itterator2 + 1);
          setLocButState(false);
        }
      }
    } else {
      console.log("unsupported");
    }
  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const handleNoGPSCloseOnMapChange = () => {
    if (itterator2 === 13 || itterator2 === 23) {
      return;
    }

    setChosenModal("DiveSite");
    setShowNoGPS(false);
    setMasterSwitch(false);
    animateSiteModal();

    if (tutorialRunning) {
      if (itterator2 === 16) {
        setItterator2(itterator2 + 1);
        setPinButState(false);
      }
    }
  };

  let counter1 = 0;
  let counter2 = 0;
  let blinker1;
  let blinker2;
  let timer2;

  const [locButState, setLocButState] = useState(false);
  const [pinButState, setPinButState] = useState(false);
  const [siteNameState, setSiteNameState] = useState(false);
  const [subButState, setSubButState] = useState(false);

  function locationBut() {
    counter1++;
    if (counter1 % 2 == 0) {
      setLocButState(false);
    } else {
      setLocButState(true);
    }
  }

  function pinBut() {
    counter1++;
    if (counter1 % 2 == 0) {
      setPinButState(false);
    } else {
      setPinButState(true);
    }
  }

  function siteField() {
    counter1++;
    if (counter1 % 2 == 0) {
      setSiteNameState(false);
    } else {
      setSiteNameState(true);
    }
  }

  function subButTimeout() {
    blinker2 = setInterval(subBut, 1000);
  }

  function subBut() {
    counter2++;
    if (counter2 % 2 == 0) {
      setSubButState(false);
    } else {
      setSubButState(true);
    }
  }

  function cleanUp() {
    clearInterval(blinker1);
    clearInterval(blinker2);
    setLocButState(false);
    setPinButState(false);
    setSiteNameState(false);
    setSubButState(false);
  }

  let modalHeigth = 700;

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator2 === 16) {
        blinker1 = setInterval(pinBut, 600);
      } else if (itterator2 === 13) {
        blinker1 = setInterval(locationBut, 1000);
      } else if (itterator2 === 15 || itterator2 == 10) {
        setSiteModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      } else if (itterator2 === 8 || itterator2 === 1) {
        setSiteModalYCoord(0);
      } else if (itterator2 === 23) {
        blinker1 = setInterval(siteField, 1000);
        timer2 = setTimeout(subButTimeout, 300);
      } else if (itterator2 === 26) {
        setAddSiteVals({
          ...addSiteVals,
          Site: "",
          Latitude: "",
          Longitude: "",
        });
        animateSiteModal();
      }
    }
    return () => cleanUp();
  }, [itterator2]);

  const buttonColor = {
    color: "gold",
    height: "4vw",
    width: "4vh",
    cursor: "pointer",
    marginTop: "4px",
  };

  const buttonColorAlt = {
    color: "#538bdb",
    height: "4vw",
    width: "4vh",
    cursor: "pointer",
    marginTop: "4px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let SiteV = addSiteVals.Site.toString();
    let LatV = parseFloat(addSiteVals.Latitude);
    let LngV = parseFloat(addSiteVals.Longitude);

    if (tutorialRunning) {
      if (itterator2 === 23) {
        setItterator2(itterator2 + 1);
      }
    } else if (
      SiteV &&
      typeof SiteV === "string" &&
      LatV &&
      typeof LatV === "number" &&
      LngV &&
      typeof LngV === "number"
    ) {
      insertDiveSiteWaits(addSiteVals);
      setAddSiteVals({ ...addSiteVals, Site: "", Latitude: "", Longitude: "" });
      animateSiteModal();
      return;
    }
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  const handleModalClose = () => {
    if (
      itterator2 === 13 ||
      itterator2 === 16 ||
      itterator2 === 19 ||
      itterator2 === 23
    ) {
      return;
    }
    setAddSiteVals({ ...addSiteVals, Site: "", Latitude: "", Longitude: "" });
    animateSiteModal();
  };

  const activateGuide = () => {
    if (tutorialRunning) {
    } else {
      setChapter("DS Help");
    }
  };

  const inputStyle = {
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: "2vw",
    textOverflow: "ellipsis",
    backgroundColor: "#538bdb",
    height: "5vh",
    width: "18vw",
    color: "#F0EEEB",
    borderRadius: "120px",
    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
  };

  const inputStyleAlt = {
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: "2vw",
    textOverflow: "ellipsis",
    backgroundColor: "pink",
    height: "5vh",
    width: "18vw",
    color: "black",
    borderRadius: "120px",
    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
  };

  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          // backgroundColor: "palegoldenrod"
        }}
      >
        <div className="modalTitle3">
          <Label
            style={{
              width: "100vw",
              marginLeft: "1vw",
              textAlign: "left",
              fontFamily: "Patrick Hand",
              fontSize: "2vw",
              // backgroundColor: "pink",
            }}
          >
            <strong>Submit Your Dive Site</strong>
          </Label>
      
              <QuestionMarkIcon

                sx={{
                  color: "lightgrey",
                  width: "2vw",
                  height: "4vh",
                  marginRight: "1vw",
                  cursor: "pointer"
                  // backgroundColor: 'gray',
                }}
              ></QuestionMarkIcon>
      
              <CloseIcon
              onClick={() => handleModalClose()}
                sx={{
                  color: "lightgrey",
                  width: "2vw",
                  height: "5vh",
                  cursor: "pointer"
                  // backgroundColor: "pink"
                }}
              ></CloseIcon>
       
        </div>

        <div className="lowerBoxSite">
          <div className="inputbox">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="Site Name"
                type="text"
                name="Site"
                value={addSiteVals.Site}
                onChange={handleChange}
                onClick={handleNoGPSClose}
                inputProps={{
                  style: siteNameState ? inputStyleAlt : inputStyle,
                }}
              />
            </FormGroup>
          </div>

          <div className="inputbox">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="Latitude"
                type="decimal"
                name="Latitude"
                value={addSiteVals.Latitude}
                onChange={handleChange}
                onClick={handleNoGPSClose}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: '2vw',
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "18vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>

          <div className="inputbox">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="Longitude"
                type="decimal"
                name="Longitude"
                value={addSiteVals.Longitude}
                onChange={handleChange}
                onClick={handleNoGPSClose}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "2vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538bdb",
                    height: "5vh",
                    width: "18vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>
        </div>

        <div className="buttonBox">
          <FormGroup>
            <div
              onClick={handleDiveSiteGPS}
              className={locButState ? "GPSbuttonAlt" : "GPSbutton"}
            >
              <div>
                <MyLocationIcon
                  sx={locButState ? buttonColorAlt : buttonColor}
                ></MyLocationIcon>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <div
              onClick={handleNoGPSCloseOnMapChange}
              className={pinButState ? "pinButtonDalt" : "pinButtonD"}
            >
              <PlaceIcon
                sx={pinButState ? buttonColorAlt : buttonColor}
              ></PlaceIcon>
            </div>
          </FormGroup>
        </div>

        <FormGroup>
          <Button
            variant="text"
            id="modalButtonDivD"
            style={{ backgroundColor: subButState ? "#538dbd" : "#538bdb" }}
            onClick={handleSubmit}
          >
            Submit Dive Site
          </Button>
        </FormGroup>
      </div>
  );
};

export default SiteSubmitter;
