import React from "react";
import InputField from "./inputField";

export default function InputFieldSmall(props) {
  return (
    <InputField
      {...props}
      style={{
        fontSize: "1.2vw",
        width: "12vw",
        ...props.style
      }}
      
    />);
}
