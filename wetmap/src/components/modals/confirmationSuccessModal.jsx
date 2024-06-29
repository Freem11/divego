import React, { useState } from "react";
import { Label } from "reactstrap";
import "./confirmationSuccessModal.css";

export default function SuccessModal(props) {
  const {
    submissionItem,
    itterator2,
    setItterator2,
    itterator3,
    setItterator3,
    animateSuccessModal,
    handleClose
  } = props;

  const tidyUp = () => {
    if (submissionItem === "dive site") {
      handleClose();
      if (itterator2 > 0) {
        setItterator2(itterator2 + 1);
      }
    } else if (submissionItem === "sea creature submission") {
      handleClose();
      if (itterator3 > 0) {
        setItterator3(itterator3 + 1);
      }
    } else if (submissionItem === "partner account creation request") {
      handleClose();
    }

    animateSuccessModal();
  };

  let blurb = null;
  if (submissionItem === "partner account creation request") {
    blurb = `We are reviewing your submission. Please allow up to 24 hours for it to be reviewed and approved. \n \n We may contact you if we need to confirm any discrepancies.`;
  } else {
    blurb = "Please allow up to 24 hours for it to be reviewed and approved.";
  }

  return (
    <div className="containerS">
      <div className="titleS">
        <Label className="textS">
          Your {submissionItem} was successully submitted!
        </Label>
        <Label className="text2S">{blurb}</Label>
        <div
          onClick={() => tidyUp()}
          className="OKbuttonS"
        >
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
  );
}
