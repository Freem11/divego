import React from "react";
import InputBase from "@mui/material/InputBase";
import AutoSuggestListItem from "./autoSuggestListItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./autoSuggest.css";

export default function AutoSuggest(props) {
  const { placeholder, value, list, clear, handleSelect, handleChange } = props;

  return (
    <div>
      <InputBase
        className="suggestInput"
        placeholder={placeholder}
        name={placeholder}
        value={value}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Itim",
            fontSize: "1.5vw",
            textOverflow: "ellipsis",
            backgroundColor: "transparent",
            height: "5vh",
            width: "18vw",
            color: "#F0EEEB",
          },
        }}
      ></InputBase>

      {value.length > 1 && (
        <div variant="text" id="XButton" onClick={clear}>
          <HighlightOffIcon
            sx={{
              color: "white",
              height: "2vh",
              width: "2vw",
              position: "absolute",
            }}
          ></HighlightOffIcon>
        </div>
      )}

      <div
        style={{
          height: "auto",
          zIndex: "100",
          position: "absolute",
          marginTop: "4vh",
          marginLeft: "4vw",
        }}
      >
        {list.length > 0 &&
          list.map((element) => {
            return (
              <AutoSuggestListItem
                key={element}
                value={element}
                handleSelect={handleSelect}
              />
            );
          })}
      </div>
    </div>
  );
}
