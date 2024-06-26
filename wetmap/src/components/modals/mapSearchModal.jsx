import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import CloseIcon from "@mui/icons-material/Close";
import PlacesAutoComplete from "../locationSearch/placesAutocomplete";
import CloseButton from "../closeButton/closeButton";

const MapSearchModal = (props) => {
  const { animateMapSearchModal, setMapSearchYCoord, mapSearchYCoord} = props;
 
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
            <CloseButton
                id='closeButton'
                onClick={animateMapSearchModal}
                btnStyle={{
                    display: "flex",
                    flexDirection: "column",
                    // marginRight: 20,
                    // marginTop: 10,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            />
        </FormGroup>
      </div>

      <div className="mainBlurbDiv">
        <PlacesAutoComplete setMapSearchYCoord={setMapSearchYCoord} mapSearchYCoord={mapSearchYCoord}/>
      </div>
    </div>
  );
};

export default MapSearchModal;
