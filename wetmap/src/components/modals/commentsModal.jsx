import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import CloseIcon from "@mui/icons-material/Close";
import "./commentsModal.css";

const CommentsModal = (props) => {
  const {
    animateCommentsModal,

  } = props;


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
          Comments
        </h3>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => animateCommentsModal()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", width: "2vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>
    </div>
  );
};

export default CommentsModal;
