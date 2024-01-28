import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import InputBase from "@mui/material/InputBase";
import { SearchTextContext } from "../contexts/searchTextContext";
import { AreaPicsContext } from "../contexts/areaPicsContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
                fontSize: "14px",
                width: "100%",
                textAlign: "center",
                height: "35px",
                backgroundColor: "white",
                borderRadius: "15px",
                marginBottom: "15px",
                marginLeft: "-5px"
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
              height: "15px",
              width: "15px",
              position: "absolute",
              top: "50%",
              left: "85%",
            }}
          ></HighlightOffIcon>
        </div>
      )}
      </div>

   
    </div>
  );
}
