import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import { TutorialContext } from "../contexts/tutorialContext";
import DiveSiteAutoComplete from "../diveSiteSearch/diveSiteSearch";
import CloseButton from "../closeButton/closeButton";

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
            <CloseButton
                onClick={animateSiteSearchModal}
            />
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
