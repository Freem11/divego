import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
  FontAwesome6,
  Fontisto,
} from "react-web-vector-icons";
import { InputBase } from "@mui/material";
import style from "./textInput.module.scss";

export default function TextInputField(props) {
  const {
    icon,
    placeHolderText,
    secure,
    setSecureTextEntry,
    inputValue,
    onChangeText,
    handleClear,
    vectorIcon,
    animal,
  } = props;

  return (
    <div className={style.inputContainer}>
      {!vectorIcon ? (
        <MaterialIcons name={icon} size={30} color="darkgrey" />
      ) : null}
      {vectorIcon === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons name={icon} size={30} color="darkgrey" />
      ) : null}
      {vectorIcon === "Entypo" ? (
        <Entypo name={icon} size={30} color="darkgrey" />
      ) : null}
      {vectorIcon === "Ionicons" ? (
        <Ionicons name={icon} size={30} color="darkgrey" />
      ) : null}

      <InputBase
        className={style.inputText}
        value={inputValue}
        placeholder={placeHolderText}
        onChange={onChangeText}
        // secureTextEntry={secure}
        // keyboardType={keyboardValue}
      ></InputBase>
      {placeHolderText === "Password" ? (
        secure ? (
          <FontAwesome6
            name="eye-slash"
            size={30}
            color="darkgrey"
            onPress={() => setSecureTextEntry(false)}
          />
        ) : (
          <FontAwesome6
            name="eye"
            size={30}
            color="darkgrey"
            onPress={() => setSecureTextEntry(true)}
          />
        )
      ) : null}
      {(placeHolderText === "Sea Life Encountered" ||
        placeHolderText === "Search by Dive Site name or Location") &&
      animal.length > 1 ? (
        <MaterialIcons
          name="highlight-remove"
          size={30}
          color="darkgrey"
          onPress={() => handleClear()}
        />
      ) : (
        <div style={{ width: "30px", height: "30px" }}></div>
      )}

      {placeHolderText === "Blow some bubbles" ? (
        <Fontisto
          name="snorkel"
          size={30}
          color="darkgrey"
          onPress={() => handleClear()}
        />
      ) : (
        <div style={{ width: "30px", height: "30px" }}></div>
      )}
    </div>
  );
}
