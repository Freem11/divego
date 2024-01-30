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
    console.log(e.target.value)
    setTextValue(e.target.value);
  };

  const handleClear = () => {
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
                fontSize: "1rem",
                width: "20vw",
                textAlign: "center",
                height: "5vh",
                backgroundColor: "white",
                borderRadius: "1rem",
                marginBottom: "15px",
                pointerEvents: 'auto'
              },
            }}
          />
        </FormGroup>
        {textvalue.length > 1 && (
        <div
          variant="text"
          className="xButton"
          onClick={handleClear}
          style={{marginBottom: -4}}
        >
          <HighlightOffIcon
            onClick={handleClear}
            sx={{
              color: "black",
              height: "2vh",
              width: "2vw",
              // marginBottom: "500%",
              position: "absolute",
              top: "2.5vh",
              left: "63%",
            }}
          ></HighlightOffIcon>
        </div>
      )}
      </div>

   
    </div>
  );
}
