import { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./siteSubmitter.css";
import exifr from "exifr";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import PhotoIcon from "@mui/icons-material/Photo";
import CloseIcon from "@mui/icons-material/Close";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import Collapse from "@mui/material/Collapse";
import { insertDiveSiteWaits } from "../../supabaseCalls/diveSiteWaitSupabaseCalls";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";
import { DiveSpotContext } from "../contexts/diveSpotContext";

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
  const { animateSiteModal } = props;
  const [showNoGPS, setShowNoGPS] = useState(false);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

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
    } else {
      console.log("unsupported");
    }
  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let SiteV = addSiteVals.Site.toString();
    let LatV = parseFloat(addSiteVals.Latitude);
    let LngV = parseFloat(addSiteVals.Longitude);

    if (
      SiteV &&
      typeof SiteV === "string" &&
      LatV &&
      typeof LatV === "number" &&
      LngV &&
      typeof LngV === "number"
    ) {
      insertDiveSiteWaits(addSiteVals);
      setAddSiteVals({...addSiteVals,
        Site: "",
        Latitude: "",
        Longitude: "",
      })
      animateSiteModal();
      return;
    }
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  const handleModalClose = () => {
    setAddSiteVals({...addSiteVals,
      Site: "",
      Latitude: "",
      Longitude: "",
    })
    animateSiteModal();
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle3">
          <Label style={{ marginTop: 3, marginRight: 125, width: "200%" }}>
            <strong>Submit Your Dive Site</strong>
          </Label>
          <FormGroup>
            <Button
              variant="text"
              id="closeButton"
              onClick={() => handleModalClose()}
              style={{ display: "flex", flexDirection: "column", marginRight: 10, marginTop: 2}}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
          </FormGroup>
        </div>


        <div className="lowerBoxSite">
        <div className="inputbox">
          <FormGroup>
            <InputBase
              id="standard-basic"
              placeholder="Site Name"
              type="text"
              name="Site"
              onChange={handleChange}
              onClick={handleNoGPSClose}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontFamily: "Itim",
                  fontSize: 18,
                  textOverflow: "ellipsis",
                  backgroundColor: "#538bdb",
                  height: "35px",
                  width: "232px",
                  color: "#F0EEEB",
                  borderRadius: "20px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                },
              }}
            />
          </FormGroup>
        </div>

        <div className="inputbox" >
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
                  fontSize: 18,
                  textOverflow: "ellipsis",
                  backgroundColor: "#538BDB",
                  height: "35px",
                  width: "232px",
                  color: "#F0EEEB",
                  borderRadius: "20px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                }
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
                  fontSize: 18,
                  textOverflow: "ellipsis",
                  backgroundColor: "#538bdb",
                  height: "35px",
                  width: "232px",
                  color: "#F0EEEB",
                  borderRadius: "120px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                },
              }}
            />
          </FormGroup>
        </div>
        </div>

        <FormGroup>
          <div onClick={handleDiveSiteGPS} className="GPSbutton">
            <div style={{ marginLeft: 3, marginRight: 2, marginTop: -2 }}>
              <MapOutlinedIcon
                sx={{
                  color: "gold",
                  height: "28px",
                  width: "28px",
                  cursor: "pointer",
                  marginTop: "8px",
                  marginLeft: "5px",
                }}
              ></MapOutlinedIcon>
            </div>

            <Label
              style={{
                fontfamily: 'Patrick Hand',
                fontWeight: "bold",
                color: "gold",
                cursor: "pointer",
                marginTop: "11px",
                paddingRight: "5px",
                fontSize: "15px"
              }}
            >
              I'm At The Dive Site
            </Label>
          </div>
        </FormGroup>

        <FormGroup>
          <Button variant="text" id="modalButton2" onClick={handleSubmit}>
            Submit Dive Site
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default SiteSubmitter;
