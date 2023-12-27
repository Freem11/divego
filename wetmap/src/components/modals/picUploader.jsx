import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import exifr from "exifr";
import AnimalAutoSuggest from "../autoSuggest/autoSuggest";
import { useNavigate } from "react-router-dom";
import { MasterContext } from "../contexts/masterContext";
import { PinContext } from "../contexts/staticPinContext";
import { PictureContext } from "../contexts/pictureContext";
import { SessionContext } from "../contexts/sessionContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { ModalSelectContext } from "../contexts/modalSelectContext";
import { Iterrator3Context } from "../contexts/iterrator3Context";
import { TutorialContext } from "../contexts/tutorialContext";
import PlaceIcon from "@mui/icons-material/Place";
import PhotoIcon from "@mui/icons-material/Photo";
import CloseIcon from "@mui/icons-material/Close";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import { getToday } from "../../helpers/picUploaderHelpers.js";
import Collapse from "@mui/material/Collapse";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
// import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
import { uploadphoto } from "../../supabaseCalls/uploadSupabaseCalls";
import { removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
// import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { getAnimalNamesThatFit } from "../../axiosCalls/photoAxiosCalls";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";

let filePath1 = "./wetmap/src/components/uploads/";
let filePath = "/src/components/uploads/";
let UserId = "";

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

const PicUploader = React.memo((props) => {
  const { animatePicModal, setPicModalYCoord } = props;
  let navigate = useNavigate();
  const { setMasterSwitch } = useContext(MasterContext);
  const { pin, setPin } = useContext(PinContext);
  const [showNoGPS, setShowNoGPS] = useState(false);
  const [list, setList] = useState([]);
  const { photoFile, setPhotoFile } = useContext(PictureContext);
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);

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

  useEffect(() => {
    if (pin.PicDate === "") {
      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      setPin({
        ...pin,
        PicDate: rightNow,
      });
    }
  }, []);

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator3 === 11) {
        setItterator3(itterator3 + 1);
      }
    }
  }, [pin.PicDate]);

  const handleChange = async (e) => {
    if (e.target.name === "PicFile") {
      if (photoFile !== null) {
        removePhoto({ filePath: filePath1, fileName: photoFile });
      }

      let fileName = e.target.files[0];
      let baseDate = e.target.files[0].lastModified;

      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      var convDate = new Date(baseDate);

      let moddedDate = getToday(convDate);

      const data = new FormData();
      data.append("image", fileName);

      const newFilePath = await uploadphoto(fileName, fileName.name);
      //needs to be "animalphotos/public/file.jpg"

      setPhotoFile("animalphotos/" + newFilePath);

      // fetch("http://localhost:5000/api/upload", {
      //   method: "POST",
      //   body: data,
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setPhotoFile(data.fileName);
      //   });

      exifr.parse(e.target.files[0], true).then((output) => {
        let EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef
        );

        if (EXIFData) {
          setPin({
            ...pin,
            PicFile: newFilePath,
            PicDate: moddedDate,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setPin({
            ...pin,
            PicFile: newFilePath,
            PicDate: moddedDate,
            Latitude: pin.Latitude,
            Longitude: pin.Longitude,
          });
          // setShowNoGPS(true);
        }
      });

      if (tutorialRunning) {
        if (itterator3 === 8) {
          setItterator3(itterator3 + 1);
        }
      }
    } else {
      setPin({ ...pin, [e.target.name]: e.target.value });
    }
  };

  const handleNoGPSClose = (e) => {
    setShowNoGPS(false);
    handleChange(e);
    return;
  };

  const handleSelect = (e) => {
    setShowNoGPS(false);
    return;
  };

  const handleNoGPSCloseOnMapChange = () => {

    if (itterator3 === 8 || itterator3 === 11 || itterator3 === 14 || itterator3 === 22) {
      return
    }
    
    setChosenModal("Photos");
    setShowNoGPS(false);
    setMasterSwitch(false);
    animatePicModal();
    if (tutorialRunning) {
      if (itterator3 === 16) {
        setItterator3(itterator3 + 1);
      }
    }
    return;
  };

  let counter = 0;
  let blinker;

  const [imgButState, setImgButState] = useState(false);
  const [datButState, setDatButState] = useState(false);
  const [autoButState, setAutoButState] = useState(false);
  const [pinButState, setPinButState] = useState(false);
  const [subButState, setSubButState] = useState(false);

  function imageBut() {
    counter++;
    if (counter % 2 == 0) {
      setImgButState(false);
    } else {
      setImgButState(true);
    }
  }

  function calendarBut() {
    counter++;
    if (counter % 2 == 0) {
      setDatButState(false);
    } else {
      setDatButState(true);
    }
  }

  function animalField() {
    counter++;
    if (counter % 2 == 0) {
      setAutoButState(false);
    } else {
      setAutoButState(true);
    }
  }

  function pinBut() {
    counter++;
    if (counter % 2 == 0) {
      setPinButState(false);
    } else {
      setPinButState(true);
    }
  }

  function subBut() {
    counter++;
    if (counter % 2 == 0) {
      setSubButState(false);
    } else {
      setSubButState(true);
    }
  }

  function cleanUp() {
    clearInterval(blinker);
    setImgButState(false);
    setDatButState(false);
    setAutoButState(false);
    setPinButState(false);
    setSubButState(false);
  }

  let modalHeigth = 700;

  useEffect(() => {
    if (tutorialRunning) {
      if (itterator3 === 8) {
        blinker = setInterval(imageBut, 1000);
      } else if (itterator3 === 11) {
        blinker = setInterval(calendarBut, 1000);
      } else if (itterator3 === 14) {
        blinker = setInterval(animalField, 1000);
      } else if (itterator3 === 3) {
        setPicModalYCoord(0);
      } else if (itterator3 === 3) {
        setPicModalYCoord(0);
      } else if (itterator3 === 6 || itterator3 === 12 || itterator3 === 15) {
        setPicModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
      } else if (itterator3 === 16) {
        blinker = setInterval(pinBut, 1000);
      } else if (itterator3 === 22) {
        blinker = setInterval(subBut, 1000);
      }
    }
    return () => cleanUp();
  }, [itterator3]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let AnimalV = pin.Animal.toString();
    let LatV = parseFloat(pin.Latitude);
    let LngV = parseFloat(pin.Longitude);

    if (
      pin.PicFile &&
      AnimalV &&
      typeof AnimalV === "string" &&
      LatV &&
      typeof LatV == "number" &&
      LngV &&
      typeof LngV == "number"
    ) {
      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      if (tutorialRunning) {
        if (itterator3 === 22) {
          setItterator3(itterator3 + 1);
        } else {
          insertPhotoWaits({ ...pin, PicFile: photoFile });
        }
      }

      setPin({
        ...pin,
        PicFile: "",
        PicDate: rightNow,
        Animal: "",
        Latitude: "",
        Longitude: "",
      });
      setPhotoFile("");
      animatePicModal();
      return;
    }
  };

  const clearAnimal = () => {
    setPin({ ...pin, Animal: "" });
    setList([]);
  };

  const handleModalClose = () => {
    if (
      itterator3 === 8 ||
      itterator3 === 11 ||
      itterator3 === 14 ||
      itterator3 === 16 ||
      itterator3 === 22
    ) {
      return;
    }

    setPin({
      ...pin,
      PicFile: "",
      PicDate: "",
      Animal: "",
      Latitude: "",
      Longitude: "",
    });
    setShowNoGPS(false);
    setPhotoFile(null);
    animatePicModal();
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  const labelStyle = {
    fontfamily: "Patrick Hand",
    fontSize: 18,
    textTransform: "none",
    color: "gold",
    cursor: "pointer",
    marginLeft: "-7px",
    marginTop: "9px",
  };

  const labelStyleAlt = {
    fontfamily: "Patrick Hand",
    fontSize: 18,
    textTransform: "none",
    color: "#538dbd",
    cursor: "pointer",
    marginLeft: "-7px",
    marginTop: "9px",
  };

  const iconStyle = {
    color: "gold",
    height: "28px",
    width: "28px",
    cursor: "pointer",
    marginLeft: "4px",
    marginTop: "2.5px",
  };

  const iconStyleAlt = {
    color: "#538dbd",
    height: "28px",
    width: "28px",
    cursor: "pointer",
    marginLeft: "4px",
    marginTop: "2.5px",
  };

  const inputStyle = {
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: 16,
    textOverflow: "ellipsis",
    backgroundColor: "transparent",
    height: "35px",
    width: "232px",
    color: "#F0EEEB",
    marginLeft: "-30px",
    borderBottom: "none",
    borderColor: "transparent",
    alignItems: "center",
    paddingRight: "20px",
    borderRadius: "20px",
    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
  };

  const inputStyleAlt = {
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: 16,
    textOverflow: "ellipsis",
    backgroundColor: "pink",
    height: "35px",
    width: "232px",
    color: "#F0EEEB",
    marginLeft: "-30px",
    borderBottom: "none",
    borderColor: "transparent",
    alignItems: "center",
    paddingRight: "20px",
    borderRadius: "20px",
    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
  };

  const buttonStyle = {
    color: "gold",
    height: "30px",
    width: "30px",
  };

  const buttonStyleAlt = {
    color: "#538dbd",
    height: "30px",
    width: "30px",
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle2">
          <Label style={{ marginTop: 3, marginRight: 125, width: "200%" }}>
            <strong>Submit Your Picture</strong>
          </Label>
          <FormGroup>
            <Button
              variant="text"
              id="closeButton"
              onClick={() => handleModalClose()}
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
                marginTop: 2,
              }}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
          </FormGroup>
        </div>

        {photoFile !== null && (
          <div className="pickie">
            {/* <div>{photoFile}</div> */}
            <img
              src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${photoFile}`}
              height="200px"
              className="picHolder"
            ></img>
          </div>
        )}

        {photoFile === null && <div className="blankPic"></div>}

        <div className="uploadbox2">
          <div
            onClick={handleClick}
            className={imgButState ? "picSelectDivAlt" : "picSelectDiv"}
          >
            <div style={{ marginRight: 5, marginTop: 3 }}>
              <PhotoIcon
                sx={imgButState ? iconStyleAlt : iconStyle}
              ></PhotoIcon>
            </div>

            <Label style={imgButState ? labelStyleAlt : labelStyle}>
              Choose an Image
            </Label>
          </div>
          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{
                textAlign: "center",
                // fontFamily: "Itim, cursive",
                display: "none",
              }}
              id="file"
              type="file"
              name="PicFile"
              bsSize="lg"
              onChange={handleChange}
              onClick={(e) => handleNoGPSClose(e)}
            ></Input>
          </FormGroup>
        </div>

        <div className="lowerBoxPhoto">
          <div className="inputboxType1">
            <FormGroup>
              <InputBase
                id="standard-basic"
                // label="Date Taken"
                placeholder="Date Taken"
                variant="standard"
                type="date"
                name="PicDate"
                value={pin.PicDate}
                onChange={handleChange}
                onClick={handleNoGPSClose}
                inputProps={{ style: datButState ? inputStyleAlt : inputStyle }}
              />
            </FormGroup>
          </div>

          <div
            className={autoButState ? "autosuggestboxAlt" : "autosuggestbox"}
            onClick={handleSelect}
          >
            <AnimalAutoSuggest
              setPin={setPin}
              pin={pin}
              setList={setList}
              list={list}
              onClick={handleSelect}
              clearAnimal={clearAnimal}
            />
          </div>

          <Collapse in={showNoGPS} orientation="vertical" collapsedSize="0px">
            {noGPSZone}
          </Collapse>

          <div className="Tbox">
            <div className="coordDiv">
              <div className="inputboxType2">
                <FormGroup>
                  <InputBase
                    id="standard-basic"
                    // label="Latitude"
                    placeholder="Latitude"
                    variant="standard"
                    type="decimal"
                    name="Latitude"
                    value={pin.Latitude}
                    onChange={handleChange}
                    onClick={handleNoGPSClose}
                    inputProps={{
                      readOnly: true,
                      style: {
                        textAlign: "center",
                        fontFamily: "Itim",
                        fontSize: 16,
                        textOverflow: "ellipsis",
                        backgroundColor: "transparent",
                        height: "35px",
                        color: "#F0EEEB",
                        width: "250px",
                        borderBottom: "none",
                        borderColor: "transparent",
                        borderRadius: "20px",
                        boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                        marginLeft: "-52px",
                      },
                    }}
                  />
                </FormGroup>
              </div>

              <div className="inputboxType2">
                <FormGroup>
                  <InputBase
                    id="standard-basic"
                    // label="Longitude"
                    placeholder="Longitude"
                    variant="standard"
                    type="decimal"
                    name="Longitude"
                    contentEditable={false}
                    value={pin.Longitude}
                    onChange={handleChange}
                    onClick={handleNoGPSClose}
                    inputProps={{
                      readOnly: true,
                      style: {
                        textAlign: "center",
                        fontFamily: "Itim",
                        fontSize: 16,
                        textOverflow: "ellipsis",
                        backgroundColor: "transparent",
                        height: "35px",
                        width: "250px",
                        color: "#F0EEEB",
                        borderBottom: "none",
                        borderColor: "transparent",
                        borderRadius: "20px",
                        boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                        marginLeft: "-52px",
                      },
                    }}
                  />
                </FormGroup>
              </div>
            </div>
            <div
              className={pinButState ? "GboxAlt" : "Gbox"}
              style={{ marginTop: "40px" }}
            >
              <FormGroup>
                <Button
                  variant="text"
                  id="jumpButton"
                  onClick={handleNoGPSCloseOnMapChange}
                >
                  <PlaceIcon
                    sx={pinButState ? buttonStyleAlt : buttonStyle}
                  ></PlaceIcon>
                </Button>
              </FormGroup>
            </div>
          </div>
        </div>

        <FormGroup>
          <Button
            variant="text"
            id="modalButton"
            style={{ backgroundColor: subButState ? "#538dbd" : "#538bdb" }}
            onClick={handleSubmit}
          >
            Submit Photo
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
});

export default PicUploader;
