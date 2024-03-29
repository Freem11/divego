import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import CloseIcon from "@mui/icons-material/Close";
import DiveSiteAutoComplete from "../diveSiteSearch/diveSiteSearch";

const SiteSearchModal = (props) => {
  const { animateSiteSearchModal, setSiteSearchModalYCoord } = props;

  return (
    <div className="masterDiv" style={{overflow: "hidden"}}>
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
          Dive Site Search
        </h3>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => animateSiteSearchModal()}
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
              sx={{ color: "lightgrey", width: "2vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

      <div className="mainBlurbDiv" style={{overflow: "hidden"}}>
        <DiveSiteAutoComplete
          setSiteSearchModalYCoord={setSiteSearchModalYCoord}
        />
      </div>
    </div>
  );
};

export default SiteSearchModal;
