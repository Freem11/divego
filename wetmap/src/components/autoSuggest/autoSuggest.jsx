import React from "react";
import InputBase from "@mui/material/InputBase";
import AutoSuggestListItem from "./autoSuggestListItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./autoSuggest.css";

export default function AutoSuggest(props) {
  const { placeholder, value, list, clear, handleSelect, handleChange, style, style1, style2, style3 } = props;

  return (
    <div>
      <InputBase
        className="suggestInput"
        placeholder={placeholder}
        name={placeholder}
        value={value}
        onChange={handleChange}
        inputProps={{
          style: { ...style
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
        style={{...style1,
          height: "auto",
          zIndex: "100",
          position: "absolute",
        }}
      >
        {list.length > 0 &&
          list.map((element) => {
            return (
              <AutoSuggestListItem
                key={element}
                value={element}
                handleSelect={handleSelect}
                style={style2}
                style3={style3}
              />
            );
          })}
      </div>
    </div>
  );
}
