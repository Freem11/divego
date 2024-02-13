import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import CloseIcon from "@mui/icons-material/Close";
import PlacesAutoComplete from "../locationSearch/placesAutocomplete";

const MapSearchModal = (props) => {
  const { animateMapSearchModal, setMapSearchYCoord } = props;
 
  return (
    <div className="masterDiv">
      <div className="titleDiv">
        <h3
          style={{
            marginLeft: "1vw",
            width: "100vw",
            textAlign: "left",
            fontFamily: "Patrick Hand",
            fontSize: "2vw",
            // backgroundColor: "pink"
          }}
        >
          Map Search
        </h3>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => animateMapSearchModal()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", height: "36px", width: "36px" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

      <div className="mainBlurbDiv">
        <PlacesAutoComplete setMapSearchYCoord={setMapSearchYCoord}/>
      </div>
    </div>
  );
};

export default MapSearchModal;
