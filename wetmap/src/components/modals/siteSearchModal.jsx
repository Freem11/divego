import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import CloseIcon from "@mui/icons-material/Close";
import DiveSiteAutoComplete from "../diveSiteSearch/diveSiteSearch";

const SiteSearchModal = (props) => {
  const { animateSiteSearchModal, setSiteSearchModalYCoord } = props;

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
              sx={{ color: "lightgrey", height: "36px", width: "36px" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

      <div className="mainBlurbDiv">
        <DiveSiteAutoComplete setSiteSearchModalYCoord={setSiteSearchModalYCoord}/>
      </div>
    </div>
  );
};

export default SiteSearchModal;
