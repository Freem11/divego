import React from "react";
import { Label } from "reactstrap";
import style from "./button.module.scss";
import { MaterialIcons } from "react-web-vector-icons";

export default function Button(props) {
  const { onClick, btnText, altStyle, icon, helperText } = props;

  return (
    <div className={style.helperTextContainer}>
      <div
        onClick={onClick}
        className={altStyle ? style.invertedStyle : style.defaultStyle}
      >
        <Label
          style={{
            color: altStyle ? style.invertedStyleText : style.defaultStyleText,
            cursor: "pointer",
          }}
        >
          {btnText}
        </Label>
        {icon ? (
          <MaterialIcons name="chevron-right" size={30} color={"$themeWhite"} />
        ) : null}
      </div>

      { helperText ? (<div>{helperText}</div>) : null }
    </div>
  );
}
