import React from "react";
import { InputBase } from "@mui/material";

export default function InputField(props) {
  const defaultStyle = {
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: "1.5vw",
    textOverflow: "ellipsis",
    backgroundColor: "transparent",
    height: "5vh",
    // width: "18vw",
    color: "#F0EEEB",
    borderBottom: "none",
    borderColor: "transparent",
    borderRadius: "20px",
    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
  }
  const { highlighted, readOnly, style, ...inputBaseProprs } = props;
  const newStyle = {
    ...defaultStyle,
    ...style
  }

  if (highlighted){
    newStyle.color = "black",
    newStyle.backgroundColor = "pink"
  }

  return (
    <InputBase
        variant="standard"
        type="text"
        {...inputBaseProprs}
        inputProps={{
          readOnly,
          style: newStyle,
        }}
    />);
}
