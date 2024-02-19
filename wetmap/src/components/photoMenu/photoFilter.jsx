import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import InputBase from "@mui/material/InputBase";
import { SearchTextContext } from "../contexts/searchTextContext";
import { AreaPicsContext } from "../contexts/areaPicsContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./photoFilter.css";

export default function PhotoFilterer() {
  const { textvalue, setTextValue } = useContext(SearchTextContext);
  const { areaPics, setAreaPics } = useContext(AreaPicsContext);

  const handleChange = async (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };

  const handleClear = () => {
    console.log("yo");
    setTextValue("");
  };

  return (
    <div className="containerF">
      <div className="inputboxF">
        <FormGroup>
          <InputBase
            // id="standard-basic"
            placeholder="Dive Deeper!"
            type="text"
            name="pullTab"
            value={textvalue}
            onChange={handleChange}
            className="suggestInput"
            inputProps={{
              style: {
                fontSize: "1vw",
                width: "20vw",
                textAlign: "center",
                height: "5vh",
                backgroundColor: "white",
                borderRadius: "1vw",
                pointerEvents: "auto",
                // marginLeft: "3.5vw"
              },
            }}
          />
        </FormGroup>
        {/* {textvalue.length > 1 && (
          <div
            variant="text"
            className="xButton"
            onClick={() => handleChange}
            // style={{marginBottom: -4}}
          >
            <HighlightOffIcon
              onClick={handleClear}
              sx={{
                color: "black",
                height: "1.5vw",
                width: "2vw",
                position: "absolute",
                top: "1.5vw",
                left: "32vw",
                pointerEvents: "auto",
              }}
            ></HighlightOffIcon>
          </div>
        )}
        {textvalue.length <= 1 && (
          <div
            variant="text"
            className="blankButton"
            onClick={() => handleChange}
            style={{ height: "1.5vw", width: "2vw" }}
          ></div>
        )} */}
      </div>
    </div>
  );
}
