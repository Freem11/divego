import React, { useState, useContext, useEffect } from "react";
import { Label } from "reactstrap";
import "./confirmationCautionModal.css";

export default function FailModal(props) {
  const { submissionItem, animateCautionModal } = props;

  const tidyUp = () => {
    animateCautionModal();
  };

  let blurb = null;
  if (submissionItem === "sea creature submission") {
    blurb =
      "The Image has not yet completed processing, please wait for the indicator to turn green, which indicates that it is ready, and try again.";
  } else if (submissionItem === "dive site") {
    blurb =
      "Your dive site submission is still missing required information, please make changes and when the indicator to turns green your submission will be ready to submit.";
  } else if (submissionItem === "partner account creation request") {
    blurb =
      "Your request is still missing required information, please ensure that you fill out all fields to sucessfully complete your request.";
  }

  return (
    <div className="overlay">
    <div className="containerFC">
      <div className="titleF">
        <Label className="textF" style={{width: "100%"}}>
          Your {submissionItem} cannot be completed just yet.
        </Label>
        <Label className="text2F" style={{width: "100%"}}>{blurb}</Label>
        <div onClick={() => tidyUp()} className="OKbuttonF">
          <Label
            style={{
              fontFamily: "Itim",
              fontWeight: "bold",
              color: "gold",
              cursor: "pointer",
              fontSize: "1.5vw",
            }}
          >
            OK
          </Label>
        </div>
      </div>
    </div>
    </div>
  );
}
